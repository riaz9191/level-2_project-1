import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
};
