import { useAuth } from "../hooks/useAuth"; 

export async function backendAPICall(
  path: string, 
  method: string = 'GET', 
  data: any = null
) {
  const url = `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/${path}`;
  const { user, logout } = useAuth(); // Get user and logout from the context

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

  if (response.status === 401 || response.status === 403) {
    // Call the logout method to handle the logout and redirection
    logout(); // This will clear the user and redirect to login
    return;
  } else if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  return json;
}
