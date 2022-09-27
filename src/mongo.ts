import { Db, MongoClient } from "mongodb";

export const connectDB = async (): Promise<Db> => {
  const usr = "Javi2255";
  const pwd = "Javi2255";
  const dbName: string = "GestionPolideportivos";
  const mongouri: string = "mongodb+srv://Javi2255:Javi2255@cluster0.e3eis.gcp.mongodb.net/GestionPolideportivos?retryWrites=true&w=majority"


  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.log("MongoDB connected");
    return client.db(dbName);
  } catch (e) {
    throw e;
  }
};