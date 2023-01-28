const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

export async function getData(url) {
  const res = await fetch(url);
  return { ...(await res.json()), ok: res.ok };
}

export async function postData(url, data, contentType) {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'CSRF-Token': token,
      'Content-Type': contentType || 'application/json',
    },
    body: contentType ? data : JSON.stringify(data),
  });

  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.message || 'Something went wrong');
  }

  return response;
}
