import { env } from "./env";
import { fetchJson } from "./fetch";
import { withAuth, HttpClient } from "./withAuth";

interface TokenResponse {
  access_token: string;
  expires_in: number; 
}

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

const EARLY_REFRESH_MS = 60_000; 

async function fetchToken(): Promise<TokenResponse> {

  return fetchJson<TokenResponse>(env.TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt - EARLY_REFRESH_MS) {
    return cachedToken;
  }

  const token = await fetchToken();

  cachedToken = token.access_token;
  tokenExpiresAt = now + token.expires_in * 1000;

  return cachedToken;
}

export async function oauthClient(
  baseClient: HttpClient
): Promise<HttpClient> {
  const token = await getAccessToken();
  return withAuth(baseClient, token);
}
