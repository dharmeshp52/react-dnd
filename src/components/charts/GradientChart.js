import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import faker from "faker";

// Register required Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Generate labels for the chart
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple",
];

// Generate random data for the chart datasets
const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
  ],
};

/**
 * Creates a gradient for the chart's border color.
 * @param {CanvasRenderingContext2D} ctx - The rendering context of the chart.
 * @param {object} area - The chart area.
 * @returns {CanvasGradient} - The gradient for the border color.
 */
const createGradient = (ctx, area) => {
  const colorStart = faker.random.arrayElement(colors);
  const colorMid = faker.random.arrayElement(
    colors.filter((color) => color !== colorStart)
  );
  const colorEnd = faker.random.arrayElement(
    colors.filter((color) => color !== colorStart && color !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

/**
 * GradientChart component displays a line chart with gradient border color using React Chart.js.
 * @returns {JSX.Element} - The GradientChart component.
 */
export const GradientChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return <Chart ref={chartRef} type="line" data={chartData} />;
};
