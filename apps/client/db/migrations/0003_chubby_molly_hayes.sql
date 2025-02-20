CREATE TABLE IF NOT EXISTS "stripePaymentDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"stripe_price_id" text,
	"stripe_current_period_end" timestamp,
	CONSTRAINT "stripePaymentDetails_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "stripePaymentDetails_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id"),
	CONSTRAINT "stripePaymentDetails_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "stripePaymentDetails_stripe_price_id_unique" UNIQUE("stripe_price_id")
);
