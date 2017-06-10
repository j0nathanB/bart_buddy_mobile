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

const { width, height } = Dimensions.get('window')

import { Container } from 'native-base';

import MapContainer from './src/index';

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Map from './components/map';
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import Bulletin from './components/bulletin';
import hardCodedDestinations from './components/destinations';
import hardCodedStationsList from './components/stations';
import StationsMenu from './components/stationsmenu';
import DestinationsMenu from './components/destinationsmenu';

console.ignoredYellowBox = ['Warning: BackAndroid'];

export default class bart_buddy_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      isLoading: false,
      currentStation: hardCodedStationsList[0],
      currentRoute: hardCodedDestinations[0],
      schedule: [],
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
  }

  updateRoute(data) {
    alert(`Destination: Parent Component = ${data}`);
    this.setState({currentRoute: data});
    //this.simplePost(data, this.state.currentStation);
  }

  updateStation(data) {
    alert(`Station: Parent Component = ${data}`);
    this.setState({currentStation: data});
    //this.simplePost(data, this.state.currentStation);
  }

  getSchedule(station) {

  }

  render() {
    const region ={
      latitude: 37.706272,
      longitude: -122.468983,
      latitudeDelta: 0.5922,
      longitudeDelta: 0.0332
    }
    return (
      <View style={styles.container}>
        <MenuContext style={{ flex: 1 }}>        
          <MapContainer region={region} />
          <DestinationsMenu destinations={hardCodedDestinations} funcforDestination={this.updateRoute}/>
          <StationsMenu stationsList={hardCodedStationsList} funcForStation={this.updateStation}/>
        </MenuContext>
        <Text style={styles.welcome}>
          BART Buddy
        </Text>
        <Text style={styles.instructions}>
          "Everybody Needs One"
        </Text>
        <UseLocationButton UseLocationButtonProps={"Determine my station"}/>
        <ClosestStation pushToClosestStation={"Powell Street"} />     
        <Bulletin update={"Your train leaving in 3 minutes"} style={styles.bulletinStyle}/>
        <Bulletin update={"Your train leaving in 8 minutes"} style={styles.bulletinStyle}/>
        <Bulletin update={"Your train leaving in 17 minutes"} style={styles.bulletinStyle}/>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

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
  gregsNewStuff: {
    textAlign: 'left',
    color: 'cornflowerblue',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bart_buddy_mobile', () => bart_buddy_mobile);
