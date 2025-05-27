import express from 'express';
import authRoutes from "./routes/auth.routes";
import env from './config/env.config';
import connectDB  from './config/db.config';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = env.PORT||8000;
connectDB();

app.listen(PORT,()=>{
    console.log(`server running at PORT : ${PORT}`);
})



