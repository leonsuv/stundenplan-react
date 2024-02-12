//const globalproxy = "https://cors-anywhere.herokuapp.com/";
const localproxy = "http://127.0.0.1:8080/";
const proxyurl = localproxy;
const endpoint = proxyurl+"https://app.phwt.de/api"

export async function login(username: string, password: string) {
  return await makeRequest(
    "/v1/auth/login",
    "POST",
    `Basic ${btoa(`${username}:${password}`)}`
  );
}

export async function getEvents(refreshToken: string) {
  return await makeRequest(
    "/v2/events",
    "GET",
    refreshToken
  );
}

export async function getContacts(refreshToken: string) {
  return await makeRequest(
    "/v1/contacts",
    "GET",
    refreshToken
  )
}

export async function getRefresh(refreshToken: string) {
  return await makeRequest(
    "/v2/events/lastUpdate",
    "GET",
    refreshToken
  )
}

async function makeRequest(url: string, method: "POST" | "GET", authMethod: string) {
  const response = await fetch(endpoint+url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: authMethod
    }
  });

  if (!response.ok) return null;

  return await response.json();
}