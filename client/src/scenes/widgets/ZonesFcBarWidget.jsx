import { useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";
import { useState , useEffect} from "react";
import {Box} from "@mui/material"
const ZoneFcBarWidget =  () =>{

    const {palette} = useTheme()
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;

    
    const token = useSelector((state)=> state.token);

    const [dataZones, setDataZones] = useState([]); 

    const getZonesData = () =>{
        fetch("http://localhost:3001/fitness/zones",{
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
                setDataZones(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }

    useEffect(() => {
      getZonesData();
    }, []);

    

    return (
        <WidgetWrapper m="2rem 0">
          <Box width="1000px" height="500px" > 
          <ResponsiveBar
            data={dataZones}
            keys={[
                'zone1','zone2','zone3','zone4','zone5'
            ]}
            indexBy="test"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.2}
            innerPadding={20}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'purpleRed_green' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderRadius={5}
            borderWidth={1}
            borderColor="black"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'zone',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'temps',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            enableGridY={false}
            enableLabel={false}
            labelSkipWidth={5}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
          </Box>
        </WidgetWrapper>
    )
}
    
export default ZoneFcBarWidget