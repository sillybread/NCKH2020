import {
  Layout,
  Text,
  useTheme,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  SelectGroup,
} from "@ui-kitten/components";
import React from "react";
import { Dimensions, ScrollView, View, StyleSheet, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector, useDispatch } from "react-redux";
import AreaRoom from "../../components/areaRoom.component";
import { setCurrentRoom } from "../../redux/actions";
export default function MyLineChart({ navigation, state }) {
  const dispatch = useDispatch();
  const myRoom = useSelector((state) => state.RoomList.myRoom);
  const sharedRoom = useSelector((state) => state.RoomList.sharedRoom);
  const [mtemp, setMTemp] = React.useState([]);
  const [stemp, setSTemp] = React.useState([]);

  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0, 0));
  const [warehouse, setWarehouse] = React.useState([
    ["Kho 1", "Kho 2"],
    ["Kho 3"],
  ]);
  React.useEffect(() => {
    let a = [...warehouse[0]];
    let b = [...warehouse[1]];
    if (myRoom) {
      a = [...myRoom].map((r) => r.room.name);
      setMTemp(a);
    }
    if (sharedRoom) {
      b = [...sharedRoom].map((r) => r.room.name);
      setSTemp(b);
    }
    setWarehouse([[...a], [...b]]);

    console.log([[...a], [...b]]);
  }, [myRoom, sharedRoom]);
  React.useEffect(() => {
    console.log("run");
    if (selectedIndex.section === 0 && myRoom && myRoom[selectedIndex.row]) {
      dispatch(setCurrentRoom(myRoom[selectedIndex.row]));
    } else if (
      selectedIndex.section === 1 &&
      sharedRoom &&
      sharedRoom[selectedIndex.row]
    ) {
      dispatch(setCurrentRoom(sharedRoom[selectedIndex.row]));
    }
  }, [selectedIndex]);

  const [areaIndex, setAreaIndex] = React.useState(0);
  const [dataArray, setDataArray] = React.useState([
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ]);
  React.useEffect(() => {
    setDataArray([
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
    ]);
  }, [selectedIndex, areaIndex]);
  const [data, setData] = React.useState([
    { id: 0, title: "Khu vực cá ba sa", temperature: -18, status: "decrease" },
    { id: 1, title: "Khu vực tôm thẻ", temperature: -17, status: "increase" },
    { id: 2, title: "Khu vực thát lát", temperature: -10, status: "stability" },
    {
      id: 3,
      title: "Khu vực tôm càng xanh",
      temperature: -1,
      status: "stability",
    },
  ]);
  const areaData = useSelector((state) => state.RoomData.areaData);
  React.useEffect(() => {
    if (areaData && areaData[0] && areaData[areaData.length - 1].areas[0]) {
      setData(
        [...areaData[areaData.length - 1].areas].map((area) => ({
          id: area._id,
          title: area.name,
          status: "stability",
          temperature:
            Math.round((area.average ? area.average : area.value) * 100) / 100,
        }))
      );
    } else {
      setData([]);
    }
  }, [areaData]);

  const styles = StyleSheet.create({
    selectInput: { width: "95%", marginTop: 15, marginBottom: 10 },
    container: { flex: 1, alignItems: "center" },
    chartView: {
      backgroundColor: theme["background-basic-color-4"],
      width: "95%",
      borderRadius: 10,
      padding: 5,
    },
    chartTitle: { marginLeft: 4, marginTop: 10 },
    srollViewAre: {
      height: Dimensions.get("window").height * 0.24,
      marginTop: 15,
      width: "100%",
    },
    areRoomView: {
      backgroundColor: theme["background-basic-color-4"],
      padding: 20,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    areRoomFocus: { backgroundColor: theme["color-primary-focus"] },
  });

  return (
    <Layout style={styles.container} level="3">
      <Select
        style={styles.selectInput}
        selectedIndex={selectedIndex}
        value={warehouse[selectedIndex.section][selectedIndex.row]}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectGroup title="Kho của tôi">
          {mtemp.map((t) => (
            <SelectItem title={t} key={t} />
          ))}
        </SelectGroup>
        <SelectGroup title="Kho được chia sẽ">
          {stemp.map((t) => (
            <SelectItem title={t} key={t} />
          ))}
        </SelectGroup>
      </Select>
      <View style={styles.chartView}>
        <Text style={styles.chartTitle}>
          {data && data[areaIndex] && data[areaIndex].title}
        </Text>
        <LineChart
          withInnerLines={false}
          data={{
            labels: ["19:02", "19:03", "19:04", "19:05", "19:06", "19:07"],
            datasets: [
              {
                data: dataArray,
              },
            ],
          }}
          width={Dimensions.get("window").width * 0.9} // from react-native
          height={Dimensions.get("window").width * 0.5}
          yAxisLabel="-"
          yAxisSuffix="°C"
          yAxisInterval={1} // optional, defaults to 1
          bezier
          style={{
            marginVertical: 15,
            borderRadius: 5,
          }}
          chartConfig={{
            backgroundColor: "#000000",
            backgroundGradientFrom: theme["background-basic-color-4"],
            backgroundGradientTo: theme["background-basic-color-4"],
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (lever) => theme["color-primary-default"],
            labelColor: (lever) => theme["text-basic-color"],
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "2",
              strokeWidth: "4",
              stroke: theme["color-primary-default"],
            },
          }}
        />
      </View>
      <View style={styles.srollViewAre}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {data &&
            data[0] &&
            data.map((dt) => (
              <AreaRoom
                data={dt}
                key={dt.id}
                focus={dt.id == areaIndex ? true : false}
                onPressView={(key) => {
                  setAreaIndex(key);
                }}
              />
            ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
