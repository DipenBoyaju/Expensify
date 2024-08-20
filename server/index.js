import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routers/authRoutes.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import budgetRoutes from './routers/budgetRoutes.js'
import expenseRoutes from './routers/expenseRoutes.js'

dotenv.config();

const app = express();
const PORT = env.process.PORT || 3001;

app.use(cors({
  // origin: 'http://localhost:5173',
  origin: 'https://expensify-client.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', budgetRoutes);
app.use('/api', expenseRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);

    })

  } catch (error) {
    console.log('Error connecting to database:', error);
    process.exit(1);
  }
}

startServer();

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my server</h1>');
});

app.use((req, res) => {
  res.status(400).json({
    status: 'error',
    message: 'Page not Found'
  })
})