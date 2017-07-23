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
        <View>


              <Text style={{backgroundColor:'black', color:'red'}}>{this.props.route}:{`\n`}{this.props.schedule
                .filter(scheduleElement => scheduleElement.destination === this.props.route)
                .map( (cur, idx, arr) => {
                  if (arr[idx + 1]) {
                    return <H3 key={idx} style={{backgroundColor:'black', color:'red'}}> {cur.minutes},</H3>
                  } else if (!arr[idx + 1]){
                    return <H3 key={idx} style={{backgroundColor:'black', color:'red'}}> {cur.minutes} </H3>
                  }
                })
              } MIN</Text>


        </View>
      );
    }
}