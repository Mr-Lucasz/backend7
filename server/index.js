import express from 'express';
import cors from 'cors';
import formRoutes from './Route.js';
import { run } from './Database.js';

const app = express();
const port = process.env.PORT || 3000; // Use a porta do ambiente ou 3000 como fallback

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

run().catch(console.dir);