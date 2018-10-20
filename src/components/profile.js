export class Profile extends React.Component {

    setUpFetchVariables() {
        this.BASE_FETCH_URL = 'http://192.168.43.226:6969';
        this.PROFILE_FETCH_URL = '/profile';
    }

    constructor(props) {
        this.state = {
            id,
            name,
            surName,
            description,
            avatarUrl,
            age,
            daysWithout: {
                alcohol,
                cigarettes,
                parasiteWords
            }
        };
        this.setUpFetchVariables();
    }

    uploadData() {
        const onProfileFetchSuccess = (response) => {
            const json = response.json();
            const newState = response;
            this.setState(newState);
        }
        const onProfileFetchFailed = (err) => {
            this.setState({});
        }
        fetch(this.BASE_FETCH_URL + this.PROFILE_FETCH_URL).then(
            onProfileFetchSuccess,
            onProfileFetchFailed
        );
    }

    render() {
        return (
            <ScrollView>
                <Avatar
                    rounded
                    medium
                    source={{uri: `data:image/png;base64,${this.state.avatarUrl}`}}
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
                    <Button>Today i don't drink alcohol</Button>
                </View>
                <View style={styles.daysWithoutContainer}>
                    <Text style={styles.daysWithoutDescription}>Days Without smoking</Text>
                    <Text>{this.state.daysWithout.cigarettes}</Text>
                    <Button>Today i don't smoke</Button>
                </View>
                <View style={styles.daysWithoutContainer}>
                    <Text style={styles.daysWithoutDescription}>Days Without parasite words</Text>
                    <Text>{this.state.daysWithout.parasiteWords}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainLayout: {
        flex: 1,
        flexDirection: 'horisontal',
        justifyContent: 'center';
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
        fontSize: '20'
    },
    personalLayout: {

    },

    daysWithoutContainer: {
        width: '100%'
    },
    daysWithoutDescription: {
        fontSize: '15'
    },
    daysWithoutValue: {
        fontSize: '15'
    },
    daysWithoutIncrementButton: {

    }
})
