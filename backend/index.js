import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/user.route.js';
import blog from './routes/blog.route.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://blog-full-stack-mern-alpha.vercel.app","https://blog-full-stack-mern-git-main-bilal-ansaris-projects-b5a850b0.vercel.app","https://blog-full-stack-mern-mlmol041x-bilal-ansaris-projects-b5a850b0.vercel.app"],
  credentials:true,
}));
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT || 4001;
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))
app.use(cookieParser())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
mongoose.connect(mongoUrl)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));


app.use('/api/users', router)
app.use('/api/blogs', blog)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
