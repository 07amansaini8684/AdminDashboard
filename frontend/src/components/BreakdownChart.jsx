import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const theme = useTheme();

  const { data, error, isLoading } = useGetSalesQuery();
//   console.log(data);
  if (!data || isLoading) return "Loading....";

  const colors = [
    "#FF5733", // Vibrant red-orange
    "#28A745", // Darker green
    "#3357FF", // Clear blue
    "#FF33A6", // Bright pink
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i % colors.length], // Ensure colors array is not exceeded
    })
  );

//   console.log("formattedData", formattedData);

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
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
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 150, right: 80, bottom: 200, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        padAngle={1.2}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        // enableArcLinkLabels={!isDashboard}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.secondary[200],
                },
              },
            ],
          },
        ]}
      />
      <Box   sx={{
          position: "absolute",
          top: "45%",
          right: "20%",
          transform: "translate(50%, -50%)",
        }}>
      <Typography
          color={theme.palette.secondary[200]}
          variant="h6"
          gutterBottom
        >
          {isDashboard && `Total: ${data.yearlySalesTotal} `}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-45%, -95%)",
        }}
      >
        <Typography
          color={theme.palette.secondary[200]}
          variant="h6"
          gutterBottom
        >
          {!isDashboard && `Total: ${data.yearlySalesTotal} `}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
