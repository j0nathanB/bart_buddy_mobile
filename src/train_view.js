import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";
import Destination from './train_info.js';

const TrainView = ({station_coordinates, color}) => {
  	if ( color === "blue"){
	  return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/blueTrain.png')}
	    >
        <MapView.Callout >
        <Destination Direction={"North"} 
        Route={'Richmond/ PLasenton'} 
       
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
	    </MapView.Marker>
	  );
  	} else if ( color === "red" ) {
  	  return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/redTrain.png')}
	    >
	    <MapView.Callout >
        <Destination Direction={"North"} 
        Route={'Richmond/ PLasenton'} 
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
	    </MapView.Marker>
      );
  	} else if ( color === "yellow" ) {
      return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/yellowTrain.png')}
	    >
	    <MapView.Callout >
        <Destination Direction={"North"} 
        Route={'Richmond/ PLasenton'} 
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
	    </MapView.Marker>
     );
   } else if ( color === "orange" ) {
     return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/redTrain.png')}
	    >
	    <MapView.Callout >
        <Destination Direction={"North"} 
        Route={'Richmond/ PLasenton'} 
        time_to_next_station={'100 minutes'}  />
        </MapView.Callout>
	    </MapView.Marker>
     );
   }

}

export default TrainView;