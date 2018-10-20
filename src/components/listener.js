import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Voice from 'react-native-voice';

export class Listener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListen: false
        };

        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    }

    async onListen() {
        try {
            Voice.start('ru-RU');
        } catch(err) {
            alert('ERROR')
        }
    }

    onSpeechStart(e) {
        this.setState({
            isListen: true,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btnGroup}>
                    <TouchableOpacity onPress={this.onListen}>
                        <View style={[styles.listenBtn, this.state.isListen ? {borderColor: 'red'} : { borderColor: 'black'}]}>
                            <Icon 
                                size={80}
                                name='mic'
                                color='black'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnGroup: {
        flex: 0
    },
    listenBtn: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        borderWidth: 3,
        height: 200,
        width: 200
    }
});