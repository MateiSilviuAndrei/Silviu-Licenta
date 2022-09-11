import React, {PureComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Animated, SafeAreaView} from 'react-native';
import ShowTickets from './ShowTickets';
import Profile from './Profile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const {Navigator: BottomTabNavigator, Screen: BottomTabScreen} =
  createBottomTabNavigator();

class MainBottomTabNavigator extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <BottomTabNavigator
          tabBar={this._getTabBar}
          screenOptions={{headerShown: false}}
          initialRouteName="Tickets">
          <BottomTabScreen
            name="Tickets"
            options={{
              unmountOnBlur: true,
              tabBarLabelStyle: {fontSize: 16},
              tabBarIcon: ({color, size}) => (
                <FontAwesome5Icon name="ticket-alt" color={color} size={25} />
              ),
            }}
            component={ShowTickets}
          />
          <BottomTabScreen
            name="Profile"
            options={{
              unmountOnBlur: true,
              tabBarLabelStyle: {fontSize: 16},
              tabBarIcon: ({color, size}) => (
                <FontAwesome5Icon name="user" solid color={color} size={25} />
              ),
            }}
            component={Profile}
          />
        </BottomTabNavigator>
        <SafeAreaView style={{backgroundColor: 'white'}} />
      </>
    );
  }
}

export default MainBottomTabNavigator;
