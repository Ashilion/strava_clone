import WidgetWrapper from "components/WidgetWrapper";
import { Map, GeoJson } from "pigeon-maps"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box , useTheme} from "@mui/material";

const MapsLinesWidget = (data) => {
  const { palette } = useTheme();

  const MAPTILER_ACCESS_TOKEN = 'Vg57jUmcWbC5Mi359F5y'
  const MAP_ID = palette.mode == "dark" ? 'basic-v2-dark' : 'basic-v2'
  const EXTENSION = "png"

  function mapTiler (x, y, z, dpr) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.${EXTENSION}?key=${MAPTILER_ACCESS_TOKEN}`
  }



  const token = useSelector((state)=> state.token);
  const [geoJson, setGeoJson] = useState([]); 
  const [geoJsonSample, setGeoJsonSample] = useState(null);

    const getGeoJson = () =>{
      fetch("http://localhost:3001/activity/geojson",{
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
    })
          .then(response => {
              if (!response.ok) {
              throw new Error('Réponse réseau incorrecte');
              }
              return response.json();
          })
          .then(data => {
              // Les données JSON sont dans la variable 'data'
              setGeoJson(data);
              const modifiedGeoJsonSample = {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: data, // Use the loaded data
                    properties: { prop0: "value0" },
                  },
                ],
              };
              setGeoJsonSample(modifiedGeoJsonSample);
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des données :', error);
          });
  }

  useEffect(() => {
      getGeoJson();
      // setGeoJsonSample(
      //   {
      //     type: "FeatureCollection",
      //     features: [
      //       {
      //         type: 'Feature',
      //         geometry: {
      //           type: 'LineString',
      //           coordinates: [
      //             [48.668437, 2.419959].reverse(),
      //             [48.676670, 2.440397].reverse(),
      //           ],
      //         },
      //         properties: {
      //           prop0: 'value0',
      //           prop1: 0.0,
      //         },
      //       },
      //     ]
      //    }
      //  )
  }, []);
  
  
  

    return (
      <div style={{ height:'270px', borderRadius: '15px', overflow: 'hidden' }}>
          <Map provider={mapTiler} width={400} height={300} defaultCenter={[48.668437, 2.419959]} defaultZoom={13} style={{ width: '100%', height: '200px' , borderRadius:"20px" }} >
            <GeoJson
              data={geoJsonSample}
              styleCallback={(feature, hover) => {
                if (feature.geometry.type === "LineString") {
                  console.log("okokk")
                  return { strokeWidth: "3", stroke: "green" };
                }
                return {
                  fill: "#d4e6ec99",
                  strokeWidth: "1",
                  stroke: "white",
                  r: "20",
                };
              }}
            />
          </Map>
          </div>
      )
}

export default MapsLinesWidget;