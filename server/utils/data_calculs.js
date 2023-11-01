import { read } from "fs";
import readGpxFile from "./gpx_reader.js";
import { start } from "repl";
import geolib from 'geolib';

export const heartRateMean = (data)=>{
  console.log(data.length)
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += parseInt(data[i].heartRate);
  }
  console.log(sum)
  return (sum/data.length).toFixed(0);
}

export const string_duration = (data) => {
  const start = new Date(data[0].time);
  const end = new Date(data[data.length-1].time);
  const differenceInMilliseconds =  (end - start);
  const hours = Math.floor(differenceInMilliseconds / 3600000); // 1 heure = 3600000 millisecondes
  const minutes = Math.floor((differenceInMilliseconds % 3600000) / 60000); // 1 minute = 60000 millisecondes
  const seconds = Math.floor((differenceInMilliseconds % 60000) / 1000); // 1 seconde = 1000 millisecondes
  if (hours)
      return (`${hours}h ${minutes}m ${seconds}s`)
    else 
      return (`${minutes}m ${seconds}s`)
}

export const denivelePositif = (data)=> {
  let sum = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i].elevation > data[i-1].elevation){
      sum += data[i].elevation - data[i-1].elevation;
    }
  }
  return sum.toFixed(0);
}

function calcul_duration(data){
  const start = new Date(data[0].time);
  const end = new Date(data[data.length-1].time);
  const differenceInMilliseconds =  (end - start);
  return differenceInMilliseconds/1000
}

export const  calcul_distance = (data)=>{
  let totalDistance = 0 
  data.forEach((point, index)=>{
    if (index > 0){
      const startPoint = data[index - 1];
      const endPoint = point;
    
      const distance = geolib.getDistance(
        { latitude: startPoint.lat, longitude: startPoint.lon },
        { latitude: endPoint.lat, longitude: endPoint.lon }
      );

      totalDistance += distance;
    }
    
    })
    return (totalDistance/1000).toFixed(2)

  
  
}

export const calcul_allure = (data) =>{
  let distance = calcul_distance(data)
  let duration = calcul_duration(data)/60
  let allure = duration/distance
  let minutes = Math.floor(allure)
  let secondes = Math.floor((allure - minutes)*60)
  return `${minutes},${secondes}`

}

export const calcul_zone_hr = (data, fc_max) =>{
  const tab_zones =[0,0,0,0,0]
  for (let i = 1; i < data.length; i++) {
    let fc = data[i].heartRate
    let pourcentage_fc_max = fc*100/fc_max
    let zone = Math.floor((pourcentage_fc_max-50)/10)+1
    const start = new Date(data[i-1].time)
    const end = new Date(data[i].time)
    delta_time =  (end-start)/1000
    tab_zones[zone-1] += delta_time
  }
  return tab_zones
  
  
}

export const calcul_trimp = (zones)=>{
  let total = 0;
  for(i = 0 ; i < zones.length ; i++){
    total += zones[i]*(i+1)/60
  }
  return total
}



function calculPaceInstantane (startPoint, endPoint){
  const distance = geolib.getDistance(
    { latitude: startPoint.lat, longitude: startPoint.lon },
    { latitude: endPoint.lat, longitude: endPoint.lon }
  );
  
  const start = new Date(startPoint.time);
  const end = new Date(endPoint.time);
  let differenceInMilliseconds =  (end - start);
  differenceInMilliseconds == 0 ? differenceInMilliseconds = 1000 : differenceInMilliseconds= differenceInMilliseconds;
  const diffInSeconds = differenceInMilliseconds/1000
  console.log(`temps:${differenceInMilliseconds}, distance:${distance}, allure:${distance/differenceInMilliseconds}`)
  return (distance/differenceInMilliseconds)*1000
}

