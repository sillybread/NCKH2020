import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import React from "react";
import TChart from "./components/TChart";
export default function ThreeChart() {
  const cubeData = useSelector((state) => state.RoomData.cubeData);
  const currentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );

  const [data, setData] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [slice, setSlice] = React.useState({
    axis: "x",
    level: 0,
  });
  React.useEffect(() => {
    if (currentRoomInfo) {
      let xBlock = currentRoomInfo.size.x / currentRoomInfo.sensorDensity - 1;
      let yBlock = currentRoomInfo.size.y / currentRoomInfo.sensorDensity - 1;
      let zBlock = currentRoomInfo.size.z / currentRoomInfo.sensorDensity - 1;

      if (cubeData) {
        setData(cubeData.cubeData);
      } else {
        setData({
          values: new Array(xBlock).fill(
            new Array(yBlock).fill(new Array(zBlock).fill(90))
          ),
          min: 98,
          max: 99,
        });
      }
    } else {
      setData(null);
    }
  }, [cubeData, currentRoomInfo]);
  React.useEffect(() => {
    if (currentRoomInfo) {
      let xBlock = currentRoomInfo.size.x / currentRoomInfo.sensorDensity - 1;
      let yBlock = currentRoomInfo.size.y / currentRoomInfo.sensorDensity - 1;
      let zBlock = currentRoomInfo.size.z / currentRoomInfo.sensorDensity - 1;

      setConfig({
        size: {
          x: xBlock,
          y: yBlock,
          z: zBlock,
          tilesize: 5,
        },
        door: currentRoomInfo.door,
        "axis-labels": {
          "axis-x": {
            show: false,
            list: [],
          },
          "axis-y": {
            show: false,
            list: [],
          },
          "axis-z": {
            show: false,
            list: [],
          },
        },
      });
    } else {
      setConfig(null);
    }
  }, [currentRoomInfo]);

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {data && config && slice && (
        <TChart config={config} data={data} slice={slice} />
      )}
      <Text>3D Reander</Text>
    </Layout>
  );
}
