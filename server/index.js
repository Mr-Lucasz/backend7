import express from 'express';
import cors from 'cors';
import formRoutes from './Route.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const allowedOrigins = ['http://localhost:3000', 'https://www.agile7tech.com.br', 'https://backend7-rho.vercel.app', 'http://localhost:4000'];

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000; // Use a porta do ambiente ou 3000 como fallback



app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use('/api/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("Connected to Supabase!");