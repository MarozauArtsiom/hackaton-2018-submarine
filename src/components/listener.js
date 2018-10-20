import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Voice from 'react-native-voice';
import axios from 'axios';

export class Listener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListen: false,
            recording: 'Stopped',
            partialResults: [],
            wordCount: ''
        };

        this.REQUEST_POST = 'http://192.168.43.226:6969/check-for-parasite';

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
        let wordsString = e.value[0];

        this.setState({
            partialResults: e.value[0]
        });

        //this.httpPost(this.REQUEST_POST, {phrase: wordsString});
    }

    onSpeechEndHandler(e) {
        let wordsString = this.state.partialResults;

        this.setState({
            recording: 'Stopped',
            isListen: false
        });

        axios.post(this.REQUEST_POST, {phrase: wordsString}).then((res) => {
            console.log(res.data);
            this.setState({
                wordCount: res.data
            });
        }).catch((err) => console.log(err));
    }

    render() {
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
                <Text>{this.state.wordCount}</Text>
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