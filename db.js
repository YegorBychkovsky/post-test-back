// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;
// const connectionString = `${uri}/${dbName}`;

// const client = new MongoClient(connectionString);
export const db = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(
      "mongodb+srv://egorbychkovsky:i4NsUiXFcFQz4oIj@cluster0.3mjy18m.mongodb.net/blog",
    )
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

  // Вызываем функцию для проверки подключения
};
// export const db = client.db(dbName);
