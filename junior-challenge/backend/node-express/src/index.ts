import express from 'express';
import cors from 'cors';
import citiesRouter from './routes/cities';
import matchesRouter from './routes/matches';
import itinerariesRouter from './routes/itineraries';
import optimiseRouter from './routes/optimise';

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/cities', citiesRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/route', optimiseRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🏟️  World Cup API running on http://localhost:${PORT}`);
});
