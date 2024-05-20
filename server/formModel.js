import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.URL_MONGO;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function insertFormData(data) {
  try {
    await client.connect();
    await client.db("agile7").collection("cliente").insertOne(data);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to insert data');
  } finally {
    await client.close();
  }
}