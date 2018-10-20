import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Voice from 'react-native-voice';

export class Listener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListen: false,
            recording: 'Stopped',
            partialResults: []
        };

        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechPartialResults  = this.onSpeechPartialResultsHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    }

    async onListen() {
        try {
            Voice.start('ru-RU');
        } catch(err) {
            alert('ERROR');
        }
    }

    onSpeechStartHandler(e) {
        this.setState({
            isListen: true,
            recording: 'Recording',
        });
    }

    async onStopRecord(e) {
        try {
            await Voice.stop();
        } catch(err) {
            alert('ERROR');
        }
    }

    onSpeechPartialResultsHandler(e) {
        console.log(e.value);
        this.setState({
            partialResults: e.value[0]
        });
    }

    onSpeechEndHandler(e) {
        this.setState({
            recording: 'Stopped',
            isListen: false
        });
    }

    render() {
        let { partialResults } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.btnGroup}>
                    <TouchableOpacity onPress={this.onListen.bind(this)}>
                        <View style={[styles.listenBtn, this.state.isListen ? {borderColor: 'red'} : { borderColor: 'black'}]}>
                            <Icon 
                                size={80}
                                name='mic'
                                color='black'/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onStopRecord.bind(this)}>
                        <View style={styles.stopBtn}>
                            <Text>STOP RECORDING</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text>{this.state.recording}</Text>
                <Text>{this.state.partialResults}</Text>
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
    },
    stopBtn: {
        flex: 0,
        alignItems: 'center',
        marginTop: 25,
    }
});