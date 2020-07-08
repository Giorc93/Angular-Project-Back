"use strict";

var Project = require("../models/mdlProject");

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: "Home controller",
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: "Test controller",
    });
  },
  saveProject: function (req, res) {
    var project = new Project();

    var body = req.body;

    project.name = body.name;
    project.description = body.description;
    project.category = body.category;
    project.langs = body.langs;
    project.year = body.year;
    project.image = null;

    project.save((err, projectSaved) => {
      if (err) return res.status(500).send("Server error...");
      if (!projectSaved) return res.status(400).send("Client error....");
      return res.status(200).send({
        project: projectSaved,
        message: "Success...",
      });
    });
  },
  getProject: function (req, res) {
    var params = req.params;
    var id = params.id;

    Project.findById(id, (err, projectFound) => {
      if (err) return res.status(500).send({ message: "Server error..." });
      if (!projectFound)
        return res.status(400).send({ message: "Client error..." });
      return res.status(200).send({
        project: projectFound,
        message: "¡Document found!",
      });
    });
  },
  getAll: function (req, res) {
    Project.find({}).exec((err, projects) => {
      if (err) return res.status(500).send({ message: "Server error..." });
      if (!projects)
        return res.status(400).send({ message: "Client error..." });
      return res.status(200).send({
        projects: projects,
        message: "Documents found",
      });
    });
  },
  updateProject: function (req, res) {
    var projectId = req.params.id;
    var upData = req.body;

    Project.findByIdAndUpdate(
      projectId,
      upData,
      { new: true },
      (err, projectUpd) => {
        if (err) return res.status(500).send({ message: "Server error..." });
        if (!projectUpd)
          return res.status(400).send({ message: "Client error..." });

        return res
          .status(200)
          .send({ message: "Document updated!", project: projectUpd });
      }
    );
  },
  deleteProject: function (req, res) {
    var projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
      if (err) return res.status(500).send({ message: "Server error..." });
      if (!projectDeleted)
        return res.status(400).send({ message: "Client error..." });

      return res
        .status(200)
        .send({ message: "Project deleted!", project: projectDeleted });
    });
  },
  uploadImage: function (req, res) {
    var projectId = req.params.id;

    if (req.files) {
      let file = req.files.image;
      let fileName = file.name;
      let fileExt = fileName.substr(fileName.lastIndexOf(".") + 1);
      if (
        fileExt == "png" ||
        fileExt == "jpeg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        file.mv("./uploads/" + fileName, (err) => {
          if (err)
            return res.status(500).send({ message: "Server foler error..." });
        });
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          (err, projectUpdated) => {
            if (err)
              return res.status(500).send({ message: "Server error..." });
            if (!projectUpdated)
              return res.status(400).send({ message: "Client error..." });

            return res.status(200).send({ message: fileName });
          }
        );
      } else {
        return res.status(500).send({ message: "Unvalid extension" });
      }
    } else {
      return res
        .status(400)
        .send({ message: "Client error... ", desc: "Image not loaded!" });
    }
  },
};

module.exports = controller;
