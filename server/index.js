import express from 'express';
import cors from 'cors';
import formRoutes from './Route.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000; // Use a porta do ambiente ou 3000 como fallback

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("Connected to Supabase!");