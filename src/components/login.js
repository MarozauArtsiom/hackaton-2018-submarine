import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: ''
        };
    }

  render() {
      let {login} = this.state;

    return (
      <View style={styles.container}>
            <Text h3>Войти через соц. сети</Text>
            <View style={styles.iconContainer}>
                <Icon
                    type="font-awesome"
                    name="vk"
                    size={35}
                    raised
                    onPress={() => this.props.onLogin()}
                    />
                <Icon
                    type="font-awesome"
                    name="facebook"
                    size={35}
                    raised
                    onPress={() => this.props.onLogin()}
                    />
                <Icon
                    type="font-awesome"
                    name="twitter"
                    size={35}
                    raised
                    onPress={() => this.props.onLogin()}
                    />
                <Icon
                    type="font-awesome"
                    name="google-plus"
                    size={35}
                    raised
                    onPress={() => this.props.onLogin()}
                    />
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    form: {
        height: '90%',
        width: '90%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: 25,
        flex: 0,
        flexDirection: 'row',
    }
});