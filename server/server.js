import express from 'express';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import commentRouter from './routes/commentRoute.js';
import cors from 'cors'


const allowedOrigins=[
  'http://localhost:5173',
]

const app = express();
const port = process.env.PORT || 5173;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

app.use('/api/user',userRouter)
app.use('/api/user/post',postRouter);
app.use('/api/user/comment',commentRouter)
await connectDb();
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});