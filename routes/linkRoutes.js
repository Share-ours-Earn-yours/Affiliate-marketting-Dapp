const express = require("express");
const router = express.Router();
const Link = require("../models/link");

async function getNanoid() {
  const { nanoid } = await import("nanoid");
  return nanoid;
}

router.post("/addLink", async (req, res) => {
  const { url } = req.body;
  const nanoid = await getNanoid();
  const shortLink = nanoid(8);

  const newLink = new Link({ url, shortLink });

  try {
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: "Error creating the link" });
  }
});

router.get("/links", async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: "Error fetching links" });
  }
});

router.get("/links/:linkId", async (req, res) => {
  const { linkId } = req.params;

  try {
    const link = await Link.findById(linkId);
    if (link) {
      res.status(200).json(link);
    } else {
      res.status(404).json({ error: "Link not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the link" });
  }
});

router.post("/createShortLink", async (req, res) => {
  const { url } = req.body;
  const nanoid = await getNanoid();
  const shortLink = nanoid(8);

  const newLink = new Link({ url, shortLink });

  try {
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: "Error creating the short link" });
  }
});

module.exports = router;
