const D1_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`;

export function hasD1Env() {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_D1_DATABASE_ID && process.env.CLOUDFLARE_D1_TOKEN);
}

function d1Headers() {
  return {
    Authorization: "Bearer " + process.env.CLOUDFLARE_D1_TOKEN,
    "Content-Type": "application/json",
  };
}

export async function queryD1<T = any>(sql: string, params: Array<string | number | null> = []): Promise<T[]> {
  if (!hasD1Env()) {
    throw new Error("D1 env is not configured");
  }

  const res = await fetch(D1_API_URL, {
    method: "POST",
    headers: d1Headers(),
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result?.[0]?.results ?? [];
}

export async function executeD1(sql: string, params: Array<string | number | null> = []) {
  return queryD1(sql, params);
}
