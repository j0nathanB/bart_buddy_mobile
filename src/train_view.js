import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import styles from "./MapContainerStyles.js";
import Destination from './train_info.js';

// 'ffff33' = yellow = Pittsburg/Bay Point–SFO/Millbrae: && 

// '0099cc' = blue = Dublin/Pleasanton–Daly City:

// 'ff9933' = orange = Richmond–Warm Springs/South Fremont: 

// 'ff0000' = red = Richmond–Daly City/Millbrae:

//  Orange = Richmond–Warm Springs/South Fremont 

// beige =  Coliseum–Oakland Int'l Airport:

// "Daly City" and "0099cc" (blue)

// "Richmond"  "000000" or ff9933 (orange) or black

// "coliseum" =  "d5cfa3" (beige)

// "Oakland International Airport" = "000000" (black)

// "Millbrae" and "ffff33" = (yellow)

// "Warm Springs/South Fremont" and "000000" (black)
 
// dublin and "000000" (black)




// export default TrainView;

const TrainView = ({station_coordinates, route, color, destination}) => {
  	if (color === "0099cc"){
	    let direction
      if ( route === "Dublin/Pleasanton" ) {
        direction = "East";
      } else {
        direction = "West";
      }
    return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/blueTrain.png')}
        title={direction}
        description={route}
	    />
        
	  );

    } else if (color === "ff9933")  {
      
      let direction
        if ( route === "Warm Springs/South Fremont" ) {
          direction = "South";
        } else {
          direction = "North";
        }

      return (
      <MapView.Marker 
        coordinate={station_coordinates}
        image={require('./train_images/orangeTrain.png')}
        title={direction}
        description={route}
      />
      
      
      );
  	} else if (color === "ffff33") {
      
      //this one is supposed to be for orange or black but unsure if I can figure the course now.
      let direction
        if ( route === "Millbrae" ) {
          direction = "South/ West";
        } else {
          direction = "North/ East";
        }


      return (
	    <MapView.Marker 
	      coordinate={station_coordinates}
	      image={require('./train_images/yellowTrain.png')}
        title={direction}
        description={route}
	    />
	  
     );

   } else if (color === "d5cfa3") {
    
     let direction
      if ( route === "Coliseum" ) {
          direction = "East";
      } else {
          direction = "West";
      }

     return (
      <MapView.Marker 
        coordinate={station_coordinates}
        image={require('./train_images/beigeTrain.png')}
        title={direction}
        description={route}
      />
      
     );
   } else if ( color === "339933" ) {
     
     let direction
      if ( route === "Daly City" ) {
          direction = "West";
      } else {
          direction = "East";
      }

     return (
      <MapView.Marker 
        coordinate={station_coordinates}
        image={require('./train_images/greenTrain.png')}
        title={direction}
        description={route}
      />
     );
   } else if ( color === "ff0000" ) {
    let direction
      if ( route === "Millbrae" ) {
          direction = "South";
      } else {
          direction = "North";
      }

     return (
      <MapView.Marker 
        coordinate={station_coordinates}
        image={require('./train_images/redTrain.png')}
        title={direction}
        description={route}
      />
      
     );
   } else if ( color === "000000" ) {
       
      let direction;
     
        if ( route === "Richmond" ) {
          direction = "East";
        
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/redTrain.png')}
              title={direction}
              description={route}
            />
           );
        

        } else if ( route === "Dublin/Pleasanton" ) {
          
          direction = "East";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/blueTrain.png')}
              title={direction}
              description={route}
            />
            
           );
        } else if ( route === "Pittsburg/Bay Point" ) {
          direction = "East";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/yellowTrain.png')}
              title={direction}
              description={route}
            />
            
           );
        } else if ( route === "Warm Springs/South Fremont") {
          direction = "South";
          return (
            <MapView.Marker 
              coordinate={station_coordinates}
              image={require('./train_images/orangeTrain.png')}
              title={direction}
              description={route}
            />
            
           );
        } else {
          
          return (
        <MapView.Marker 
          coordinate={station_coordinates}
          image={require('./train_images/beigeTrain.png')}
          title={direction}
        description={route}
        />
        
       );
      }
   } else {
        return (
        <MapView.Marker 
          coordinate={station_coordinates}
          image={require('./train_images/beigeTrain.png')}
          title={direction}
          description={route}
        />
       
       );
   }
}

export default TrainView;








