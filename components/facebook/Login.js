
'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var MainPage = require('./main');

//import {Actions} from 'react-native-router-flux';
import Main from './main';

var FB_PHOTO_WIDTH = 200;

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight
} = React;

var Login = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      username: '',
      password: '',
      isLogedIn: false,
      //nextPage: this.nextPage.bind(null, this)
    }
  },

  onUsernameTextChanged(event) {
    this.setState({ username: event.nativeEvent.text });
  },

  onPasswordInput(event) {
    this.setState({ password: event.nativeEvent.text });
  },

  onLoginPressed(event) {
    //{Actions.MainPage};
    this.setState({ isLogedIn: true });
    console.log('goooooo');
  },

  onLogin(data) {
    this.setState({ isLogedIn: true});
  },

  onLogout(data) {
    this.setState({ isLogedIn: false});
  },

  render(){
    var _this = this;
    var user = this.state.user;
    return (
        <View {...this.props} style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/iA37u0v.jpg'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder= {this.state.isLogedIn ? "Username" : "Username"}
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                        onChange={this.onUsernameTextChanged.bind(null, this)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        password={true}
                        secureTextEntry={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                        onChange={this.onPasswordInput.bind(null, this)}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <TouchableHighlight style={styles.signin}
                onPress={this.props.openModal}>
                <Text style={styles.whiteFont}> {this.state.isLogedIn ? "go": "Sign In"} </Text>
            </TouchableHighlight>
            <View style={styles.loginContainer}>
                <FBLogin style={{ marginBottom: 10, }}
                  permissions={["email","user_friends"]}
                  //onChange = {this.onChangeStatus.bind(null.this)}
                  onLogin = {this.onLogin.bind(null, this)}
                  onLogout = {this.onLogout.bind(null, this)}
                  onLoginFound={function(data){
                    _this.setState({ user : data.credentials });
                  }}
                  onLoginNotFound={function(){
                    _this.setState({ user : null });
                  }}
                  onError={function(data){
                    console.log("ERROR");
                    console.log(data);
                  }}
                  onCancel={function(){
                    console.log("User cancelled.");
                  }}
                  onPermissionsMissing={function(data){
                    console.log("Check permissions!");
                    console.log(data);
                  }}
                />
            </View>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
            </View>
        </View>
    );
  }
});

var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  },

  render: function(){
    if(this.state.photo == null) return this.renderLoading();
    
    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});



var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
          },
        });
      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        
        <Text>{ info && info.name }</Text>
      </View>
    );
  }
});
var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },

    headerContainer:{
      flexDirection: 'row',
      flex: 3,
      backgroundColor: 'transparent'
    },

    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5,
        backgroundColor: 'transparent',
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#3b5998',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    loginContainer: {
      //marginTop: 250,
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'center',
      //marginBottom: 250
    },
    bottomBump: {
      marginBottom: 15,
    }
})

//React.AppRegistry.registerComponent('SimplyPark', function() { return SimplyParkApp });

module.exports = Login;