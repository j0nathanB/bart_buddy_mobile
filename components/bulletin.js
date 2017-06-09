import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Bulletin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBulletin: "Bulletin Text"
    };
  }
  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column'}}>
       <Text style={styles.bulletinStyle}>
          Bulletin (Notice): {this.props.update}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bulletinStyle: {
    textAlign: 'left',
    color: 'red',
    marginBottom: 5,
  },
});