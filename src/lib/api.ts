import { User } from '../types';
import { auth, isLiveFirebaseConfigured } from '../firebase';

export const getClientumUserHeaders = (user?: Pick<User, 'id'>): Record<string, string> => {
  let userId = user?.id;
  if (!userId && typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem('clientum_crm_current_user');
      userId = saved ? (JSON.parse(saved) as User).id : undefined;
    } catch {
      userId = undefined;
    }
  }

  return userId ? { 'x-clientum-user-id': userId } : {};
};

export const getClientumJsonHeaders = (user?: Pick<User, 'id'>): Record<string, string> => ({
  'Content-Type': 'application/json',
  ...getClientumUserHeaders(user),
});

export const getClientumAuthHeaders = async (user?: Pick<User, 'id'>): Promise<Record<string, string>> => {
  const headers = getClientumUserHeaders(user);
  if (isLiveFirebaseConfigured && auth.currentUser) {
    try {
      headers.Authorization = `Bearer ${await auth.currentUser.getIdToken()}`;
    } catch {
      // The backend will reject the request in production if no valid token exists.
    }
  }
  return headers;
};

export const getClientumAuthJsonHeaders = async (user?: Pick<User, 'id'>): Promise<Record<string, string>> => ({
  'Content-Type': 'application/json',
  ...(await getClientumAuthHeaders(user)),
});