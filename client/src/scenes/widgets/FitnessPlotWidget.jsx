import { useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";
import { useState , useEffect} from "react";
import {Box} from "@mui/material"
const FitnessPlotWidget =  () =>{

    const {palette} = useTheme()
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;

    
    const token = useSelector((state)=> state.token);

    const [dataFitness, setDataFitness] = useState([]); 

    const getFitnessData = () =>{
        fetch("http://localhost:3001/fitness",{
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
                setDataFitness(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }

    useEffect(() => {
      getFitnessData();
    }, []);



    return (
        <WidgetWrapper m="2rem 0">
          <Box width="1000px" height="500px" > 
        <ResponsiveLine
          data={dataFitness}
          theme={{
              axis:{
                  domain :{
                      line : {
                          stroke : main
                      }
                  },
                  legend : {
                      text : {
                          fill : main
                      }
                  },
                  ticks : {
                      line : {
                          stroke : main,
                          strokeWidth : 1
                      },
                      text : {
                          fill : main
                      }
                  }
              },
              legends : {
                  text : {
                      fill : main
                  }
              }
          }}
          colors={{ scheme: 'nivo'}}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false
          }}
          yFormat=" >-.2f"
          curve="linear"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'transportation',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          areaOpacity={0.45}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />   
          </Box>
        </WidgetWrapper>
    )
}
    
export default FitnessPlotWidget