import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';


export default class DestinationsMenu extends Component {
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