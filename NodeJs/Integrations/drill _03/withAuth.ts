export type HttpClient = (url: string, init?: RequestInit) => Promise<any>;

export function withAuth(client: HttpClient, token: string): HttpClient {
  return (url, init = {}) =>
    client(url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${token}`,
      },
    });
}
