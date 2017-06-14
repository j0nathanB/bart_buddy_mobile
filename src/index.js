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
import Destination from './train_info.js';
import TrainView from './train_view.js';
import sched from './sched.js';


class MapContainer extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	region: this.props.region,
	  	newRegion: null
	  }
	}

	componentWillReceiveProps(props) {
	  this.setState({
	  	newRegion: props.region,
	  })
	}

	// onRegionChange () {
	// const region = {
	// 	latitude: 38.3333333,
	// 	longitude: -122.0000,
	// 	latitudeDelta: 0.03,
	//     longitudeDelta: 0.02
	//   }
	//   this.setState({ 
	//   	newRegion: region,
	//   });
	// }

	
	render () {
	console.log('Map region coordinates: ', this.state.newRegion)
	return (
		<View style={styles.container}> 
			<MapView 
			  provider={"google"}
			  style={styles.map}
			  mapType='terrain'
			  zoomEnabled={true}
			  initialRegion={this.state.region}
			  showsMyLocationButton={true}
			  region={this.state.newRegion}
			   
			  >
			 
			  {this.state.newRegion ? <MapView.Marker 
			    coordinate={{
			      latitude: this.state.newRegion.latitude, 
			       longitude:  this.state.newRegion.longitude
			    }}
			    image={require('./train_images/station.png')}/> : null}

 	          
 	          {sched.map((x, index) => {
			    return <TrainView 
			    station_coordinates={{
			    	latitude: x[0], 
			    	longitude: x[1] 
			    }} 
			    route={x[2]}
			    color={x[3]}
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
}

export default MapContainer;