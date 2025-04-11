import mongoose from "mongoose";

export default async function dbConnect() {
    await mongoose.connect(String(process.env.MONGODB_URI), {
        dbName: "Hono"
    })
    .then((c)=> console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));;
}