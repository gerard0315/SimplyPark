var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var Main = require('./components/main');
var Login = require('./components/Login');
var ControlPanel = require('./components/Menu')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  TextInput,
  Image,
  TouchableHighlight,
} = React;

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');


var TopModal = React.createClass({
  getInitialState: function() {
    return { offset: new Animated.Value(deviceWidth) }
  },
  componentDidMount: function() {
    Animated.timing(this.state.offset, {
      duration: 50,
      toValue: 0
    }).start();
  },
  closeModal: function() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  },
  render: function() {
    return (
        <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateX: this.state.offset}]}]}>
          <Main/>
        </Animated.View>
    )
  }
});


var RouteStack = {
  app: {
    component: Login
  },
};


var SimplyParkApp = React.createClass({
  getInitialState: function() {
    return {
      modal: false 
    };
  },
  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <Component openModal={() => this.setState({modal: true})}/>
    )
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={RouteStack.app}
          renderScene={this.renderScene}
        />
        {this.state.modal ? <TopModal closeModal={() => this.setState({modal: false}) }/> : null }
      </View>
    );
  }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexCenter: {
        flex: 1,
        //justifyContent: 'center', 
        //alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
})

React.AppRegistry.registerComponent('SimplyPark', function() { return SimplyParkApp });