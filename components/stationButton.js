import React, { Component } from 'react';
import { Container, Content, ActionSheet, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';
import stationList from './station_coordinates';


var stations = stationList.map((cur) => { return cur.name; });
var DESTRUCTIVE_INDEX = 100;

export default class StationButton extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: "Please Select Station"} ;
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    stationList.push("Cancel");

    ActionSheet.show(
            {
              options: stations,
              cancelButtonIndex: stationList.length,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: 'Select BART Station'
            },
            (buttonIndex) => {
              this.setState({ clicked: stations[buttonIndex] });
              this.props.stationSelectHandler(stations.indexOf(this.state.clicked));
            });
  }

  render() {
    return (
      <Container>
        <Text>From: </Text>
        <Button rounded style={{marginBottom:'5%'}} onPress={this.clickHandler}><Text>{this.props.parentStation}</Text></Button>
        <Text>Hey</Text>
      </Container>
    );
  }
}