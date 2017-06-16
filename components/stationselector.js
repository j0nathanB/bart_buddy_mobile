import React, { Component } from 'react';
import { Container, Content, ActionSheet, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';
import stationList from './station_coordinates';

var BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
  'Option 12',
  'Option 13',
  'Delete',
  'Cancel',
];

var STATION_NAMES = stationList.map((cur) => { return cur.name; });
var DESTRUCTIVE_INDEX = 100;
var CANCEL_INDEX = 101;
export default class StationSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: "Please Select Station"} ;
    this.testFunction = this.testFunction.bind(this);
    this.testFunction2 = this.testFunction2.bind(this);
  }

  testFunction() {
    ActionSheet.show(
            {
              options: STATION_NAMES,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: 'Select BART Station'
            },
            (buttonIndex) => {
              this.setState({ clicked: STATION_NAMES[buttonIndex] });
              //alert("stationselector.js: " + this.state.clicked );
              this.props.stationSelectHandler(STATION_NAMES.indexOf(this.state.clicked));
            });
  }
  
  testFunction2() {
            //this.props.stationSelectHandler(this.state.clicked);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Button onPress={this.testFunction}><Text>STN: {this.props.parentStation}</Text></Button>
        </Content>
      </Container>
    );
  }
}