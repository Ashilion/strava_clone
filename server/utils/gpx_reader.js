import fs from 'fs';
import xml2js from 'xml2js';
import geolib from 'geolib';

// Load the GPX file (replace 'your.gpx' with the actual file path)
const gpxFilePath = '15_1_2_3_4_3_2_1.gpx';


function readGpxFile(gpxFilePath){
    fs.readFile(gpxFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          console.error("yes c'est la")
          return;
        }
      
        // Parse the GPX data into a JavaScript object
        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
      
          const gpxData = result.gpx; // Assuming the root element is <gpx>
      
          // Process the GPX data to extract distance, time, and heart rate information
          const data = extractGPXInformation(gpxData);
          console.log(data[0])
          return data
        });
      });
    
}

async function readGpxFileSync(gpxFilePath){
  return new Promise((resolve, reject) => {
  fs.readFile(gpxFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        console.error("yes c'est la")
        return;
      }
    
      
    });
    try {
      const data = fs.readFileSync(gpxFilePath, 'utf8');
      // Parse the GPX data into a JavaScript object
      xml2js.parseString(data, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
    
        const gpxData = result.gpx; // Assuming the root element is <gpx>
    
        // Process the GPX data to extract distance, time, and heart rate information
        const data = extractGPXInformation(gpxData);
        console.log(data[0])
        return data
      });

    } catch (err) {
      console.error(err);
      console.error("yes c'est la")
      return;
    }
  });
}


function extractGPXInformation(gpxData) {
  // Access the relevant elements in the GPX data
  const trackpoints = gpxData.trk[0].trkseg[0].trkpt;

  let totalDistance = 0;
  const dataframe_gpx = []
  trackpoints.forEach((trackpoint, index) => {
    
    const time = trackpoint.time[0];
    const heartRate = trackpoint.extensions[0]['gpxtpx:TrackPointExtension'][0]['gpxtpx:hr'][0];
    const elevation = trackpoint.ele[0];
    const cadence = trackpoint.extensions[0]['gpxtpx:TrackPointExtension'][0]['gpxtpx:cad'][0];
    const lat = trackpoint.$.lat;
    const lon = trackpoint.$.lon;
    const new_row = {
      time: time,
      heartRate: heartRate,
      elevation: elevation,
      cadence: cadence,
      lat: lat,
      lon: lon
    }
    dataframe_gpx.push(new_row)
    if (index > 0) {
      const startPoint = trackpoints[index - 1];
      const endPoint = trackpoint;
    
      const distance = geolib.getDistance(
        { latitude: startPoint.$.lat, longitude: startPoint.$.lon },
        { latitude: endPoint.$.lat, longitude: endPoint.$.lon }
      );

      totalDistance += distance;
    }
  });

  console.log(`Total Distance: ${totalDistance/1000} kilometers`);
  return dataframe_gpx;
}

export default readGpxFile;