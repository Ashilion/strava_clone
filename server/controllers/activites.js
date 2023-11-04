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
import { dirname } from 'path';
import { fileURLToPath } from 'url';





/* CREATE */
export const createActivite = async (req, res) => {
  try {
    const { userId, description, picturePath, gpxPath, titre} = req.body;
    const user = await User.findById(userId);
    
    // Obtenez le chemin du répertoire du fichier en cours d'exécution
    const currentDirectory = dirname(fileURLToPath(import.meta.url));
    
    const data = await readGpxFile(`${currentDirectory}/../public/assets/${gpxPath}`);
    console.log(`data test hr : ${data[2].heartRate}`);
    console.log("test1azer")

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
      //scoreTrimp: calcul_trimp(tab_zones), 
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
export const getFeedActivities = async (req, res) => {
  try {
    const activite = await Activite.find();
    res.status(200).json(activite);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getActivity = async (req, res) =>{
  try{
    const { id } = req.params;
    const activity = await Activite.findById(id);

    res.status(200).json(activity);
  }catch(err){
    res.status(404).json({message:err.message})
  }
}