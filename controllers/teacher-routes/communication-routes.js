const router = require("express").Router();
const { Communication, Behavior } = require("../../models");

// Current location  "http:localhost:3001/api/communication"

router.get("/", async (req, res) => {
  try {
    const communicationData = await Communication.findAll({
      include: [{ model: Behavior }],
    });
    res.status(200).json(communicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/new-communication", async (req, res) => {
  try {
    res.render("new_communication");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const communicationData = await Communication.findByPk(req.params.id);
    if (!communicationData) {
      res.status(404).json({
        message: `no communication data found with id of ${req.params.id}`,
      });
    }
    res.status(200).json(communicationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new-communication", async (req, res) => {
  try {
    const newCommunication = await Communication.create({
      communicationMethod: req.body.communicationMethod,
      description: req.body.description,
      dateOfCommunication: req.body.dateOfCommunication,
      followUpNeeded: req.body.followUpNeeded,
    });
    res.render("homepage");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCommunication = await Communication.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedCommunication[0]) {
      res.status(404).json({
        message: `no communication data found with the id of ${req.params.id}`,
      });
    }
    res
      .status(200)
      .json({ message: `communication with id of ${req.params.id} updated` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCommunication = await Communication.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCommunication) {
      res.status(404).json({
        message: `no communication data with id ${req.params.id} found`,
      });
    }
    res
      .status(200)
      .json({ message: `communication with id ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

//thunder client

module.exports = router;
