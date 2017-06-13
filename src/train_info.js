import React from 'react';
import {Container, View, Content, Button, Text} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";



export const Destination = ({Route, Direction, time_to_next_station}) => {

	return (
	  <Container style={styles.trainInfo}>
	  <Text style={{'color': 'red'}}>{Direction}</Text>
	  <Text > {Route} </Text>
	  <Text > {time_to_next_station}</Text>
	  </Container>
	);
};

export default Destination;