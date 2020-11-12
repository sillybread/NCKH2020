import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './auth.navigator';
import MainNavigator from './main.navigator';
import { connect } from 'react-redux';
import { useSelector} from 'react-redux';


function AppNavigator(props) {
  const state = useSelector(state => state.Auth);
  const isAuthenticated = (state.user ==null)?false:true;
  return(
    <NavigationContainer>
      {isAuthenticated ==false ?
      (<AuthNavigator />):
      (<MainNavigator />)
      }
    </NavigationContainer>
  );
}

export default AppNavigator;