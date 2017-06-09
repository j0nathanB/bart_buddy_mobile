import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someMapThing: "some map thing state"
    };
  }

  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column'}}>
        <Text>
          Map (Big Effen' Component): {this.props.MapProps}
        </Text>
      </View>
    );
  }
}