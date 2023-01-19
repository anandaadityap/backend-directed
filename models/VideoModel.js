import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Course from "./CourseModel.js";

const { DataTypes } = Sequelize;

const Video = db.define(
  "video",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title_vid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description_vid: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [3, 100],
      },
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Course.hasMany(Video);
Video.belongsTo(Course, { foreignKey: "courseId" });

export default Video;
