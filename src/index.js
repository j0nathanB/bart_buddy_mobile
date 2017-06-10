import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";
import stations from "./bart_stations.js"


export const MapContainer = ({region}) => {
	return (
		<View style={styles.container}> 
			<MapView 
			  provider={MapView.PROVIDER_GOOGLE}
			  style={styles.map}
			  region={region}
			  mapType='standard'
			  >
			  <MapView.Marker 
			    coordinate={region}
			    pinColor="red"

			  />
			  <MapView.Polyline 
			    coordinates={stations}
			    strokeColor={"red"}
			    geoDesic={true}
			    strokeWidth={3}

			  />

			</MapView>
		</View>
	);
}

export default MapContainer;