import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const baseUrl = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:5000/';
const chromiumPath = process.env.CHROMIUM_PATH || '/repl/tools/bin/chromium';
const debugPort = Number(process.env.SMOKE_DEBUG_PORT || 9223);
const userDataDir = `/tmp/clientum-navigation-smoke-${process.pid}`;

const browser = spawn(
  chromiumPath,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let socket;
let nextCommandId = 0;
const pendingCommands = new Map();

function fail(message) {
  throw new Error(`[navigation-smoke] ${message}`);
}

async function waitForDebugTarget() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?${Date.now()}`, {
        method: 'PUT',
      });
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Chromium is still starting.
    }
    await delay(100);
  }
  fail(`Chromium did not expose a debugging target on port ${debugPort}`);
}

function sendCommand(method, params = {}) {
  const id = ++nextCommandId;
  return new Promise((resolve, reject) => {
    pendingCommands.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function connectToTarget(target) {
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const command = pendingCommands.get(message.id);
    if (!command) return;
    pendingCommands.delete(message.id);
    if (message.error) command.reject(new Error(message.error.message));
    else command.resolve(message.result);
  });

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
}

async function evaluate(expression) {
  const result = await sendCommand('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    fail(result.exceptionDetails.text || 'Browser evaluation failed');
  }
  return result.result?.value;
}

async function waitFor(description, predicate, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await evaluate(`(${predicate.toString()})()`)) return;
    await delay(100);
  }
  const visibleText = await evaluate('document.body?.innerText?.slice(0, 5000) || ""');
  fail(`Timed out waiting for ${description}. Visible text: ${visibleText}`);
}

async function navigate(url) {
  await sendCommand('Page.navigate', { url });
  await waitFor('the app shell', () => document.readyState === 'complete' && !!document.body);
}

async function clickButton(label) {
  const clicked = await evaluate(`(() => {
    const buttons = [...document.querySelectorAll('button')];
    const button = buttons.find((candidate) => candidate.innerText.trim().includes(${JSON.stringify(label)}));
    if (!button) return false;
    button.click();
    return true;
  })()`);
  if (!clicked) fail(`Could not find button "${label}"`);
}

async function assertPublicSite(description) {
  await waitFor(description, () => {
    const text = document.body?.innerText || '';
    return text.includes('Pedir Demo') && !text.includes('Resumen Ejecutivo');
  });
}

async function assertCanonicalPublicUrl(description) {
  await waitFor(description, () => {
    const text = document.body?.innerText || '';
    return window.location.pathname === '/' && text.includes('Pedir Demo') && !text.includes('Resumen Ejecutivo');
  });
}

async function assertPrivateWorkspace(description) {
  await waitFor(description, () => {
    const text = document.body?.innerText || '';
    return text.includes('Resumen Ejecutivo') && text.includes('Ver Portal Público');
  });
}

async function run() {
  const target = await waitForDebugTarget();
  await connectToTarget(target);

  await navigate(baseUrl);
  await evaluate('localStorage.clear(); sessionStorage.clear(); location.reload()');
  await assertPublicSite('the unauthenticated public site');
  console.log('✓ unauthenticated visit renders the public site');

  for (const privatePath of ['/app', '/dashboard', '/crm', '/erp']) {
    await navigate(new URL(privatePath, baseUrl).toString());
    await assertCanonicalPublicUrl(`the protected redirect from ${privatePath}`);
    console.log(`✓ unauthenticated ${privatePath} redirects to the public URL`);
  }

  await clickButton('Ingresar al CRM');
  await assertPrivateWorkspace('the demo/login action to enter the dashboard');
  console.log('✓ demo/login action enters the dashboard');

  await clickButton('Ver Portal Público');
  await assertPublicSite('the dashboard action to return to the public site');
  console.log('✓ public-site action returns to the landing experience');

  await clickButton('Ingresar al CRM');
  await assertPrivateWorkspace('the dashboard before logout');
  await evaluate('document.querySelector("#sidebar-logout-btn")?.click()');
  await assertPublicSite('logout to return to the public site');
  console.log('✓ logout returns to the public site');

  await evaluate(`sessionStorage.setItem('clientum_view_mode', 'app'); location.reload()`);
  await assertPublicSite('the private-shell guard after an unauthenticated app-mode request');
  console.log('✓ unauthenticated app-mode request remains on the public site');

  await evaluate('localStorage.clear(); sessionStorage.clear(); location.reload()');
  console.log('Navigation smoke test passed.');
}

try {
  await run();
} finally {
  socket?.close();
  browser.kill('SIGTERM');
}