import React, { 
  Component,  
  StyleSheet,
  View,
  Dimensions
} from 'react';
import { Container, Content, List, Card, CardItem, Text } from 'native-base';

export default class Bulletinlist extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      return (
        <Container>
        <Content>
                {
                  this.props.schedule.filter( lineItem => lineItem.destination === this.props.route)
                  .map( (cur, idx) => { return ( 
                      <Text style={{ backgroundColor: 'white'}} key={idx}>Next {cur.destination} Train: {cur.minutes} minutes</Text>
                    )}
                      )
                }
          </Content>
        </Container>
      );
    }
}

   // render() {
   //    return (
   //      <Container>
   //        <Content>
   //              {
   //                this.props.schedule.filter( lineItem => lineItem.destination === this.props.route)
   //                .map( (cur, idx) => { return ( 
   //                  <View style={{flex: 1, backgroundColor: 'red'}}>
   //                    <Text key={idx}>Next {cur.destination} Train: {cur.minutes} minutes</Text>
   //                  </View> 
   //                  )}
   //                    )
   //              }
   //        </Content>
   //      </Container>
   //    );
   //  }