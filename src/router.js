import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';
import { LederBoard, Listener } from './components';

class HomeScreen extends React.Component {
   
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
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
  Listener: { 
      screen: Listener,
      navigationOptions: {
          drawerLabel: 'Check bad words',
          headerMode: 'screen',
      },
  },
  Leaders: { 
    screen: LederBoard,
    navigationOptions: {
        drawerLabel: 'Leader Bord',
        headerMode: 'screen',
    },
}
});

export const Router = StackNavigator({
  DrawerStack: { screen: PrimaryRouter} },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'white'},
      title: 'Pocket gopnic',
      headerTintColor: 'black',
    }),
    
  }
);
