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
    titre: String, 
    distance: String,
    
    heartrateMean: String,
    denivelePositif: String,
    stringDuration: String,
    scoreTrimp: String, 
    data: Array,
    allure: String,
    date: {
      type: String,
    },
    
    location: String,
    description: String,
    gpxPath: String,
    data:Array,
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

const Activite = mongoose.model("Activite", activiteSchema);

export default Activite;