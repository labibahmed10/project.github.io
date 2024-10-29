/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import SensorCard from "@/components/SensorCard";
import SensorChart from "@/components/SensorChart";

interface SensorDataType {
  temperature: any;
  humidity: any;
  airQualityIndex: any;
  labels: string[];
  datasets: {
    data: any[];
    label: string;
    borderColor: string;
    tension: number;
  }[];
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<any>(undefined);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Humidity (%)",
        data: [],
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Air Quality",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const sensorRef = ref(database, "sensor_data");

    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const latestData = Object.values(data) as SensorDataType[];
        const latest = latestData[latestData.length - 1];
        setSensorData(latest);
        const timestamp = new Date().toLocaleTimeString();
        setChartData((prevData: typeof chartData) => ({
          labels: [...prevData.labels, timestamp],
          datasets: prevData.datasets.map((dataset: { data: any }, index: number) => ({
            ...dataset,
            data: [...dataset.data, index === 0 ? latest.temperature : index === 1 ? latest.humidity : latest.airQualityIndex],
          })),
        }));
      }
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-5 mb-5">
        <SensorCard title="Temperature" value={sensorData?.temperature} unit="°C" />
        <SensorCard title="Humidity" value={sensorData?.humidity} unit="%" />
        <SensorCard title="Air Quality" value={sensorData?.airQualityIndex} unit="" category={sensorData?.airQualityCategory} />
      </div>
      <SensorChart data={chartData} />
    </div>
  );
};

export default Dashboard;
