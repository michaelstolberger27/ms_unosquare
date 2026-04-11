import { Router } from 'express';
import * as ItineraryModel from '../models/Itinerary';

const router = Router();

/**
 * Itinerary Routes — Pre-built (no implementation needed)
 *
 * These endpoints handle saving and retrieving trip itineraries.
 */

// POST /api/itineraries — Save an optimised route
router.post('/', (req, res) => {
  try {
    const route = req.body;
    const result = ItineraryModel.create(route);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
});

// GET /api/itineraries/:id — Retrieve a saved itinerary
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = ItineraryModel.getById(id);

    if (!itinerary) {
      res.status(404).json({ error: 'Itinerary not found' });
      return;
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve itinerary' });
  }
});

export default router;
