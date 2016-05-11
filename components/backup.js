window.React = React

//import Login from './components/Login1'
import main from './components/main'

//var Login = require('./components/Login1');
//var Main = require('./components/main');

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};


export default class SimplyPark extends React.Component {
    render() {
        return 
        <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
            <Scene key="modal" component={Modal}>
                <Scene key="root" hideNavBar={true}>
                   <Scene key="Login" component={main} initial = {true}/>
                </Scene>
                
            </Scene>
        </Router>;
    }
}


'use strict';
var React = require('react-native');
var Router = require('react-native-custom-navigation');


window.React = React

var Login = require('./components/Login1');
var Main = require('./components/main');

var SimplyParkApp = React.createClass({
    render: function(){
        return (
            <Login/>
        )
    }

});

React.AppRegistry.registerComponent('SimplyPark', function() { return SimplyParkApp });