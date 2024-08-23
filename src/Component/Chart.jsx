import { useQuery } from "@tanstack/react-query";
import { FetchCoinHistory } from "../Services/Coinhistory";
import { Line } from "react-chartjs-2";
import { ChatDays } from "./Button";
import { useParams } from "react-router-dom";
import ResponsiveLoaders from "./Spinner";
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
import { useContext, useState } from "react";
import { MyStore } from "../Contextstore/Store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const { coinId } = useParams();
  const [Days, setDays] = useState(1);
  const { currency } = useContext(MyStore);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Chart", coinId, Days, currency],
    queryFn: () => FetchCoinHistory(coinId, Days, currency),
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-black min-h-[50vh]">
        <ResponsiveLoaders />
      </div>
    );
  }
  
  
  if (isError) {
    throw new Error(error);
  }
  
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }
  
  function PassingDays(day) {
    setDays(day);
  }

  return (
    <div className="flex w-full justify-center bg-black">
      <div className="sm:w-[80%] w-[97%] bg-black">
        <div className="w-full h-[60vh] cursor-pointer sm:ml-10 sm:w-[80%] mt-[100px] bg-black">
          <Line
            data={{
              labels: data.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return Days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: data.map((coin) => coin[1]),
                  label: `Price (Past ${Days} Days) in ${currency}`,
                  borderColor: "rgb(255, 255, 255)",
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 10, // Increase this if needed
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 10, // Increase this if needed
                    },
                  },
                },
              },
              elements: {
                point: {
                  radius: 0,
                },
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 10, // Increase the legend font size
                    },
                  },
                },
                tooltip: {
                  bodyFont: {
                    size: 10, // Increase tooltip font size
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full md:w-[50%] sm:mr-[30px] md:ml-0 flex flex-wrap justify-center">
            {ChatDays.map((Day) => (
              <button
                key={Day.value}
                className="h-[40px] w-[120px] md:w-[100px] mx-1 sm:mx-2 my-3 bg-yellow-500 text-black rounded-sm"
                onClick={() => PassingDays(Day.value)}
              >
                {Day.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