function allPaceInstantane (data){
  let temp = []
  let res = []
  for(let i = 1 ; i < data.length ; i++){
    const startPoint = data[i-1]
    const endPoint = data[i]
    temp.push(calculPaceInstantane(startPoint, endPoint))
  }

  let smoothedPace = smoothData(temp, 20);
  for (let i = 0; i <data.length-1; i++){
    res.push({
      x:i,
      y:smoothedPace[i]
    })
  }
  return res
}

export const getZonesNivo = async (req, res) =>{
  try {
    const gpxFilePath = 'utils/15_1_2_3_4_3_2_1.gpx';

   // const data_gpx =readGpxFile(gpxFilePath) 
    //console.log(data_gpx)
    console.log('aaaa')
    //const tabZones = calcul_zone_hr(data_gpx, 200);
    let dataZones = [
      {
        zone: 1,
        //temps: tabZones[0]
        temps:20
      },
      {
        zone: 2,
        //temps: tabZones[1]
        temps:12
      },
      {
        zone: 3,
        //temps: tabZones[2]
        temps:35
      },
      {
        zone: 4,
        //temps: tabZones[3]
        temps:47
      },
      {
        zone: 5,
        //temps: tabZones[4]
        temps:5
      },
      
    ];

    dataZones =[{
      test:1,
      zone1:20,
      zone2:30,
      zone3:15,
      zone4: 12,
      zone5:2
    }]
    res.status(200).json(dataZones);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getHeartrateNivo = async(req,res) =>{
  try{
    const gpxFilePath = 'utils/15_1_2_3_4_3_2_1.gpx';

    const data_gpx = await readGpxFile(gpxFilePath) 

    let hr_data = [{
        id:"Heartrate",
        color:"hsl(0, 82%, 39%)",
        data:[]
    }
    ]

    for(let i = 0; i< data_gpx.length; i++){
      let point_atl = {x:i, y:data_gpx[i].heartRate};
      hr_data[0].data.push(point_atl);
      
    }

    return res.status(200).json(hr_data)
    }
  catch(err){
    return res.status(404).json({message: err.message})
  }
  
}

export const getPaceNivo = async(req,res) =>{
  try{
    const gpxFilePath = 'utils/15_1_2_3_4_3_2_1.gpx';

    const data_gpx = await readGpxFile(gpxFilePath) 
    const pace_tab = allPaceInstantane(data_gpx)
    console.log("nouveau test" ,pace_tab[50])

    let pace_data = [{
        id:"Pace",
        color:"hsl(02, 87%, 33%)",
        data: pace_tab
    }
    ]


    return res.status(200).json(pace_data)
    }
  catch(err){
    return res.status(404).json({message: err.message})
  }
}

export const getDeniveleNivo = async(req,res) =>{
  try{
    const gpxFilePath = 'utils/15_1_2_3_4_3_2_1.gpx';

    const data_gpx =await readGpxFile(gpxFilePath) 
    let denivele_data = [{
        id:"Denivelé",
        color:"hsl(02, 87%, 33%)",
        data:[]
    }
    ]

    for(let i = 0; i < data_gpx.length; i++){
      let point_atl = {x:i, y:data_gpx[i].elevation};
      denivele_data[0].data.push(point_atl);
      
    }

    return res.status(200).json(denivele_data)
    }
  catch(err){
    return res.status(404).json({message: err.message})
  }
}

function smoothData(data, windowSize) {
  if (data.length < windowSize) {
    return data; // Pas assez de données pour lisser
  }

  const smoothedData = [];
  const halfWindowSize = Math.floor(windowSize / 2);

  for (let i = 0; i < data.length; i++) {
    if (i < halfWindowSize || i >= data.length - halfWindowSize) {
      smoothedData.push(data[i]); // Les bords ne sont pas modifiés
    } else {
      const window = data.slice(i - halfWindowSize, i + halfWindowSize + 1);
      const sum = window.reduce((acc, value) => acc + value, 0);
      const average = sum / window.length;
      console.log(average)
      smoothedData.push(average);
    }
  }

  return smoothedData;
}
