import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class UseLocationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useLocation: "This is the \"Use Location\" state"
    };
  }

  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column'}}>
        <Text>
          Use Location (Button): {this.props.UseLocationButtonProps}
        </Text>
      </View>
    );
  }
}
//        <Text style={styles.useLocationStyle}>