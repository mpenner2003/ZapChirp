import dotenv from 'dotenv';

dotenv.config();

console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_DB_URL:", process.env.MONGO_DB_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);