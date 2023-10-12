import mongoose from "mongoose";

const activiteSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    distance: String,
    allure: String,
    heartrateMean: String,
    denivelePositif: String,
    stringDuration: String,
    tabZonesFc: Array,
    scoreTrimp: String, 
    data: Array,
    date: {
      type: String,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },

  },
  { timestamps: true }
);

const Activite = mongoose.model("Post", activiteSchema);

export default Activite;