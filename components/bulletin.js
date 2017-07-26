import React, { 
  Component,  
  StyleSheet,
  Dimensions
} from 'react';
import { View } from 'react-native';
import { Container, Content, H3, List, ListItem, Card, CardItem, Text } from 'native-base';

export default class Bulletin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  render() {
    let timeTable = this.props.schedule
            .filter(scheduleElement => scheduleElement.destination === this.props.route)
            .map( (cur, idx, arr) => cur.minutes).join(', ');

    let colon = this.props.route !== 'Please select a route' ? ': ' : '';
    let mins = this.props.route !== 'Please select a route' ? ' min' : '';
    // {this.props.schedule
    //     .filter(scheduleElement => scheduleElement.destination === this.props.route)
    //     .map( (cur, idx, arr) => {
    //         return <H3 key={idx} style={{color:'red'}}> {cur.minutes},</H3>
    //     })
    // }

    return (
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>        
        <View style={{flexDirection:'column', justifyContent:'space-around'}}><H3 style={{color:'red'}}>{this.props.route}{colon}</H3></View>

          <View style={{flexDirection:'column', justifyContent:'space-around'}}>
            <View style={{flexDirection:'row'}}><H3 style={{color:'red'}}>{timeTable}{mins}</H3></View></View>
      </View>
    );
  }
}