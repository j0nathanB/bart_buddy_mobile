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
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import hardCodedDestinations from './components/destinations';
import stationList from './components/station_coordinates';
import StationsMenu from './components/stationsmenu';
import DestinationsMenu from './components/destinationsmenu';
import Users from './components/users'
import StationSelector from  './components/stationselector';
import RouteSelector from  './components/routeselector';
import ExperimentalButton from './components/example_button'
import BulletinList from './components/bulletinlist'
 
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
      schedule: [{
        "minutes": "0",
        "destination": "nowhere"
      }],
      currentRouteChoices: hardCodedDestinations
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
    this.setState({ currentRoute: data });
  }

  updateStation(data) {
    this.setState({currentStation: stationList[data]});
  }

  getSchedule(station) {
    let tempSchedule = []; 
    let tempRoutes = [];   
    axios.post('http://localhost:1337/api/schedule', station)   
    .then(    
      res => { if (Array.isArray(res.data)) {
          //alert("Array.isArray is true")
          tempSchedule = res.data;
          tempSchedule.forEach((cur) => {
            if (tempRoutes.indexOf(cur.destination) === -1) {
              tempRoutes.push(cur.destination);
            }
          });
          //alert("TEMPROUTES = " + tempRoutes);
          this.setState({   
            schedule: tempSchedule,
            currentRouteChoices: tempRoutes   
          });
        }
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
        <MapContainer region={this.state.region} trains={this.state.schedule} />
        <Users />
        <UseLocationButton UseLocationButtonProps={"Determine my station"}/>
        <ClosestStation pushToClosestStation={"Powell Street"}/> 
        <StationSelector stationSelectHandler={this.updateStation} parentStation={this.state.currentStation.name}/>
        <RouteSelector routeSelectHandler={this.updateRoute} parentRoute={this.state.currentRoute} routeChoices={this.state.currentRouteChoices}/>
        <BulletinList station={this.state.currentStation} route={this.state.currentRoute} schedule={this.state.schedule}/>
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

});

AppRegistry.registerComponent('bart_buddy_mobile', () => bart_buddy_mobile);