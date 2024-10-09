export async function backendAPICall(
  path: string, 
  method: string = 'GET', 
  data: any = null
) {
  const url = `${import.meta.env.VITE_PUBLIC_API_DOMAIN}/${path}`;

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

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

  try {
    const response = await fetch(url, options);
    if (response.status === 401 || response.status === 403) {
      localStorage.setItem('user', JSON.stringify(null)); 
      return { redirectToLogin: true };
    }

    if (!response.ok) {
      const errorResponse = await response.json(); 
      const errorMessage = errorResponse?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const json = await response.json();
    return json;

  } catch (error: any) {
    
    console.error('API Call Failed:', error.message);
    throw new Error(`${error.message}`);
  }
}
