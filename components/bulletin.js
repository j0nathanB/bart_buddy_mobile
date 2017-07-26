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

    render() {
      return (        
          <Text style={{color:'red', textAlign:'center'}}>{this.props.route}:{`\n`}{this.props.schedule
            .filter(scheduleElement => scheduleElement.destination === this.props.route)
            .map( (cur, idx, arr) => {
              if (arr[idx + 1]) {
                return <H3 key={idx} style={{color:'red'}}> {cur.minutes},</H3>
              } else if (!arr[idx + 1]){
                return <H3 key={idx}> {cur.minutes} </H3>
              }
            })
          } MIN</Text>
      );
    }
}