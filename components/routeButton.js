import React, { Component } from 'react';
import { Container, Content, ActionSheet, Button, Text, Header, Left, Right, Body, Title, Icon, H1 } from 'native-base';


var DESTRUCTIVE_INDEX = 100;
var CANCEL_INDEX = 101;

export default class RouteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: "Please Select Route"} ;
    this.clickHandler = this.clickHandler.bind(this);
    this.calculateRoutes = this.calculateRoutes.bind(this);
  }

  calculateRoutes() {
    let x = this.props.parentStation.length;
    return x;
  }

  clickHandler() {
    this.props.routeChoices.push("Cancel");
    
    ActionSheet.show(
      {
        options: this.props.routeChoices,
        cancelButtonIndex: this.props.routeChoices.length - 1,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Select BART Route'
      },
      (buttonIndex) => {
        if (buttonIndex != this.props.routeChoices.length - 1) {
          this.setState({ clicked: this.props.routeChoices[buttonIndex] });
          this.props.routeSelectHandler(this.state.clicked);
        }
      });
  }

  render() {
    return (
      <Container>
        <Text>TEST AREA: </Text>
        <H1>{this.calculateRoutes()}</H1>
        <Text>To: </Text>
        <Button rounded style={{marginBottom:'5%'}} onPress={this.clickHandler}><Text>{this.props.parentRoute}</Text></Button>
      </Container>
    );
  }
}