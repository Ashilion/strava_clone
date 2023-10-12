export const convert_allure =(distance, temps) => {
    let allure = 0;
    if (distance && temps) {
      allure = (temps / distance).toFixed(2);
    }
    return allure;
  }

import gpxParser from 'gpxparser';

export const convert_gpx = (gpx) => {
    let gpxData = new gpxParser();
    gpxData.parse(gpx);
    let distance = (gpxData.distance / 1000).toFixed(2);
    console.log(gpxData)
    /*let temps = (gpxData.tracks[0].segments[0].time / 3600000).toFixed(2);
    let allure = convert_allure(distance, temps);*/
    return { distance };
    }

let distance = convert_gpx('../public/gpx_assets/15_1_2_3_4_3_2_1.gpx') 


import fs from 'fs';

fs.readFile('../public/gpx_assets/15_1_2_3_4_3_2_1.gpx', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log(data);
});

console.log(distance)