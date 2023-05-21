// Import necessary modules from Chart.js library and React-Chartjs-2 wrapper
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

// Register the necessary Chart.js components with the library
ChartJS.register(ArcElement, Tooltip, Legend);

// Define a functional component called Portfolio
function Portfolio() {
  // Define three random colors to use for the pie chart segments
  const datasetColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  const datasetColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  const datasetColor3 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

  // Render the component with a container div, title, and total value text
  // Also render a Pie chart with data and options
  return (
    <React.Fragment>
      <div className="container" style={{ width: 250, height: 125 }}>
        <h3 className="text-xl px-6 py-2 font-medium mr-2">Portfolio</h3>{" "}
        <p className="block font-medium px-4 mr-2 text-green-500">
          Total value:$1000
        </p>
        <div className="row">
          <div className="col-md-5 mb-3 px-2 mt-3">
            <Pie
              data={{
                labels: ["Ethereum", "Luna", "Tether"],
                datasets: [
                  {
                    label: "$",
                    data: [250, 375, 375],
                    backgroundColor: [
                      datasetColor1,
                      datasetColor2,
                      datasetColor3,
                    ],
                    borderWidth: 1,
                    hoverOffset: 20,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    fontSize: 20,
                    display: true,
                  },
                  labels: {
                    render: "value",
                    fontColor: "white",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                      fontFamily: "myriadpro-regular",
                      boxWidth: 10,
                      boxHeight: 10,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// Export the Portfolio component to use in other parts of the application
export default Portfolio;
