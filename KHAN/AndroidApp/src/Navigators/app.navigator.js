import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./auth.navigator";
import MainNavigator from "./main.navigator";
import { useSelector, useDispatch } from "react-redux";
import {
  getRoomList,
  getCurrentRoomInfo,
  getNotificationList,
  setCurrentRoom,
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
} from "../redux/actions";

function AppNavigator(props) {
  const state = useSelector((state) => state.Auth);
  const currentRoom = useSelector((state) => state.RoomList.currentRoom);
  const isAuthenticated = state.user == null ? false : true;
  const dispatch = useDispatch();
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
    if (isAuthenticated && state.user) {
      dispatch(getRoomList(state.user));
      dispatch(getNotificationList(state.user));
    }
  }, [isAuthenticated]);
  return (
    <NavigationContainer>
      {isAuthenticated == false ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
