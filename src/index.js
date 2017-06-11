import React from 'react';
import {View} from 'native-base';
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



export const MapContainer = ({region}) => {

	return (
		<View style={styles.container}> 
			<MapView 
			  provider={MapView.PROVIDER_GOOGLE}
			  style={styles.map}
			  region={region}
			  mapType='terrain'
			  >
			  <MapView.Marker 
			    coordinate={region}
			    pinColor={"red"}
			  />

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
			    coordinates={stations}
			    strokeColor={"green"}
			    geoDesic={true}
			    strokeWidth={3}
			  />

			  <MapView.Polyline 
			  //displays line from daily city to milbrea
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
			  //displays line from dublin to daily city 
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