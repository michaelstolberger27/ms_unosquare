import { Router } from 'express';
import * as CityModel from '../models/City';

const router = Router();

/**
 * City Routes — YOUR TASK #1
 *
 * Implement the REST endpoints for cities.
 */

// ============================================================
//  GET /api/cities — Return all host cities
// ============================================================
//
// TODO: Implement this endpoint
//
// This should return all 16 host cities as a JSON array.
//
// Hint: The CityModel is already imported and has a getAll() method.
//
// Expected response: [{ id, name, country, latitude, longitude, stadium }, ...]
//
// ============================================================

router.get('/', (_req, res) => {
  // TODO: Replace with your implementation
  res.status(501).json({ error: 'Not implemented yet' });
});

export default router;
