"use strict";

var express = require("express");
var projectController = require("../controllers/ctlProject");

var router = express.Router();

router.get("/home", projectController.home);
router.post("/test", projectController.test);
router.post("/save", projectController.saveProject);
router.get("/getP/:id?", projectController.getProject);
router.get("/getA", projectController.getAll);
router.put("/update/:id?", projectController.updateProject);
router.delete("/delete/:id?", projectController.deleteProject);
router.post("/uploadImg/:id?", projectController.uploadImage);

module.exports = router;
