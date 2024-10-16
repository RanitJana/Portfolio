import projectSchema from "../models/project.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import uploadImage, { deleteImage } from "../utils/cloudinary.js";
import fs from "fs";

const handleAddproject = AsyncHandler(async (req, res, _) => {
  const { name, description, tech, github = "", link = "" } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please add an image of your project",
    });
  }

  if (!name || !description || !tech) {
    fs.unlinkSync(`${req.file.path}`);

    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields",
    });
  }

  let secure_url = (await uploadImage(req.file.path, req.file.filename))
    .secure_url;

  fs.unlinkSync(`${req.file.path}`);

  await projectSchema.create({
    owner: req.admin._id,
    name,
    thumbnail: secure_url,
    description,
    tech,
    github,
    link,
  });
  return res.status(200).json({
    success: true,
    message: "Project added successfully",
  });
});

const handleUpdateProject = AsyncHandler(async (req, res, _) => {
  //id must be add into header as key _id
  const { name, description, tech, github = "", link = "" } = req.body;

  if (!name || !description || !tech) {
    fs.unlinkSync(`${req.file.path}`);

    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields",
    });
  }

  let projectId = req.headers?._id;

  if (!projectId) {
    return res.status(401).josn({
      success: false,
      message: "Please choose a valid project",
    });
  }

  let project = await projectSchema.findById(projectId);

  if (!project) {
    return res.status(401).josn({
      success: false,
      message: "Please choose a valid project",
    });
  }

  if (req.file) {
    await deleteImage(project.thumbnail);

    let secure_url = (await uploadImage(req.file.path, req.file.filename))
      .secure_url;

    project.thumbnail = secure_url;

    fs.unlinkSync(`${req.file.path}`);
  }

  project.name = name;
  project.description = description;
  project.tech = tech;
  project.github = github;
  project.link = link;

  project.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Project Updated successfully",
  });
});

const handleDeleteProject = AsyncHandler(async (req, res, _) => {
  //id must be add into header as key _id
  let projectId = req.headers?._id;

  if (!projectId) {
    return res.status(401).json({
      success: false,
      message: "Please select a valid project",
    });
  }

  let project = await projectSchema.findById(projectId);

  if (project.thumbnail != "") await deleteImage(project.thumbnail);

  await project.deleteOne({ _id: projectId });

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

const handleGetProject = AsyncHandler(async (req, res, _) => {
  let owner = req.params?.adminId;

  if (!owner) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid user",
    });
  }

  let projects = await projectSchema
    .find({ owner })
    .select("name thumbnail description link");
  return res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
});

const handleGetSingleProject = AsyncHandler(async (req, res, _) => {
  let id = req.params?.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid project",
    });
  }

  let project = await projectSchema
    .findById(id)
    .select("name thumbnail description tech github link");

  if (!project)
    return res.status(200).json({
      success: false,
      message: "Don't have any project with this id",
      data: null,
    });

  return res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    data: project,
  });
});

export {
  handleAddproject,
  handleDeleteProject,
  handleUpdateProject,
  handleGetProject,
  handleGetSingleProject,
};
