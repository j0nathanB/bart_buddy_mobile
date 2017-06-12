import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";

const TrainView = ({station_coordinates, color}) => {
  	if ( color === "blue"){
	  return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/blueTrain.png')}
	    />
	  );
  	} else if ( color === "red" ) {
  	  return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/redTrain.png')}
	    />
      );
  	} else if ( color === "yellow" ) {
      return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/yellowTrain.png')}
	    />
     );
   } else if ( color === "orange" ) {
     return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/orangeTrain.png')}
	    />
     );
   }

}

export default TrainView;