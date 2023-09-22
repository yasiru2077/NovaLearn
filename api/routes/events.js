const router = require("express").Router();
const Event = require("../models/Events");


router.post("/addevents", async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Get all events
  router.get("/", async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Get an event by ID
  router.get("/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Update an event by ID
  router.put("/:id", async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Delete an event by ID
  router.delete("/:id", async (req, res) => {
    try {
      await Event.findByIdAndRemove(req.params.id);
      res.status(200).json("Event deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  module.exports = router;