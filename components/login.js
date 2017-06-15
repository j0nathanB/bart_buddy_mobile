import React, { Component } from 'react';
import { Body, Card, CardItem, Container, Content, Form, H1, H2, H3, Item, Input, CheckBox, ListItem, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { Text } from 'react-native' 
import axios from 'axios';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Enter your phone number',
      advisories: 'Fetching from BART...' 
    };
    this.onSubmit = this.onSubmit.bind(this)
  }

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
        <Container>
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
            <Form>
              <Item last>
                <Input onChangeText={(text) => this.setState({text})} keyboardType="phone-pad" placeholder="Phone" onSubmitEditing={this.onSubmit} maxLength = {10}/>
              </Item>
            </Form>
          </Content>
        </Container>
      </StyleProvider>   
    )
  }
 }