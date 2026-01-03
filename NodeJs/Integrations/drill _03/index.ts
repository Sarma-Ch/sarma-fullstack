import { apiKeyClient } from "./apiKey";
import { oauthClient } from "./oAuth";
import { fetchJson } from "./fetch";

await apiKeyClient("https://api.example.com/data");

const client = await oauthClient(fetchJson);
await client("https://api.example.com/secure-data");
