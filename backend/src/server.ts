import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload';

const app = express();
const port = process.env.PORT || 5001;

// Allowed origins list for CORS
const allowedOrigins = [
  'https://crm-4dya.vercel.app',
  'http://localhost:3000',
  'https://crm-827z.vercel.app' // Added another Vercel deployment
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

app.use('/api/upload', uploadRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
