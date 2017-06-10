import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';


export default class StationsMenu extends Component {
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
