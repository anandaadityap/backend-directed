import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import JobSeeker from "./Jobseeker.js";

const { DataTypes } = Sequelize;

const Kandidat = db.define(
  "kandidat",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    domisili: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telp: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [8, 12],
      },
    },
    github: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobseekerId: {
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

JobSeeker.hasMany(Kandidat);
Kandidat.belongsTo(JobSeeker, { foreignKey: "jobseekerId" });

export default Kandidat;
