import React, { Component } from 'react';
import { Button } from 'react-native'

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler() {
    alert();
  }

  render() {
    return ( <
      Button onPress = { clickHandler }
      title = "Login / Sign up"
      color = "#841584"
      accessibilityLabel = "Log in or sign up" /
      >
    );
  }
}