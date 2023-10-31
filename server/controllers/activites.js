import Activite from "../models/Activite.js";
import User from "../models/User.js";
import { convert_allure } from "../running_module/conversion.js";
import { 
  calcul_distance ,
  calcul_allure,
  calcul_trimp,
  calcul_zone_hr,
  string_duration,
  denivelePositif,
  heartRateMean,
} from "../utils/data_calculs.js";

import readGpxFile from "../utils/gpx_reader.js";

/* CREATE */
export const createActivite = async (req, res) => {
  try {
    const { userId, description, picturePath, gpxPath, titre} = req.body;
    const user = await User.findById(userId);

    const data = readGpxFile(gpxPath);
    const tab_zones = calcul_zone_hr(data, 200);

    const newActivite = new Activite({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      titre, 
      distance: calcul_distance(data),
      heartrateMean: heartRateMean(data),
      denivelePositif: denivelePositif(data),
      stringDuration: string_duration(data) ,
      scoreTrimp: calcul_trimp(tab_zones), 
      allure: calcul_allure(data),
      description,
      gpxPath,
      data:data,
      userPicturePath: user.picturePath,
      picturePath,
      
      likes: {},
      comments: [],
    });
    await newActivite.save();

    const activite = await Activite.find();
    res.status(201).json(activite);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
