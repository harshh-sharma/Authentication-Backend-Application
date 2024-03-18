import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    crendentials:true
}))
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res) => {
    req.send("Hello"); 
});

app.use("/api/v1/user",router);

export default app;