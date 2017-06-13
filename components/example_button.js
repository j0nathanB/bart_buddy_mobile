import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
export default class ExperimentalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Container>
        <Content>
          <Button small primary light rounded onPress={this.props.funcForExperiment}>
            <Text>Use My Location</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}