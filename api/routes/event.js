const router = require("express").Router();
const User = require("../models/Events");

//ADDEVENT
router.post("/addevent", async (req, res) => {
    try {
      
      const newEvents = new Events({
        username: req.body.username,
        title: req.body.email,
        decription: req.body.description,
      });
 
      const events = await newEvents.save();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATEEVENT
router.put("/:id", async (req, res) => {
   
    if (req.body.userId === req.params.id) {
     
      
      try {
        const updatedEvents = await Events.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedEvents);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Something went wrong");
    }
  });

  //DELETEEVENT
router.delete("/:id", async (req, res) => {
   
 
    try {
      const events = await Events.findById(req.params.id);
     
      try {
        await Events.findByIdAndDelete(req.params.id);
        res.status(200).json("Events has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("Event not found!");
    }
 
});

  module.exports = router;
   