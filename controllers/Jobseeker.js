import Joobseeker from "../models/Jobseeker.js";
import path from "path";
import fs from "fs";

export const getJob = async (req, res) => {
  try {
    const response = await Joobseeker.findAll({
      attributes: [
        "id",
        "uuid",
        "name",
        "title",
        "description",
        "kualifikasi",
        "image",
        "url",
        "userId",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getJobByUserId = async (req, res) => {
  try {
    const response = await Joobseeker.findAll({
      attributes: [
        "id",
        "uuid",
        "name",
        "title",
        "description",
        "kualifikasi",
        "image",
        "url",
        "userId",
      ],
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const response = await Joobseeker.findOne({
      attributes: [
        "id",
        "uuid",
        "name",
        "title",
        "description",
        "kualifikasi",
        "image",
        "url",
        "userId",
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

export const createJob = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const kualifikasi = req.body.kualifikasi;
  const userId = req.body.userId;
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
      await Joobseeker.create({
        title: title,
        name: name,
        description: description,
        kualifikasi: kualifikasi,
        userId: userId,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Job Vacancy Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateJob = async (req, res) => {
  const job = await Joobseeker.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!job) return res.status(404).json({ msg: "Job Vacancy tidak ditemukan" });
  let fileName = "";
  if (req.files === null) {
    fileName = job.image;
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

    // const filepath = `./public/images/${job.image}`;
    // fs.unlinkSync(filepath);

    file.image.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const title = req.body.title;
  const name = req.body.name;
  const description = req.body.description;
  const kualifikasi = req.body.kualifikasi;
  const userId = req.body.userId;
  console.log(url);
  try {
    await Joobseeker.update(
      {
        name: name,
        title: title,
        description: description,
        kualifikasi: kualifikasi,
        userId: userId,
        image: fileName,
        url: url,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Job Vacancy Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteJob = async (req, res) => {
  const job = await Joobseeker.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!job) return res.status(404).json({ msg: "Job Vacancy tidak ditemukan" });
  try {
    // const filepath = `./public/images/${job.image}`;
    // fs.unlinkSync(filepath);
    await Joobseeker.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Job Vacancy Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
