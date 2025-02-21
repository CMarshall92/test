import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
  boolean
} from 'drizzle-orm/pg-core';

//--------------------------------------------
// Tables And Schema
//--------------------------------------------
export const inventory = pgTable('server_inventory', {
  id: serial('id').primaryKey(),
});