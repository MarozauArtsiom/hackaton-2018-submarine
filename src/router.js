import React from 'react';
import { View, Image } from 'react-native';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';
import { LederBoard, Listener, Profile } from './components';
import { Text } from 'react-native-elements';

class HomeScreen extends React.Component {
    constructor(props) {
      super(props);

      this.state={
        isLoading: true
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 2000);
    }
// https://avatanplus.com/files/resources/mid/588edef0a1872159ee16dc16.png
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text h2>Тупит...</Text>
          </View>
        );
      }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Text h3>Убей в себе гопника, ёпта!</Text>
          <Image 
                style={{width: '100%', height: '60%'}}
                source={{uri: 'https://avatanplus.com/files/resources/mid/588edef0a1872159ee16dc16.png'}}
              />
        </View>
      );
    }
  }

const PrimaryRouter = DrawerNavigator({
  Home: { 
      screen: HomeScreen,
      navigationOptions: {
          drawerLabel: 'На старт',
          headerMode: 'screen',
      }
  },
  Listener: { 
      screen: Listener,
      navigationOptions: {
          drawerLabel: 'Ответить за базар',
          headerMode: 'screen',
      },
  },
  Profile: { 
    screen: Profile,
    navigationOptions: {
        drawerLabel: 'Личное дело',
        headerMode: 'screen',
    },
  },
  Leaders: { 
    screen: LederBoard,
    navigationOptions: {
        drawerLabel: 'Дворовые пацантрЭ',
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
