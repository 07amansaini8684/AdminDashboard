import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
// this is th chat
import { ResponsiveChoropleth } from "@nivo/geo";

import { geoData } from "state/geoData";

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
//   console.log("geoData", data);


const [domainValue, setDomainValue] = useState(null);

useEffect(() => {
  if (data && data.length > 0) {
    const maxValue = Math.max(...data.map(item => item.value));
    setDomainValue(maxValue);
    // console.log("dataRecevied")
  } else {
    // console.log("No data received from the backend");
  }
}, [data]); // Runs whenever 'data' changes

// console.log("DataComing", dataComing);  // This will always log the latest dataComing
// console.log("Max Domain Value:", domainValue);


 

// console.log(data)
  return (
    <Box m="1rem" p="1rem">
      <Header title="Geography" subtitle="Explore the World's Regions" />
      <Box mt="0.5rem" height="70vh">
        {data && Array.isArray(data) && data.length > 0 ? (
          <ResponsiveChoropleth
            data={Array.isArray(data) ? data : []}
            theme={{
              axis: {
                domain: {
                  link: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.text.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.text.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.text.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 10, left: -50 }}
            domain={[0, domainValue + domainValue]} // Adjust domain as needed
            unknownColor="#d9d9d9" // Light gray for unknown regions
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.65]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.5}
            borderColor="#ffffff" // White border for contrast
            colors={[
              "#f7b7a3", // Light pink
              "#f6d6a8", // Light yellow
              "#e9e78c", // Pale yellow-green
              "#b4e59f", // Light green
              "#8fd4b6", // Light teal
              "#6cb6f0", // Light blue
              "#8c7ae6", // Lavender
              "#e56e7c", // Coral
              "#c0392b", // Red
            ]}
            // defs={[
            //     {
            //         id: 'dots',
            //         type: 'patternDots',
            //         background: 'inherit',
            //         color: '#38bcb2',
            //         size: 4,
            //         padding: 1,
            //         stagger: true
            //     },
            //     {
            //         id: 'lines',
            //         type: 'patternLines',
            //         background: 'inherit',
            //         color: '#eed312',
            //         rotation: -45,
            //         lineWidth: 6,
            //         spacing: 10
            //     },
            //     {
            //         id: 'gradient',
            //         type: 'linearGradient',
            //         colors: [
            //             {
            //                 offset: 0,
            //                 color: '#000'
            //             },
            //             {
            //                 offset: 100,
            //                 color: 'inherit'
            //             }
            //         ]
            //     }
            // ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'CAN'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'CHN'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'ATA'
            //         },
            //         id: 'gradient'
            //     }
            // ]}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -120,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200], // Primary text color for visibility
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "black", // Change text color on hover
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h2" m="auto" color="textSecondary" align="center" fontWeight="bold">
              Loading data, please wait...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
