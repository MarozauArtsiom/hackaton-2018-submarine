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
            recording: false,
            partialResults: [],
            wordCount: 0,
            isLoading: true
        };

        this.REQUEST_POST = 'http://192.168.43.226:6969/check-for-parasite';

        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechPartialResults  = this.onSpeechPartialResultsHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 1000);
      }

    async onListen() {
        try {
            this.setState({
                recording: true
            });
            Voice.start('ru-RU');
        } catch(err) {
            alert('ERROR');
        }
    }

    onSpeechStartHandler(e) {
        this.setState({
            isListen: true,
        });
    }

    async onStopRecord(e) {
        try {
            
            this.setState({
                wordCount: 0,
            });

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

    }

    onSpeechEndHandler(e) {
        let wordsString = this.state.partialResults;

        this.setState({
            //recording: false,
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
        if (this.state.isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text h2>Тупит...</Text>
              </View>
            );
          }

        return (
            <View style={styles.container}>
                <View style={styles.btnGroup}>
                    <Text h3 style={{marginBottom: 15}}>
                        {
                            this.state.recording ? "Нука ляпни чо" : "Тискани и базарь"
                        }
                    </Text>
                    <TouchableOpacity onPress={this.onListen.bind(this)}>
                        <View style={[styles.listenBtn, this.state.isListen ? {borderColor: 'red'} : { borderColor: 'black'}]}>
                            <Icon 
                                size={80}
                                name='mic'
                                color='black'/>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                {
                    this.state.recording ?
                    <View>
                    <TouchableOpacity onPress={this.onStopRecord.bind(this)}>
                        <View style={styles.stopBtn}>
                            <Text h2>Стапэ</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    : null
                }
                <Text h4>Сказал {this.state.wordCount} матюков</Text>
                <Text h3 style={{ color: 'red' }}>{ this.state.wordCount > 0 ? 'Следи за базаром!!!' : null }</Text>
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
        flex: 0,
        alignItems: 'center',
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
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
    }
});