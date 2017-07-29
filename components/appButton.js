import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, ActionSheet, Button, Text, Header, Left, Right, Body, Title, Icon } from 'native-base';
import stationList from './station_coordinates';

//get from DB at some point
let stations = stationList.map((cur) => { return cur.name; });
stations.push('Cancel');

export default class AppButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      clicked: '',
      collection: []
    };
    this.action = this.action.bind(this);
  }

  action (button) {
    let menuAction = () => {
      ActionSheet.show(
      {
        options: this.state.collection,
        cancelButtonIndex: this.state.collection.length - 1,
        title: `Scroll to select a BART ${this.props.button}`
      },
      (buttonIndex) => {
        if (buttonIndex !== this.state.collection.length - 1){
          this.setState(
            { clicked: this.state.collection[buttonIndex] },
            () => {
              this.props.clickHandler(this.props.button, this.state.collection.indexOf(this.state.clicked));
            }
          );
        } 
      });
    }

    if (this.props.button === 'Station') {
      this.setState(
        { collection: stations },
        () => {
          menuAction();
        }
      )     
    } else if (this.props.button === 'Route') {
      if (this.props.station.name) {
        let tempRoutes = this.props.routes.slice();
        tempRoutes.push('Cancel');

        this.setState(
          { collection: tempRoutes },
          () => {
            menuAction();
          }
        )
      } else {
        alert('Please select a station first.')
      }
    }
  }


  render() {
    return (
      <Button style={{marginTop:'10%', backgroundColor:'blue', width:150, borderColor:'yellow'}} block bordered large onPress={this.action}><Text style={{fontFamily:'Helvetica', fontSize:28, fontWeight:'bold', color:'yellow'}}>{this.props.button}s</Text></Button>
    );
  }
}