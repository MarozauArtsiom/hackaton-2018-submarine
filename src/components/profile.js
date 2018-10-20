import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
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
            const newState = JSON.parse(response);
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
                    <View style={styles.avatarWrapper}>
                        <Avatar
                            rounded
                            title='A'
                            height={250}
                            source={{ uri: this.state.avatarUrl }}
                        />
                    </View>
                    <View style={styles.personalLayout}>
                        <Text>{this.state.name} {this.state.surName}, {this.state.age} years old</Text>
                        
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{this.state.description}</Text>
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
        backgroundColor: 'white'
    },
    avatarWrapper: {
        width: 250,
        height: 250,
        borderWidth: 10,
        borderColor: 'white',
        borderRadius: 125
    },
    avatar: {
    },
    description: {
        width: '90%',
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    descriptionText: {
        fontSize: 25,
        color: white
    },
    personalLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalInfo: {
        color: white,
        fontSize: 35
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
