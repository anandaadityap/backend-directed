import Course from "../models/CourseModel.js";
import path from "path";
import fs from "fs";

export const getCourse = async (req, res) => {
  try {
    const response = await Course.findAll({
      attributes: [
        "id",
        "uuid",
        "title",
        "description",
        "level",
        "image",
        "url",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const response = await Course.findOne({
      attributes: [
        "id",
        "uuid",
        "title",
        "description",
        "level",
        "image",
        "url",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCourse = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const title = req.body.title;
  const description = req.body.description;
  const level = req.body.level;
  const file = req.files;
  console.log(file);
  const fileSize = file.image.data.length;
  const ext = path.extname(file.image.name);
  const fileName = file.image.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.image.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Course.create({
        title: title,
        description: description,
        level: level,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Course Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!course) return res.status(404).json({ msg: "Course tidak ditemukan" });
  let fileName = "";
  if (req.files === null) {
    fileName = course.image;
  } else {
    const file = req.files;
    console.log(file);
    const fileSize = file.image.data.length;
    const ext = path.extname(file.image.name);
    fileName = file.image.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    // const filepath = `./public/images/${course.image}`;
    // fs.unlinkSync(filepath);

    file.image.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const title = req.body.title;
  const description = req.body.description;
  const level = req.body.level;
  console.log(url);
  try {
    await Course.update(
      {
        title: title,
        description: description,
        level: level,
        image: fileName,
        url: url,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Course Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!course) return res.status(404).json({ msg: "Course tidak ditemukan" });
  try {
    // const filepath = `./public/images/${course.image}`;
    // fs.unlinkSync(filepath);
    await Course.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Course Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
