import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
   
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
      );
    }
  }
  
  class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
}

const PrimaryRouter = DrawerNavigator({
  Home: { 
      screen: HomeScreen,
      navigationOptions: {
          drawerLabel: 'Todo List',
          headerMode: 'screen',
      }
  },
  SettingsScreen: { 
      screen: SettingsScreen,
      navigationOptions: {
          drawerLabel: 'Main Form',
          headerMode: 'screen',
      },
  }
});

export const Router = StackNavigator({
  DrawerStack: { screen: PrimaryRouter} },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#4C3E54'},
      title: 'Welcome!',
      headerTintColor: 'white',
      headerLeft: <Button title="Menu" onPress={() => navigation.navigate('DrawerOpen')}/>
    }),
    
  }
);
