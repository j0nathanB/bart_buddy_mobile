import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Map from './components/map';
import UseLocationButton from './components/uselocationbutton';
import ClosestStation from './components/closeststation';
import Bulletin from './components/bulletin';
import hardCodedDestinations from './components/destinations';
import hardCodedStationsList from './components/stations';

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

  render() {
    return (
      <View style={styles.container}>
        <MenuContext style={{ flex: 1 }}>
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
        <Map MapProps={"I am MapProps"}/>
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

class StationsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStation: "nothing selected yet"
    };
    this.selectionHandler = this.selectionHandler.bind(this);
  }

  selectionHandler(value) {
    console.log("StationsMenu selectionHandler called");
    this.props.funcForStation(value);
  }

  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column', backgroundColor: 'chartreuse' }}>
        <View style={{ flex: 1 }}><Text>My App</Text></View>
        <Menu onSelect={this.selectionHandler}>
          <MenuTrigger>
            <Text style={{ fontSize: 20 }}>&#8942;</Text>
          </MenuTrigger>
          <MenuOptions>
            { this.props.stationsList.map(
              (current, idx) => { 
              return (<MenuOption value={current} key={idx}>
                    <Text>{current}</Text>
                  </MenuOption>)})}
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

class DestinationsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelection: "nothing selected yet"
    };
    this.selectionHandler = this.selectionHandler.bind(this);
  }

  selectionHandler(value) {
    this.props.funcforDestination(value);
  }

  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column', backgroundColor: 'pink' }}>
        <View style={{ flex: 1 }}><Text>My App</Text></View>
        <Menu onSelect={this.selectionHandler}>
          <MenuTrigger>
            <Text style={{ fontSize: 20 }}>&#8942;</Text>
          </MenuTrigger>
          <MenuOptions>
            { this.props.destinations.map(
              (current, idx) => { 
              return (<MenuOption value={current} key={idx}>
                    <Text>{current}</Text>
                  </MenuOption>)})}
          </MenuOptions>
        </Menu>
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
