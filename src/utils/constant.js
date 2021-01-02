import { config } from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
  config();
}
export const baseUrl = process.env.BASE_URL;
