
import React, {
  Component,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

var ControlPanel = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.controlText}>{"Control Panel"}</Text>
        <TouchableOpacity style={styles.button} onPress={this._setModalVisible.bind(this, false)}>
          <Text>{"Close Drawer"}</Text>
        </TouchableOpacity>
      </View>
    )
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
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    bottom: 500,
  }
});

module.exports = ControlPanel;