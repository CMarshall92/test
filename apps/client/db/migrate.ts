require('dotenv').config({ path: '../.env.production' });
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!!);

const db = drizzle(sql as any);

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "db/migrations",
		});

		console.log("Migration successful");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();