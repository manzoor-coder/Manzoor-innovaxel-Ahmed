import { nanoid } from 'nanoid';
import Url from '../models/url.js'; // ✅ Make sure the filename matches exactly
// const Url = require('../models/Url');


// Create Short URL
const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const newUrl = new Url({ url, shortCode });

  await newUrl.save();
  res.status(201).json(newUrl);
};

// Get Original URL
const getOriginalUrl = async (req, res) => {
  const { code } = req.params;
  const urlData = await Url.findOne({ shortCode: code });

  if (!urlData) return res.status(404).json({ error: "Short URL not found" });

  urlData.accessCount++;
  await urlData.save();

  res.status(200).json(urlData);
};

// Update URL
const updateShortUrl = async (req, res) => {
  const { code } = req.params;
  const { url } = req.body;

  const updated = await Url.findOneAndUpdate(
    { shortCode: code },
    { url, updatedAt: Date.now() },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Short URL not found" });
  res.status(200).json(updated);
};

// Delete URL
const deleteShortUrl = async (req, res) => {
  const { code } = req.params;
  const deleted = await Url.findOneAndDelete({ shortCode: code });

  if (!deleted) return res.status(404).json({ error: "Short URL not found" });
  res.status(204).send();
};

// Get Statistics
const getUrlStats = async (req, res) => {
  const { code } = req.params;
  const urlData = await Url.findOne({ shortCode: code });

  if (!urlData) return res.status(404).json({ error: "Short URL not found" });
  res.status(200).json(urlData);
};

// ✅ Export all functions individually or as named exports
export {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats
};
