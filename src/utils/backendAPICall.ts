import { User } from "../interfaces/user";

export async function backendAPICall(path: string, method: string = 'GET', data: any = null) {
  const url = `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/${path}`;

  const userString = localStorage.getItem('user');
  const user: User | null = userString ? JSON.parse(userString) : null;

  const token = user?.token;
  if (!token) {
    console.error('Error: No authentication token found');
    throw new Error('No authentication token found');
  }

  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if ([401, 403].includes(response.status)) {
    // toast.error('Login required');
    location.reload();
    return;
  } else if (!response.ok) {
    //  toast.error(response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  return json;
}
