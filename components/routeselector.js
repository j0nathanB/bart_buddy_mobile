import React, { Component } from 'react';
import { Container, Content, ActionSheet, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';
import hardCodedDestinations from './destinations';

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class RouteSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: "Please Select Route"} ;
    this.testFunction = this.testFunction.bind(this);
  }

  testFunction() {
    ActionSheet.show(
            {
              options: hardCodedDestinations,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: 'Select BART Route'
            },
            (buttonIndex) => {
              this.setState({ clicked: hardCodedDestinations[buttonIndex] });
              //alert("stationselector.js: " + this.state.clicked );
              this.props.routeSelectHandler(this.state.clicked);
            });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Button onPress={this.testFunction}><Text>Route: {this.props.parentRoute}</Text></Button>
        </Content>
      </Container>
    );
  }
}

//          <Button onPress={this.testFunction}><Text>Route: {this.state.clicked}</Text></Button>
