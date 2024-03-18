
import app from "./app.js";
import dotenv from "dotenv";
import connectToDB from "./conffig/db.js";

dotenv.config();

          


const PORT = process.env.PORT || 3500;

app.listen(PORT,() => {
    connectToDB();
    console.log(`server successfully running on http://localhost:${PORT}`);
});