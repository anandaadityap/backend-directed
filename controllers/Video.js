import Video from "../models/VideoModel.js";

export const getVideo = async (req, res) => {
  try {
    const response = await Video.findAll({
      attributes: ["uuid", "courseId", "title_vid", "description_vid", "video"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const response = await Video.findOne({
      attributes: ["uuid", "courseId", "title_vid", "description_vid", "video"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVideoBycourseId = async (req, res) => {
  try {
    const response = await Video.findAll({
      attributes: ["uuid", "courseId", "title_vid", "description_vid", "video"],
      where: {
        courseId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createVideo = async (req, res) => {
  const { courseId, title_vid, description_vid, video } = req.body;

  try {
    await Video.create({
      title_vid: title_vid,
      description_vid: description_vid,

      courseId: courseId,
      video: video,
    });
    res.status(201).json({ msg: "Create Video Berhasil" });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Course tidak ditemukan", error: error.message });
  }
};

export const updateVideo = async (req, res) => {
  const videos = await Video.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!videos) return res.status(404).json({ msg: "Video tidak ditemukan" });
  const { courseId, title_vid, description_vid, video } = req.body;
  try {
    await Video.update(
      {
        courseId: courseId,
        title_vid: title_vid,
        description_vid: description_vid,
        video: video,
      },
      {
        where: {
          id: videos.id,
        },
      }
    );
    res.status(200).json({ msg: "Video Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!video) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Video.destroy({
      where: {
        id: video.id,
      },
    });
    res.status(200).json({ msg: "Video Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
