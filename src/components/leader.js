import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Button, Alert, Text, Modal } from 'react-native';
import { Avatar, List, ListItem, Text as MatText } from 'react-native-elements';

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

function httpGet(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      const status = 200;
      if (this.status === status) {
        resolve(xhr.responseText);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };
    xhr.send();
  });
}


export class LederBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaders: [],
      isLoading: true
    };
  }

  componentDidMount() {

    console.log("componentDidMount");

    httpGet("http://192.168.43.226:6969/leaders").then((data) => {
      this.setState({ leaders: JSON.parse(data) })
    });

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  render() {
    let { leaders } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MatText h2>Да харэ тупить...</MatText>
        </View>
      );
    }

    return (
      <ScrollView style={{backgroundColor:'blue'}}>
        <View style={styles.mainLayout}>
          <List slyle={styles.container}>
            {
              leaders.map((item, index) => (
                <ListItem
                  avatar={<Avatar
                    large
                    rounded
                    source={{ uri: item.avatarUrl }}
                  />}
                  key={item.id}

                  title={
                    <View style={{ paddingLeft: 15, width: '100%' }}>
                      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <View>
                          <Text style={{ fontSize: 23 }}>{item.name}</Text>
                          <Text style={{ fontSize: 23 }}>{item.surName}</Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 19}}>{item.daysWithout.parasiteWords}</Text>
                        </View>
                      </View>
                    </View>
                  }
                  // rightIcon={{name: 'comment'}}
                  hideChevron
                // rightTitle={String(item.daysWithout.parasiteWords)}
                />
              ))
            }
          </List>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});