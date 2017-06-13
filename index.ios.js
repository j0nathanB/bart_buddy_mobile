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
import axios from 'axios';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Map from './components/map';
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import Bulletin from './components/bulletin';
import hardCodedDestinations from './components/destinations';
import hardCodedStationsList from './components/stations';
import StationsMenu from './components/stationsmenu';
import DestinationsMenu from './components/destinationsmenu';
import Users from './components/users'

import ExperimentalButton from './components/example_button'
 
console.ignoredYellowBox = ['Warning: BackAndroid'];

export default class bart_buddy_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.774836,
        longitude: -122.224175,
        latitudeDelta: 0.3,
        longitudeDelta: 0.82
      },
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

  componentWillMount() {
    axios.get('http://localhost:1337/api/getgtfs')
      .then((data) => {
        console.log(data.data)
        this.setState({
          schedule: data.data
        })
      })
      .catch(err => {
        console.log('error on the front: ', err)
      })
  }

  experimentalFunction() {
    this.setState({
      region: {
      latitude: 37.004836,
      longitude: -122.224175,
      latitudeDelta: 0.003,
      longitudeDelta: 0.0082
      }
    })
    alert("index.ios.js: \'Use My Location\' button pressed");
    //getCurrentPosition((data) => {alert(data)});
  }
  

  updateRoute(data) {
    alert(`Destination: Parent Component = ${data}`);
    this.setState({ currentRoute: data });
    //this.simplePost(data, this.state.currentStation);
  }

  updateStation(data) {
    alert(`Station: Parent Component = ${data}`);
    this.setState({ currentStation: data });
    //this.simplePost(data, this.state.currentStation);
  }

  getSchedule(station) {

  }

  render() {

    return (

      <View style={styles.container}>
              
          <MapContainer region={this.state.region} 
          trains={this.state.schedule} />
      
   
        <Text style={styles.welcome}>
          BART Buddy
        </Text>
        <Text style={styles.instructions}>
          "Everybody Needs One"
        </Text>
        <Users />
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