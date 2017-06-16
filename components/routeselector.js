import React, { Component } from 'react';
import { Container, Content, ActionSheet, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';
import hardCodedDestinations from './destinations';

var DESTRUCTIVE_INDEX = 100;
var CANCEL_INDEX = 101;
export default class RouteSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: "Please Select Route"} ;
    this.testFunction = this.testFunction.bind(this);
  }

//this.props.routeChoices

  testFunction() {
    ActionSheet.show(
            {
              options: this.props.routeChoices,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: 'Select BART Route'
            },
            (buttonIndex) => {
              this.setState({ clicked: this.props.routeChoices[buttonIndex] });
              //alert("stationselector.js: " + this.state.clicked );
              this.props.routeSelectHandler(this.state.clicked);
            });
  }

  render() {
    return (
      <Button full style={{marginBottom:'5%'}} onPress={this.testFunction}><Text>Route: {this.props.parentRoute}</Text></Button>
    );
  }
}

//          <Button onPress={this.testFunction}><Text>Route: {this.state.clicked}</Text></Button>
