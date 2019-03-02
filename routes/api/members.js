const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const router = express.Router();

//Get Single Member
router.get("/:id", (req, res, next) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//Gets All Members
router.get("/", (req, res, next) => {
  res.json(members);
});

//Create Member
router.post("/", (req, res, next) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include name and email" });
  }

  members.push(newMember);
  res.status(200).json(members);
});

//Update member
router.put("/:id", (req, res, next) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;

    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updateMember.name ? updateMember.name : member.name),
          (member.email = updateMember.email
            ? updateMember.email
            : member.email);

        res.json({ msg: "Member was updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

router.delete("/:id", (req, res, next) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
