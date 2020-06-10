const associationsRouter = require("express").Router();
const { associationsWord } = require("../controller/translate.controller");

//get word associations
associationsRouter.route("/").post(associationsWord);

module.exports = { associationsRouter };