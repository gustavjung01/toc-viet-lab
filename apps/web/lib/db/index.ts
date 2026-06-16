import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

declare global {
  var __db: ReturnType<typeof drizzle> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDb(d1: any) {
  return drizzle(d1, { schema });
}

export * from "./schema";
