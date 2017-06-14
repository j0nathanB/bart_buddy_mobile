import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  MapView,
  Dimensions,
  StatusBarIOS
} from 'react-native'
import { StackNavigator } from 'react-navigation';

const { width, height } = Dimensions.get('window')

import { Container } from 'native-base';

import MapContainer from './src/index';
import axios from 'axios';
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import hardCodedDestinations from './components/destinations';
import stationList from './components/station_coordinates';
import StationsMenu from './components/stationsmenu';
import DestinationsMenu from './components/destinationsmenu';
import StationSelector from  './components/stationselector';
import RouteSelector from  './components/routeselector';
import ExperimentalButton from './components/example_button'
import Login from './components/login'
import Main from './components/main'

const bart_buddy_mobile = StackNavigator({
  Home: { screen: Main },
  Login: { screen: Login }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});

AppRegistry.registerComponent('bart_buddy_mobile', () => bart_buddy_mobile);