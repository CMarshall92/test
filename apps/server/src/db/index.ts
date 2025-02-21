import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import env from '../env'

export const db = drizzle(neon(env().POSTGRES_URL!!));
