/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";

export default function Component() {
  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6 w-full min-h-screen p-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-gray-500 dark:text-gray-400 font-medium">Live Temperature</div>
          <div className="text-5xl font-bold">24°C</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-gray-500 dark:text-gray-400 font-medium">Air Quality Index</div>
          <div className="flex items-center gap-2">
            <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">75</div>
            <div className="text-gray-500 dark:text-gray-400">Good</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div className="text-gray-900 dark:text-gray-50 font-medium">Highest Temperature</div>
                </div>
                <div className="text-4xl font-bold">28°C</div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div className="text-gray-900 dark:text-gray-50 font-medium">Lowest AQI</div>
                </div>
                <div className="text-4xl font-bold">45</div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div className="text-gray-900 dark:text-gray-50 font-medium">Avg. Temperature</div>
                </div>
                <div className="text-4xl font-bold">22°C</div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div className="text-gray-900 dark:text-gray-50 font-medium">Avg. AQI</div>
                </div>
                <div className="text-4xl font-bold">65</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
