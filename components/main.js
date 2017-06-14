import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
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

import MapContainer from '../src/index';
import axios from 'axios';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Map from './map';
import UseLocationButton from './uselocationbutton';
import ClosestStation from './closeststation';
import hardCodedDestinations from './destinations';
import stationList from './station_coordinates';
import StationsMenu from './stationsmenu';
import DestinationsMenu from './destinationsmenu';
import StationSelector from  './stationselector';
import RouteSelector from  './routeselector';
import ExperimentalButton from './example_button'
import BulletinList from './bulletinlist'
 
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
        "destination": " "
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
    const region = {
      latitude: 37.774836,
      longitude: -122.224175,
      latitudeDelta: 0.4,
      longitudeDelta: 0.52
    }

    const { navigate } = this.props.navigation;

    return ( 
      <View style={styles.container}>
        <MapContainer region={this.state.region} trains={this.state.schedule} />
        <Button onPress={() => navigate('Login')} title="Get SMS Updates" />
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
  gregsNewStuff: {
    textAlign: 'left',
    color: 'cornflowerblue',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Main', () => Main);