import { Db, MongoClient } from "mongodb";

export const connectDB = async (): Promise<Db> => {
  const usr = "Javi2255";
  const pwd = "Javi2255";
  const dbName: string = "GestionPolideportivos";
  const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster0.e3eis.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`


  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    return client.db(dbName);
  } catch (e) {
    throw e;
  }
};