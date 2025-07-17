import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats
} from '../controllers/urlController.js'; // ✅ named import

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/shorten/:code', getOriginalUrl);
router.put('/shorten/:code', updateShortUrl);
router.delete('/shorten/:code', deleteShortUrl);
router.get('/shorten/:code/stats', getUrlStats);

export default router; // ✅ Correct ESM export
