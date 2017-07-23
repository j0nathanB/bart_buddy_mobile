
import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  View,
  MapView,
  Dimensions,
  StatusBarIOS
} from 'react-native'

import { Card, Container, Content, Separator, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
const { width, height } = Dimensions.get('window');
import MapContainer from './src/index';
import axios from 'axios';
import stationList from './components/station_coordinates';
import SocketIOClient from 'socket.io-client';
import AppButton from './components/appButton'
import BulletinList from './components/bulletin';
 
console.ignoredYellowBox = ['Warning: BackAndroid'];

export default class Main extends Component {
  constructor(props) {
    super(props);
      this.state = {
      region: {
        latitude: 37.75042,
        longitude: -122.22823,
        latitudeDelta: 0.4,
        longitudeDelta: 0.5
      },
      station: null,
      train: [],
      newRegion: null,
      lat: 0,
      long: 0,
      isLoading: false,
      currentStation: stationList[0],
      currentRoute: '',
      schedule: [{
        "minutes": "0",
        "destination": ""
      }],
      availRoutes: []
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
    this.clickAppButton = this.clickAppButton.bind(this);
    this.socket = SocketIOClient('https://bart-buddy.herokuapp.com/');
  }

  componentWillMount () {   
    this.socket.on('connect', () => {
      console.log('connected!');
    });
     
    this.socket.on('data', (data) => {
      this.setState({
        train: data,
      });
    });
  }

  updateRoute(data) {
    this.setState({ currentRoute: data });
    this.getSchedule(this.state.currentStation);
  }
  
  rendermap(lat, long) {
    this.setState({
      newRegion: {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.093,
        longitudeDelta: 0.092
      }
    })
  }

  updateStation(data) {
    console.log(this.state.region)
    let lat = JSON.parse(stationList[data].gtfs_latitude);
    let long = JSON.parse(stationList[data].gtfs_longitude);
    this.setState({
      currentStation: stationList[data]
    });
    
    this.rendermap(lat, long);
   
  }

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'BART Buddy',
      headerRight: (
        <Button
          title='Advisories'
          onPress={() => navigation.navigate('Advisories')}
        />
      ),
      headerStyle: {backgroundColor:'#009bda'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontFamily: 'Helvetica Neue', fontStyle: 'italic'}
    };
  };

  getSchedule(station) {
    let scheduleFromAPI = []; 
    let tempRoutes = [];   
    axios.post('https://bart-buddy.herokuapp.com/api/schedule', station)   
    //axios.post('http://localhost:1337/api/schedule', station)   
    .then(    
      res => { if (Array.isArray(res.data)) {
          scheduleFromAPI = res.data;
          scheduleFromAPI.forEach((cur) => {
            if (tempRoutes.indexOf(cur.destination) === -1) {
              tempRoutes.push(cur.destination);
            }
          });
          this.setState({   
            schedule: scheduleFromAPI,
            availRoutes: tempRoutes   
          });
        }
      })  
    .catch(err => {   
      throw err;    
    });   
  }  

  // componentDidMount() {   
  //   setInterval(() => this.getSchedule(this.state.currentStation), 5000)
  // }
  
  clickAppButton(button, data) {
    if(button === 'Route') {
      this.updateRoute(data)
    } else if (button === 'Station') {
      this.updateStation(data)
    }
  }
  render() {
    const { navigate } = this.props.navigation; 

    return (
      <View style={{flex: 1, flexDirection:'column', justifyContent:'space-between'}}>
        <View style={stylez.map}>
          <MapContainer 
            region={this.state.region} 
            trainTime={this.state.train}
            name={this.state.currentStation}  
            render={this.rendermap.bind(this)}
            newPlace={this.state.newRegion}
          /> 
        </View>

        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent:'space-around', alignItems:'center'}}>
            <View style={{height: 35, width: 160, alignItems:'center'}}><Text>{this.state.currentStation.name}</Text></View>
            <View style={{height: 35, width: 160, backgroundColor: 'black'}}><BulletinList station={this.state.currentStation} route={this.state.currentRoute} routes={this.state.availRoutes} schedule={this.state.schedule}/></View>
          </View>

          <View style={{flex: 1, flexDirection: 'column', justifyContent:'space-around', alignItems:'center'}}>
            <Container><AppButton button={`Station`} clickHandler={this.clickAppButton}/></Container>
            <Container><AppButton button={`Route`} clickHandler={this.clickAppButton} station={this.state.currentStation} route={this.state.currentRoute} routes={this.state.availRoutes} /></Container>
          </View>
        </View>
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

AppRegistry.registerComponent('Main', () => Main);
