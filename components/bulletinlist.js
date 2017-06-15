import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';

export default class Bulletin27bstroke6 extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      return (
        <Container>
          <Content>
            {this.props.schedule.filter( lineItem => lineItem.destination === this.props.route
                ).filter( lineItem => lineItem.minutes !== "Leaving"
                ).map((cur, idx) => {
                    return ( <Text key={idx}>Next {cur.destination} Train: {cur.minutes} minutes</Text> )
                  })}
          </Content>
        </Container>
      );
    }
}

// if ((cur.minutes === "Leaving") || (cur.minutes === "0")) {
//                     return ( <Text key={idx}>Next {cur.destination} Train: {cur.minutes} minutes</Text> )
//                   } else {
//                     return ( <Text key={idx}>Next {cur.destination} Train: {cur.minutes} minutes</Text> )
//                   }})}