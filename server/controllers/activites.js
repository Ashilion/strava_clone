import Activite from "../models/Activite.js";
import User from "../models/User.js";
import { convert_allure } from "../running_module/conversion.js";


/* CREATE */
export const createActivite = async (req, res) => {
  try {
    const { userId, description, picturePath, distance, temps, fichier_gpx_name, titre} = req.body;
    const user = await User.findById(userId);
    const newActivite = new Activite({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      titre, 
      distance,
      temps,
      heartrateMean: ,
      denivelePositif: ,
      stringDuration: ,
      tabZonesFc: ,
      scoreTrimp: , 
      data: ,
      allure : ,
      description,
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
