import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Title from '../components/Title'
// import authHandler from '../utils/authenticationHandler';
import CustButton from '../components/CustButton';
const CreateRoomScr = ({ navigation }) => {
    return (
        <>
            <Title />
            <TextInput style={styles.input}
                placeholder="Enter Room Name"
                maxLength={100}
                multiline={false}
            />
            <View style={{ top: "26%" }}>
                <CustButton
                    title="Log into Spotify"
                // onSub={authHandler.onLogin}
                />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Join') }}>
                <Text style={styles.joinButton}>Join a Room</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "98%",
        backgroundColor: "white",
        height: 50,
        top: "25%",
        borderRadius: 5,
        paddingLeft: 16,
        textAlign: "left",
        fontSize: 21,
        left: 4,
    },
    joinButton: {
        top: "1150%",
        alignSelf: "center",
        color: "blue",
        fontSize: 18,
    }
})

export default CreateRoomScr;