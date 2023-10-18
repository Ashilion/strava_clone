const { useTheme } = require("@mui/material")
const { default: WidgetWrapper } = require("components/WidgetWrapper")
import { ResponsiveLine } from "@nivo/line";


const FitnessPlot =  ({
  data
}) =>{

    const {palette} = useTheme()
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper m="2rem 0">
            
        <ResponsiveLine
          data={data}
          

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
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? undefined : 'transportation',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard? undefined : 'count',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          enableGridX={false}
          enableGridY={false}
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
        </WidgetWrapper>
    )
}
    
