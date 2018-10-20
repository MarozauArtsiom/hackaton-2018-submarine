import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Text as MatText } from 'react-native-elements';

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
            age: null,
            daysWithout: {
                alcohol: '',
                cigarettes: '',
                parasiteWords: ''
            },
            isLoading: true,
            lastParasiteWordUsed: new Date(null)
        };
        this.setUpFetchVariables();
        // datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
        Date.dateDiff = function (datepart, fromdate, todate) {
            datepart = datepart.toLowerCase();
            var diff = todate - fromdate;
            var divideBy = {
                w: 604800000,
                d: 86400000,
                h: 3600000,
                n: 60000,
                s: 1000
            };

            return Math.floor(diff / divideBy[datepart]);
        }

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

        setTimeout(() => {
            this.setState({
              isLoading: false
            });
          }, 1000);
    }

    getTextAge(age) {
        if(!age) {
            return '';
        }
        var txt;
        count = age % 100;
        if (count >= 5 && count <= 20) {
            txt = 'лет';
        } else {
            count = count % 10;
            if (count == 1) {
                txt = 'год';
            } else if (count >= 2 && count <= 4) {
                txt = 'года'; 12
            } else {
                txt = 'лет';
            }
        }
        return txt;
    }

    toText(sec, ind) {
        const variants = [
            ['секунд', 'секунду', 'секунды'],
            ['минут', 'минуту', 'минуты'],
            ['часов', 'час', 'часа'],
            ['дней', 'день', 'дня'],
            ['недель', 'неделю', 'недели'],
            ['месяцев', 'месяц', 'месяца']
            ['лет', 'год', 'года']
        ]
        var txt;
        count = sec % 100;
        if (count >= 5 && count <= 20) {
            txt = variants[ind][0];
        } else {
            count = count % 10;
            if (count == 1) {
                txt = variants[ind][1];
            } else if (count >= 2 && count <= 4) {
                txt = variants[ind][2];
            } else {
                txt = variants[ind][0];
            }
        }
        return txt;
    }

    getTreeMaxGranylarity() {
        const fromDate = new Date(this.state.lastParasiteWordUsed);
        secDiff = Date.dateDiff('s', fromDate, new Date());
        let startIndex;
        const a = [
            60,
            (60 * 60),
            (24 * 60 * 60),
            (7 * 24 * 60 * 60),
            (6 *  7 * 24 * 60 * 60),
            (12 * 6 *  7 * 24 * 60 * 60)
        ]
        if (secDiff / 60 < 1) {
            startIndex = 0;
        } else if (secDiff / (60 * 60) < 1) {
            startIndex = 1;
        } else if (secDiff / (24 * 60 * 60) < 1) {
            startIndex = 2;
        } else if (secDiff / (7 * 24 * 60 * 60) < 1) {
            startIndex = 3;
        } else if (secDiff / (6 *  7 * 24 * 60 * 60) < 1) {
            startIndex = 4;
        } else if (secDiff / (12 * 6 *  7 * 24 * 60 * 60) < 1) {
            startIndex = 5;
        } else {
            startIndex = 6;
        }
        let num;
        if(startIndex === 0) {
            num = secDif;
        } else {
            num = secDif / a[startIndex - 1];
        }
        const b = Math.floor(num);
        const c = this.toText(startIndex);
        return b + ' ' + c;
    }

    renderStatistic() {
        let result;
        if(this.state.lastParasiteWordUsed.getFullYear() === 1970) {
            result = (
                <View style={styles.daysWithoutContainer}><Text>Тёмная лошадка</Text></View>);
        } else {
            result = (
                <View style={styles.daysWithoutContainer}>
                    <Text style={styles.daysWithoutDescription}>Следит за базаром</Text>
                    <Text>{this.getTreeMaxGranylarity()}</Text>
                </View>
            );
        }
        return result;
    }

    render() {

        if (this.state.isLoading) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MatText h2>Снова тупит...</MatText>
              </View>
            );
          }


        return (
            <ScrollView style={{backgroundColor: 'white'}}>
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
                        <Text style={styles.personalInfo}>{this.state.name} {this.state.surName}, {this.state.age} {this.getTextAge(this.state.age)}</Text>

                    </View>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{this.state.description}</Text>
                    </View>

                    {this.renderStatistic()}
                        {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.daysWithoutValueLayout}>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.daysWithoutValue}>{this.state.daysWithout.parasiteWords}</Text>
                                    <Text style={styles.daysWithoutGranularity}>Лет</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDelimetr}></View>
                            <View style={styles.daysWithoutValueLayout}>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.daysWithoutValue}>{this.state.daysWithout.parasiteWords}</Text>
                                    <Text style={styles.daysWithoutGranularity}>месяцев</Text>
                                </View>
                            </View>
                            <View style={styles.verticalDelimetr}></View>
                            <View style={styles.daysWithoutValueLayout}>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.daysWithoutValue}>{this.state.daysWithout.parasiteWords}</Text>
                                    <Text style={styles.daysWithoutGranularity}>Дней</Text>
                                </View>
                            </View>
                        </View>
                    </View> */}
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
        backgroundColor: 'white',
        minHeight: '100%'
    },
    avatarWrapper: {
        marginTop: 30,
        width: 270,
        height: 270,
        borderWidth: 10,
        borderColor: 'gray',
        borderRadius: 135,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
    },
    description: {
        width: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    descriptionText: {
        fontSize: 17,
        color: "black"
    },
    personalLayout: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalInfo: {
        color: "black",
        fontSize: 25
    },
    daysWithoutContainer: {
        width: '100%',
        marginTop: 50,
    },
    daysWithoutDescription: {
        fontSize: 15
    },
    daysWithoutValuesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90
    },
    daysWithoutValueLayout: {
        width: '30%',
        height: 90
    },
    daysWithoutValue: {
        fontSize: 25,
        color: 'black'
    },
    daysWithoutGranularity: {
        color: 'gray',
        fontSize: 13
    },
    verticalDelimetr: {
        borderWidth: 2,
        borderColor: 'black',
        height: 70,
        width: 0
    }
})
