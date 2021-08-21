const express = require("express");
const path = require("path");
const router = express.Router();
const sendEmail = require("../utils/emails/sendmail");

async function handleMail(req, res) {
  try {
    const { name, _replyto } = req.body;
    console.log(name, _replyto);
    await sendEmail(
      _replyto,
      "Thanks for reaching out",
      {
        name: name,
      },
      "./template/thanks.handlebars"
    )
      .then((result) => {
        res.sendFile(path.join(__dirname, "../public/success.html"));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

router.post("/", handleMail);

module.exports = router;
