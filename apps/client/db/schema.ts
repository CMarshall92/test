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
import { createInsertSchema } from 'drizzle-zod';

//--------------------------------------------
// Tables And Schema
//--------------------------------------------
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  userId: text('user_id').unique(),
  name: text('name'),
  email: text('email'),
  image: text('image_url'),
  verified: boolean('verified').default(false),
  subscriptionActive: boolean('subscription_active').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const verificationTokens = pgTable('verificationTokens', {
  id: serial('id').primaryKey(),
  userId: text('user_id').unique(),
  code: text('code'),
  expiresAt: timestamp('expires_at').defaultNow(),
})

export const stripePaymentDetails = pgTable('stripePaymentDetails', {
  id: serial('id').primaryKey(),
  userId: text('user_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripePriceId: text('stripe_price_id').unique(),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
})

//--------------------------------------------
// Types
//--------------------------------------------
export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products as any);