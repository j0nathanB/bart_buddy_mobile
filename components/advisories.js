import React, { Component } from 'react';
import { Body, Button, Card, CardItem, Container, Content, Form, H1, H2, H3, Item, Input, CheckBox, ListItem, StyleProvider, Text } from 'native-base';
import { Image } from 'react-native'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import axios from 'axios';


export default class Advisories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Enter your phone number',
      advisories: 'Fetching from BART...' 
    };
    this.onSubmit = this.onSubmit.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      headerStyle: {backgroundColor:'#009bda'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontFamily: 'Helvetica Neue', fontStyle: 'italic'}
    };
  };

  onSubmit() {
    let userData = {
      phone: this.state.text,
    }
    
    axios.post(`http://localhost:1337/create`, userData, {headers: {ContentType: `application/x-www-form-urlencoded`} } )
    .then( res => alert(`Your number: ${this.state.text} has successfully been subscribed.`))
    .catch( err => alert(`ERROR: ${err}`))
  }

  componentWillMount(){
    axios.get('http://localhost:1337/api/advisory')
      .then((res) => 
        this.setState({
          advisories: res.data.root.bsa.description
        })
      )
      .catch(err => {
        console.log('error on the front: ', err)
      })
  }

  render () {
    return (
      <StyleProvider style={getTheme(material)}>  
        <Container style={{backgroundColor:'#009bda'}}>
          <Content>
            <Card>
                <CardItem header>
                    <H1>BART Station Advisories</H1>
                </CardItem>
                <CardItem>
                    <Body>
                        <H3>{this.state.advisories}</H3>
                    </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem>
                    <Body>
                        <H2>Subscribe via SMS</H2>
                        <Text>
                            Enter your mobile number to receive real-time BART delay advisories via SMS. (Carrier rates may apply). To stop messages, respond to a Bart Buddy message with 'thanks'. 
                        </Text>
                    </Body>
                </CardItem>
            </Card>       
              <Item>
                <Input style={{backgroundColor: 'white'}} onChangeText={(text) => this.setState({text})} keyboardType="phone-pad" placeholder="Phone" onSubmitEditing={this.onSubmit} maxLength = {10}/>
                <Button onPress={this.onSubmit} full>
                  <Text>Subscribe</Text>
                </Button>
                 </Item>
          </Content>
        </Container>
      </StyleProvider>   
    )
  }
 }