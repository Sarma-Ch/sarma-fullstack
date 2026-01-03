async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  let data: unknown;

  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Invalid JSON response");
  }

  return data;
}
