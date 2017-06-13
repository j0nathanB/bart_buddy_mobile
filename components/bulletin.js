import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';

export default class Bulletin extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                          <Body>
                            <Text>Your text here</Text>
                          </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}