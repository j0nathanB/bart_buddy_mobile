import React, { Component } from 'react';
import { Button } from 'react-native'

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testObj: {}
    };
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentWillMount() {
    fetch('http://localhost:1337/retrieve')
      .then((response) => this.setState({
        testObj: response
      }))
      .catch((error) => {
        console.error(error);
      })
  }

  clickHandler() {
    alert(JSON.stringify(this.state.testObj));
  }

  render() {
    return ( <
      Button onPress = { this.clickHandler }
      title = "Login / Sign up"
      color = "#841584"
      accessibilityLabel = "Log in or sign up" /
      >
    );
  }
}