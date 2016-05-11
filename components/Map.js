'use strict';
import Drawer from 'react-native-drawer'
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
//var MenuView = require('./Menu');

import React, {
  Component,
  StyleSheet,
  MapView,
  Text,
  View,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Navigator,
} from 'react-native';

exports.framework = 'React';

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  menuContainer: {
        flex: 1,
  },

  TopBarContainer:{
    position: 'absolute',
    backgroundColor: '#3b5998',
    top: 0,
    left: 0,
    right: 0,
    bottom: 580,
    flexDirection:'row'
  },

  toolbarButton:{
    
    paddingTop:35,
    paddingLeft: 7,
    width: 50,
    alignItems:'center'
  },
  toolbarButtonText:{
    paddingTop: 5,
    color:'#fff',
    fontWeight: 'normal',
    fontSize: 13,   
  },

  toolbarTitle:{
    paddingTop:35,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 18,
    flex:1,
  },

  toolbarSeacrhImage:{
    paddingTop: 20,
    width: 18,
    height:18,
  },

  map: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
});


var MapPage = React.createClass({

  watchID: (null: ?number),

  getInitialState: function() {
    return {
      latitude: 0,
      longitude: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        console.log(initialPosition);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      var longitude = parseFloat(position.coords.longitude);
      var latitude = parseFloat(position.coords.latitude);
      this.setState({longitude});
      this.setState({latitude});
      console.log("longitude:", this.state.longitude);
      console.log("latitude:", this.state.latitude);
    });
  },

  componentWillUnmount: function() {

    navigator.geolocation.clearWatch(this.watchID);
  },

  openSeacrh: function(){
    console.log("openSeacrh");
  },

  render: function(){
      return (
        <View style = {styles.container}>
          <View style = {styles.TopBarContainer}>
            <TouchableOpacity style={styles.toolbarButton}
                onPress={this.props.openModal}>
                <Text style={styles.toolbarButtonText}>{"MENU"}</Text>
            </TouchableOpacity>
            <Text style={styles.toolbarTitle}>{"Simply Park"}</Text>
            <TouchableOpacity style={styles.toolbarButton}
                onPress={this.openSeacrh}>
                <Image source={require('image!search')} style={styles.toolbarSeacrhImage}/>
            </TouchableOpacity>
          </View>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
          />
        </View>
      );
  }


});

//React.AppRegistry.registerComponent('SimplyPark', function() { return SimplyParkApp });
module.exports = MapPage;