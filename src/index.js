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
    Dub_Daily,
    Fremont_Daly
  } from "./dailyCity_to_bayfair.js";
import Destination from './train_info.js';
import TrainView from './train_view.js';
import sched from './sched.js';

class MapContainer extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	region: this.props.region,
	  	newRegion: null,
	  	
	  }
	}

	componentWillReceiveProps(props) {
	  this.setState({
	  	newRegion: props.newPlace,
	  })
	}

	
	render () {
	console.log('Map region coordinates: ', this.props.name)
	return (
		<View style={styles.container}> 
			<MapView 
			  provider={"google"}
			  style={styles.map}
			  mapType='terrain'
			  zoomEnabled={true}
			  initialRegion={this.state.region}
			  region={this.state.newRegion}
			  animateToCoordinate={this.state.newRegion}
			  >
			 
			  {this.state.newRegion ? <MapView.Marker 
			    coordinate={{
			      latitude: this.state.newRegion.latitude, 
			       longitude:  this.state.newRegion.longitude
			    }}
			    image={require('./train_images/station.png')}
			    title={`STN: ${this.props.name.abbr}`}
			    description={this.props.name.name}/> : null}


			    {this.props.trainTime.map((x, index) => {
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
			    strokeWidth={12}
			  />
			  
			  <MapView.Polyline 
			    coordinates={stations}
			    strokeColor={"red"}
			    geoDesic={true}
			    strokeWidth={9}
			  />

			  <MapView.Polyline 
			    coordinates={stations}
			    strokeColor={"yellow"}
			    geoDesic={true}
			    strokeWidth={7}
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
			    strokeWidth={7}
			  />
			  <MapView.Polyline 
			  //displays line from MacArthur to pittsburg 
			    coordinates={Macarthur_pitt}
			    strokeColor={"yellow"}
			    geoDesic={true}
			    strokeWidth={4}
			  />

			  <MapView.Polyline 
			  //displays line from dublin to west oakland 
			    coordinates={Fremont_Daly}
			    strokeColor={"green"}
			    geoDesic={true}
			    strokeWidth={4}
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