import React, { Component } from 'react';
import { StyleSheet, View, Button, Alert, Text, Modal } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'User 1',
    icon: 'flight-takeoff'
  },
  {
    title: 'User 2',
    icon: 'flight-takeoff'
  },
];



export class LederBoard extends Component {
  
  render() {
    return (
      <List slyle={styles.container}>
        {
          list.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              leftIcon={{ name: item.icon }}
            />
          ))
        }
      </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});