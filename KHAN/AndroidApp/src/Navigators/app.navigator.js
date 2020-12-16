import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./auth.navigator";
import MainNavigator from "./main.navigator";
import { useSelector, useDispatch } from "react-redux";
import {
  getRoomList,
  getCurrentRoomInfo,
  getNotificationList,
  getAreaData,
  getCurrentData,
  getSensorData,
  getCubeData,
  getRoomStructure,
  getUserAccess,
  getActivates,
  getAreas,
  getAreaDataFailed,
  getCurrentDataFailed,
  getSensorDataFailed,
  getCubeDataFailed,
  getRoomStructureFailed,
  getUserAccessFailed,
  getActivatesFailed,
  getAreasFailed,
  getAreaDataSuccess,
  getCubeDataSuccess,
  getCurrentDataSuccess,
  updateRoomSuccess,
  pushNotification,
  updateNotification,
  getSensorDataSuccess,
  deleteRoomSuccess,
  addSensorSuccess,
  deleteSensorSuccess,
  updateSensorSuccess,
  updateAccessSuccess,
  AddAccessSuccess,
  deleteAccessSuccess,
} from "../redux/actions";
var io = require("socket.io-client");
const { BASE_URL } = require("../constants/apiConfig");

function AppNavigator(props) {
  const state = useSelector((state) => state.Auth);
  const currentRoom = useSelector((state) => state.RoomList.currentRoom);
  const webSocket = React.useRef(null);
  const dispatch = useDispatch();
  const checkDispatch = (room_id, action) => {
    if (currentRoom && currentRoom.room._id === room_id) {
      dispatch(action);
      console.log("DISPACH");
    }
  };

  const checkAnoUserAction = (room_id, actionBy, action) => {
    if (
      currentRoom &&
      currentRoom.room._id === room_id &&
      actionBy != state.user.user._id
    ) {
      dispatch(action);
    }
  };

  React.useEffect(() => {
    if (currentRoom && state.user && currentRoom.room._id) {
      console.log(currentRoom, "sad");

      dispatch(getAreaDataFailed(null));
      dispatch(getCurrentDataFailed(null));
      dispatch(getSensorDataFailed(null));
      dispatch(getCubeDataFailed(null));

      dispatch(getRoomStructureFailed(null));
      dispatch(getUserAccessFailed(null));
      dispatch(getActivatesFailed(null));
      dispatch(getAreasFailed(null));

      //

      dispatch(getCurrentRoomInfo(state.user, currentRoom.room._id));

      dispatch(getAreaData(state.user, currentRoom.room._id));
      dispatch(getCurrentData(state.user, currentRoom.room._id));
      dispatch(getSensorData(state.user, currentRoom.room._id));
      dispatch(getCubeData(state.user, currentRoom.room._id));

      dispatch(getRoomStructure(state.user, currentRoom.room._id));
      dispatch(getUserAccess(state.user, currentRoom.room._id));
      dispatch(getActivates(state.user, currentRoom.room._id));
      dispatch(getAreas(state.user, currentRoom.room._id));
    }
  }, [currentRoom]);

  React.useEffect(() => {
    if (state.user) {
      if (!currentRoom) {
        dispatch(getRoomList(state.user));
        dispatch(getNotificationList(state.user));
      }
      if (currentRoom) {
        if (webSocket.current) webSocket.current.disconnect();
        webSocket.current = io.connect(BASE_URL);
        console.log("Connect");
        const socket = webSocket.current;
        console.log(
          "Socket io Client run socket client with room: ",
          currentRoom.room._id
        );

        socket.on("connect", function () {
          console.log("Socket io Client  Connected");
          socket.emit("login", state.user.accessToken);
        });

        socket.on("data_cube_room", function (data) {
          checkDispatch(data.room, getCubeDataSuccess(data));
          console.log("Socket io Client Cube");
        });
        socket.on("data_sensor", function (data) {
          checkDispatch(data.room, getSensorDataSuccess(data));
          console.log("Socket io Client Sensor");
        });

        socket.on("data_room", function (data) {
          checkDispatch(data.room, getCurrentDataSuccess(data));
          console.log("Socket io Client Curent Data");
        });
        socket.on("log", function (data) {
          console.log("Socket io Client Log", data);
        });

        socket.on("data_area", function (data) {
          checkDispatch(data.room, getAreaDataSuccess(data));
          console.log("Socket io Client Area");
        });

        socket.on("notification", function (data) {
          if (data.message == "add") {
            dispatch(pushNotification(data.data));
          }
          if (data.message == "update") {
            dispatch(updateNotification(data.data._id, data.data));
          }
          console.log("Socket io Client Notification");
        });

        /* socket.on("access", function (data) {
          console.log(data);
          if (data.message == "accepted") {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateAccessSuccess(data.data.access)
            );
          }
          if (data.message == "invite") {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              AddAccessSuccess(data.data.access)
            );
          }
          if (data.message == "add") {
            if (
              state.user &&
              data.data.access.user &&
              data.data.access.user._id === state.user.user._id
            ) {
              socket.emit("join-room", "room" + data.data.room._id);
              dispatch(getRoomList(state.user));
            }
          }
          if (data.message == "edit") {
            if (
              state.user &&
              data.data.access.user &&
              data.data.access.user._id !== state.user.user._id
            ) {
              checkAnoUserAction(
                data.data.room._id,
                data.data.actionBy,
                updateAccessSuccess(data.data.access)
              );
            } else {
              dispatch(getRoomList(state.user));
            }
          }
          if (data.message == "delete") {
            if (
              state.user &&
              data.data.access.user &&
              data.data.access.user._id !== state.user.user._id
            ) {
              checkAnoUserAction(
                data.data.room._id,
                data.data.actionBy,
                deleteAccessSuccess(data.data.access._id)
              );
            } else {
              socket.emit("leave-room", "room" + data.data.room._id);
              dispatch(getRoomList(state.user));
            }
          }
          console.log("Socket io Client Access ", data);
        });

        socket.on("room", function (data) {
          if (data.message == "edit") {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateRoomSuccess(data.data.room)
            );
          }
          if (data.message == "delete") {
            socket.emit("leave-room", "room" + data.data.room._id);
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              deleteRoomSuccess(data.data.room._id)
            );
          }

          console.log("Socket io Room Info ", data);
        });

        socket.on("structure", function (data) {
          if (data.message == "add") {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              addSensorSuccess(data.data.structure)
            );
          }
          if (data.message == "update") {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateSensorSuccess(data.data.structure)
            );
          }
          if (data.message == "delete") {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              deleteSensorSuccess(data.data.structure)
            );
          }
          console.log("Socket io Client Structure ", data);
        }); */

        socket.on("disconnect", function () {});
      }
    } else {
      console.log("Disconnect");
      if (webSocket.current) webSocket.current.disconnect();
      webSocket.current = null;
    }
    return () => {
      console.log("Disconnect");
      if (webSocket.current) webSocket.current.disconnect();
      webSocket.current = null;
    };
  }, [state.user, currentRoom]);
  return (
    <NavigationContainer>
      {!state.user ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
