'use strict';
var Dimensions = require('Dimensions');
var SearchBar = require('react-native-search-bar');
const Firebase = require('firebase');

import React, {
  Component,
  StyleSheet,
  MapView,
  Text,
  View,
  Animated,
  Navigator,
  TouchableOpacity,
  Image,
  Modal,
  AlertIOS,

} from 'react-native';

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

var BasicConfig = Navigator.SceneConfigs.FloatFromLeft;

var CustomLeftToRightGesture = Object.assign({}, BasicConfig.gestures.pop, {
  snapVelocity:8,
  edgeHitWidth: deviceWidth,
});

var CustomSceneConfig = Object.assign({}, BasicConfig, {
  springTension: 100,
  springFriction: 1,
  gestures:{
    pop:CustomLeftToRightGesture,
  }
});


var MainMap = React.createClass({

  watchID: (null: ?number),

  getInitialState: function() {
    return {
      latitude: 0,
      longitude: 0,
      initialPosition: '',
      lastPosition: '',
      annotations: [],
      mapRegion: undefined,
      isLoading: false,
      tint_1: MapView.PinColors.RED,
      tint_2: MapView.PinColors.RED,

    };
  },

  openMenu(){
    this.props.navigator.push({id: 2,});
  },

  _excuteQuery(){
    var myFirebaseRef = new Firebase('https://blistering-fire-6119.firebaseio.com/status');
    var _this = this;

    myFirebaseRef.on("value", function(snapshot) {
        var response = snapshot.val();
        //console.log(response);
        //var testStr = '123st';
        var status_1 = response.test_1;
        var status_2 = response.test_2;
        console.log(status_1);
        if (status_1 === 'Available'){
          _this.setState({tint_1 : MapView.PinColors.GREEN})
        };
        if (status_2 === 'Available'){
          _this.setState({tint_2 : MapView.PinColors.GREEN})
        };

        _this.setState({
          annotations:[{
            latitude: 40.8116799,
            longitude: -73.9608379,
            title: 'Test',
            subtitle: status_1,
            tintColor: _this.state.tint_1,
          },
          {
            latitude: 40.8071421,
            longitude: -73.9589939,
            title: 'Test2',
            subtitle: status_2,
            tintColor: _this.state.tint_2,
          }]
        });

    });

    AlertIOS.alert('Data Fetched');
  },
  

  componentDidMount: function(){
    this.setState({
      annotations:[{
        latitude: 40.8116799,
        longitude: -73.9608379,
        title: 'Test',
        subtitle: 'unknown',
      },
      {
        latitude: 40.8071421,
        longitude: -73.9589939,
        title: 'Test2',
        subtitle: 'unknown',
      }]
    });
    console.log("marker !!!!!!!!!");

  },

  render: function(){

      return (
      <View style = {styles.container}>
        <View style = {styles.TopBarContainer}>
          <TouchableOpacity style={styles.toolbarButton}
              onPress={this.openMenu}>
              <Text style={styles.toolbarButtonText}>{"MENU"}</Text>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>{"Simply Park"}</Text>
          <TouchableOpacity style={styles.toolbarButton}
              onPress={this._excuteQuery}>
              <Image source={require('../ios/refresh_icon.png')} style={styles.toolbarSeacrhImage}/>
          </TouchableOpacity>
        </View>
        <MapView
            style = {styles.map}
            //style={[styles.map, {annotations: this.state.markers}]}
            showsUserLocation={true}
            followUserLocation={true}
            annotations={this.state.annotations}
            />
      </View>
      );
  }

});


var ControlPanel = React.createClass({
  _handlePress(){
    this.props.navigator.pop();
  },

  render: function() {
    return (
      <View style={styles.panelContainer}>
        <View style = {styles.menuBarContainer}>
          <Text style={styles.toolbarTitle}>{"You"}</Text>
        </View>
        <TouchableOpacity  onPress={this._handlePress}>
          <Text>{"Close Drawer"}</Text>
        </TouchableOpacity>
      </View>
    )
  }
});

var Main = React.createClass({
  _renderScene(route, navigator){
    if (route.id === 2){
      return <ControlPanel navigator={navigator} />
    }else if (route.id === 1){
      return <MainMap navigator={navigator} />
    }
  },

  _configureScene(route){
    return CustomSceneConfig;
  },

  render(){
    return(
    <Navigator
      style={{ flex: 1 }}
      initialRoute={{
        id: 1,
      }}
      renderScene = {this._renderScene}
      configureScene = {this._configureScene}
    />
  );
  }

});


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

  setTimeContainer:{
    position: 'absolute',
    top: 200,
    //left: 50,
    //right: ,
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    borderWidth: 5,
  },

  searchbar:{
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 550,
    backgroundColor:'transparent',
  },

  SearchBarContainer: {
    flex:1,
    backgroundColor:'transparent',
    flexDirection:'row',
  },

  searchPageTop:{
    position: 'absolute',
    backgroundColor: '#3b5998',
    top: 0,
    left: 0,
    right: 0,
    bottom: 596,
    flexDirection:'row',
  },

  panelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuBarContainer:{
    position: 'absolute',
    backgroundColor: '#3b5998',
    top: 0,
    left: 0,
    right: 0,
    bottom: 596,
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
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    bottom: 500,
  },
});

module.exports = Main;
