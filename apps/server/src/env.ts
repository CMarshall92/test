import "dotenv/config.js";

export default function env() {
  return ({
    PORT: process.env.PORT,
    POSTGRES_URL: process.env.POSTGRES_URL
  })
}