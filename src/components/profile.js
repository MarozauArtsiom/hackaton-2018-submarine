import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';

export class Profile extends React.Component {

    setUpFetchVariables() {
        this.BASE_FETCH_URL = 'http://192.168.43.226:6969';
        this.PROFILE_FETCH_URL = '/profile';
    }

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            surName: '',
            description: '',
            avatarUrl: '',
            age: '',
            daysWithout: {
                alcohol: '',
                cigarettes: '',
                parasiteWords: ''
            }
        };
        this.setUpFetchVariables();
    }

    httpGet(url) {
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

    uploadData() {
        const onProfileFetchSuccess = (response) => {
            const json = JSON.parse(response);
            const newState = response;
            this.setState(newState);
        }
        const onProfileFetchFailed = (err) => {
            this.setState({});
        }
        this.httpGet(this.BASE_FETCH_URL + this.PROFILE_FETCH_URL).then(
            onProfileFetchSuccess,
            onProfileFetchFailed
        );
    }

    componentDidMount() {
        this.uploadData();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.mainLayout}>
                    <Avatar
                        rounded
                        medium
                        source={{ uri: `data:image/png;base64,${this.state.avatarUrl}` }}
                    />
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{this.state.text}</Text>
                    </View>
                    <View style={styles.personalLayout}>
                        <Text>{this.state.name}</Text>
                        <Text>{this.state.surName}</Text>
                        <Text>{this.state.age}</Text>
                    </View>
                    <View style={styles.daysWithoutContainer}>
                        <Text style={styles.daysWithoutDescription}>Days Without alcohol</Text>
                        <Text>{this.state.daysWithout.alcohol}</Text>
                        <Button title="Today i don't drink alcohol" onPress={() => { }} />
                    </View>
                    <View style={styles.daysWithoutContainer}>
                        <Text style={styles.daysWithoutDescription}>Days Without smoking</Text>
                        <Text>{this.state.daysWithout.cigarettes}</Text>
                        <Button title="Today i don't smoke" onPress={() => { }} />
                    </View>
                    <View style={styles.daysWithoutContainer}>
                        <Text style={styles.daysWithoutDescription}>Days Without parasite words</Text>
                        <Text>{this.state.daysWithout.parasiteWords}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainLayout: {
        flex: 1,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
    },
    description: {
        width: '90%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000000'
    },
    descriptionText: {
        fontSize: 20
    },
    personalLayout: {

    },

    daysWithoutContainer: {
        width: '100%'
    },
    daysWithoutDescription: {
        fontSize: 15
    },
    daysWithoutValue: {
        fontSize: 15
    },
    daysWithoutIncrementButton: {

    }
})
