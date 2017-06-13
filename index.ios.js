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
import axios from 'axios';

const { width, height } = Dimensions.get('window')

import { Container } from 'native-base';

import MapContainer from './src/index';

//import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Content, ActionSheet, Button, Header, Left, Right, Body, Title } from 'native-base';
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import Bulletin from './components/bulletin';
import hardCodedDestinations from './components/destinations';
import stationList from './components/station_coordinates';
import StationsMenu from './components/stationsmenu';
import DestinationsMenu from './components/destinationsmenu';
import Users from './components/users'
import StationSelector from './components/stationselector';
import RouteSelector from './components/routeselector';

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
      currentStation: stationList[0],
      currentRoute: hardCodedDestinations[0],
      schedule: [],
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
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
    //alert(`Destination: Parent Component = ${data}`);
    this.setState({currentRoute: data});
  }

  updateStation(data) {
    alert(`Station: Parent Component = ${stationList[data].name}`);
    this.setState({currentStation: stationList[data]});
  }

  getSchedule(station) {
    //alert("station = " + station);
    let tempSchedule = [];    
    axios.post('http://localhost:3000/api/schedule', station)   
    .then(    
      res => { 
        if (Array.isArray(res.data.station.etd)) {
          res.data.station.etd.map(    
            route => route.estimate.map(    
              eta => { tempSchedule.push( {minutes: eta.minutes, destination:route.destination} ) }     
            )     
          )    
        } else {
          res.data.station.etd.estimate.map(    
              eta => { tempSchedule.push( {minutes: eta.minutes, destination:eta.destination} ) }     
            )     
        }
      }
    ) 
    .then( () => {    
      this.setState({   
        schedule: tempSchedule    
      })    
    })    
    .catch(err => {   
      throw err;    
    });   
  }   

  componentDidMount() {   
    setInterval(() => this.getSchedule(this.state.currentStation), 15000)
  }

  render() {

    return (

      <View style={styles.container}>

        <MapContainer region={region} />

        <Text style={styles.welcome}>
          BART Buddy
        </Text>
        <Text style={styles.instructions}>
          "Everybody Needs One"
        </Text>
        <Users />
        <UseLocationButton UseLocationButtonProps={"Determine my station"}/>
        <ClosestStation pushToClosestStation={"Powell Street"}/> 
        <StationSelector stationSelectHandler={this.updateStation}/>
        <RouteSelector routeSelectHandler={this.updateRoute} parentRoute={this.state.currentRoute}/>
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