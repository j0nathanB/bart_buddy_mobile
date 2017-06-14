import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text } from 'native-base';
export default class BulletinList extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <Container>
          <Content>
            <List>
              {this.props.schedule.filter( lineItem => lineItem.destination === this.props.route
                ).map((cur, idx) => { 
                  return (
                  <ListItem key={idx}>
                    <Text  key={idx}>Next {cur.destination} Train: {cur.minutes} minutes</Text>
                  </ListItem>
                  )
              })}
            </List>
          </Content>
        </Container>
      );
    }
}