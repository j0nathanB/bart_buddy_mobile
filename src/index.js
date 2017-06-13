import React from 'react';
import {Container, View, Content, Button, Text} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";
import stations from "./bart_stations.js";
import {
	Daily, 
	Dailycity, 
	Macarthur_pitt, 
	Macarthur_richmond,
  Dub_Daily
  } from "./dailyCity_to_bayfair.js";

import TrainView from './train_view.js';



export const MapContainer = ({region}) => {

	return (
		<View style={styles.container}> 
			<MapView 
			  provider={"google"}
			  style={styles.map}
			  mapType='terrain'
			  zoomEnabled={true}
			  showsUserLocation={true}
			  initialRegion={region}
			  >

			  {stations.map((x, index) => {
			    return <TrainView 
			    station_coordinates={x} 
			    color={"red"}
			    key={index}
			    />
			  })}
 	      
 	          {Dub_Daily.map((x, index) => {
			    return <TrainView 
			    station_coordinates={x} 
			    color={"blue"}
			    key={index}
			    />
			  })}

			  {Macarthur_richmond.map((x, index) => {
			    return <TrainView 
			    station_coordinates={x} 
			    color={"orange"}
			    key={index}
			    />
			  })}

			  {Macarthur_pitt.map((x, index) => {
			    return <TrainView 
			    station_coordinates={x} 
			    color={"orange"}
			    key={index}
			    />
			  })}

			  {Daily.map((x, index) => {
			    return <TrainView 
			    station_coordinates={x} 
			    color={"orange"}
			    key={index}
			    />
			  })}

			  <MapView.Polyline 
			    coordinates={stations}
			    strokeColor={"blue"}
			    geoDesic={false}
			    strokeWidth={9}
			  />
			  
			  <MapView.Polyline 
			    coordinates={stations}
			    strokeColor={"red"}
			    geoDesic={true}
			    strokeWidth={7}
			  />

			  <MapView.Polyline 
			    coordinates={stations}
			    strokeColor={"yellow"}
			    geoDesic={true}
			    strokeWidth={5}
			  />

			  <MapView.Polyline 
			    // displays trains between west oakland and daily city 
			    coordinates={stations}
			    strokeColor={"green"}
			    geoDesic={true}
			    strokeWidth={3}
			  />

			  <MapView.Polyline 
			    // displays line from daily city to milbrea
			    coordinates={Dailycity}
			    strokeColor={"red"}
			    strokeWidth={5}
			    lineDashPattern={[5, 2, 3, 2]}
			  />

			  <MapView.Polyline 
			  // displays line from daily city to SFO to Milbrea
			    coordinates={Daily}
			    strokeColor={"yellow"}
			    geoDesic={true}
			    strokeWidth={2}
			  />
			  
			  <MapView.Polyline 
			  //displays line from Warm spirngs to Richmond
			    coordinates={Macarthur_richmond}
			    strokeColor={"orange"}
			    geoDesic={true}
			    strokeWidth={5}
			  />
			  <MapView.Polyline 
			  //displays line from MacArthur to pittsburg 
			    coordinates={Macarthur_pitt}
			    strokeColor={"yellow"}
			    geoDesic={true}
			    strokeWidth={3}
			  />

			  <MapView.Polyline 
			  //displays line from dublin to west oakland 
			    coordinates={Dub_Daily}
			    strokeColor={"blue"}
			    geoDesic={true}
			    strokeWidth={2}
			  />

			</MapView>
		</View>
	);
}

export default MapContainer;