import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const UsersGraph = () => {
  const { totalUsers } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Number of Users",
        data: totalUsers,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4f46e5",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(229, 231, 235, 0.3)",
        },
        ticks: {
          color: "#4b5563",
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.3)",
        },
        ticks: {
          color: "#4b5563",
          font: {
            family: "Inter, sans-serif",
          },
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#374151",
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Monthly User Registration",
        color: "#1f2937",
        font: {
          family: "Inter, sans-serif",
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: {
          family: "Inter, sans-serif",
        },
        bodyFont: {
          family: "Inter, sans-serif",
        },
        cornerRadius: 4,
      },
    },
  };

  return (
    <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default UsersGraph;
