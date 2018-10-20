/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {LederBoard, Login} from './src/components';
import { Text } from 'react-native-elements';

import {Router} from './src';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoggedIn: false,
    }
  }

  logIn = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.isLoggedIn ? <Router /> : <Login onLogin={this.logIn}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
