import React, { Component } from 'react';
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from './components/login'
import Main from './main'

const bart_buddy_mobile = StackNavigator({
  Home: { screen: Main },
  Login: { screen: Login }
});

AppRegistry.registerComponent('bart_buddy_mobile', () => bart_buddy_mobile);