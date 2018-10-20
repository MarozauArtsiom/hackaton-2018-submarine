import React from 'react';
import { View, Image, TouchableOpacity, Text as RText } from 'react-native';
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

      // varikPress() {
      //   console.log(this.props);
      //   this.props.navigation.navigate('DrawerOpen');
      // }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Text h4 fontFamily="Galsten">Убей в себе гопника, ёпта!</Text>
          <Image 
                style={{width: '100%', height: '60%'}}
                source={{uri: 'https://avatanplus.com/files/resources/mid/588edef0a1872159ee16dc16.png'}}
              />
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <View style={{backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 7}}>
          <Text h3 style={{ color: 'white' }}>Паказать варики</Text>
          </View>
          </TouchableOpacity>
          
        </View>
      );
    }
  }

const PrimaryRouter = DrawerNavigator({
  Home: { 
      screen: HomeScreen,
      navigationOptions: {
          drawerLabel: 'Да хаты',
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
        drawerLabel: 'Мои корки',
        headerMode: 'screen',
    },
  },
  Leaders: { 
    screen: LederBoard,
    navigationOptions: {
        drawerLabel: 'Дворовые пацаны',
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
      title: 'IT Гопник',
      headerTintColor: 'black',
    }),
    
  }
);
