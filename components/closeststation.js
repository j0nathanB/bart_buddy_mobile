import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ClosestStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClosestStation: "Closest Station Text"
    };
  }
  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column'}}>
        <Text >
          Closest Station (Notice): {this.props.pushToClosestStation}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closestStationStyle: {
    textAlign: 'right',
    color: 'deeppink',
    marginBottom: 5,
  },
});