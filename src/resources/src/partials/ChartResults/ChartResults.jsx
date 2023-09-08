import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const GenereteFormatDate = function (date) {
  try {
    if (!date) return "";
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (Exception) {
    console.log("Exception in GenereteFormatDate => " + Exception);
  }
};
export const getRandomColor = function () {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

export const ChartResults = ({ data }) => {
  if (data.length === 0) return;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const chartData = {
    labels: data.map((item) => GenereteFormatDate(item.date)),
    datasets: [
      {
        label: "Total Points",
        data: data.map((item) => item.totalPoints),
        borderColor: data.map((item) => getRandomColor()),
        fill: false,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};
