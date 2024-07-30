export async function backendAPICall(path: string, method: string = 'GET', data: any = null) {
  const url = `${process.env.VITE_PUBLIC_API_DOMAIN}/${path}`;
  const token = localStorage.getItem('AUTH_TOKEN');

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

  const response = await fetch(url, options);A

  if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  return json;
}
