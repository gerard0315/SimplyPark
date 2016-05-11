 
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

/*
var UsernameInput = React.createClass({
    render(){
      return(
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
          <TextInput 
            style={[styles.input, styles.whiteFont]}
            placeholder= {this.state.isLogedIn ? "Username" : "Username"}
            placeholderTextColor="#FFF"
            value={this.state.username}
            onChange={this.onUsernameTextChanged.bind(null, this)}
      />
        );
    }
});
*/
var Login = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      username: '',
      password: '',
      isLogedIn: false,
      
      photo: {
        url: null,
        height: null,
        width: null,
      },
      info:{
        name: null,
        email: null,
      },
      phototUrl: null,
      //userId: null,
      //nextPage: this.nextPage.bind(null, this)
      ImageSouce: require('./avatar.png'),
    
    }
  },

  
  componentWillMount(data){
    var _this = this;
    var user = this.state.user;
    //_this.setState({ user : data.credentials });
    console.log('user')
    //console.log(user&&user.userId)

    var api = `https://graph.facebook.com/v2.3/${user&&user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user&&user.token}`;
    var apiInfo = `https://graph.facebook.com/v2.3/${user&&user.userId}?fields=name,email&access_token=${user&&user.token}`;

    fetch(api)
      .then(function(response) {
          return response.json()
        }).then(function(returnedValue) { 
          console.log("hihihihi", returnedValue);
          _this.setState({
          photo : {
            url : returnedValue.url,
            height: returnedValue.height,
            width: returnedValue.width,
          },
          photo:returnedValue.data,
          //phototUrl: {returnedValue.data.url},
        });
        }).done();
    console.log("phtot!!");
    console.log(_this.state.photo);

    fetch(apiInfo)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,

          },
        });
      })
      .done();
    //_this.setState({ user : data.credentials });

  },
  

  onUsernameTextChanged(event) {
    this.setState({ username: event.nativeEvent.text });
  },

  onPasswordInput(event) {
    this.setState({ password: event.nativeEvent.text });
  },

  onLogin(data) {
    this.setState({ isLogedIn: true});
    console.log(this.state.user)
  },

  onLogout(data) {
    this.setState({ isLogedIn: false});
  },

  render(){
    var _this = this;
    var user = this.state.user;
    
    var photo = this.state.photo;
    var profilePhoto;
    /*
    if (this.state.sLogedIn === false){
      console.log('local file');
      profilePhoto = <Image style={styles.mark} source={require('./avatar.png')}/>;
    }else if(this.state.isLogedIn === true){
      console.log('facebook');
      profilePhoto = <Image style={styles.mark} source={{uri: photo && photo.url}}/>;
      <Image style={styles.mark} source={this.state.ImageSouce}/>
    }
    */
    return (
        <View {...this.props} style={styles.container}>
            <Image style={styles.bg} source={require('./bg.jpg')} />
            <View style={styles.header}>
                {user && <Photo user={user} />}
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('./username.png')}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder= {this.state.isLogedIn ? "Yiran Gerard Tao" : "Username"}
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                        onChange={this.onUsernameTextChanged.bind(null, this)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={require('./password.png')}/>
                    <TextInput
                        password={true}
                        secureTextEntry={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder={this.state.isLogedIn ? "********": "Password"}
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
                  onLogin={function(data){
                    console.log("Logged in!");
                    _this.setState({ isLogedIn: true});
                    _this.setState({ user : data.credentials});
                    //_this.getData;
                    _this.setState({ ImageSouce : {uri: photo && photo.url}});
                    //console.log(photo && photo.url)
                  }}
                  onLogout = {this.onLogout.bind(null, this)}
                  onLoginFound={function(data){
                    console.log("Existing login found.");
                    //_this.getData;
                    _this.setState({ isLogedIn: true});
                    _this.setState({ ImageSouce : {uri: photo && photo.url}});
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
          style={styles.mark}
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
        //justifyContent: 'center',
        //alignItems: 'center',
        flex: 0.5,
        backgroundColor: 'transparent',
    },
    mark: {
        position: 'absolute',
        left: 120,
        top: 80,
        right: 120,
        width: 150,
        height: 150,
        borderRadius: 150/2,
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