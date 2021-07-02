import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import Title from '../components/Title'
// import authHandler from '../utils/authenticationHandler';
import CustButton from '../components/CustButton';
import SpotifyLogin from '../api/spotifyLogin'
import * as AuthSession from 'expo-auth-session';
var token = '../api/RDirect'
const CreateRoomScr = ({ navigation }) => {
    const [roomName, setRoomName] = useState("");
    return (
        <>
            <Title />
            <TextInput 
                style={styles.input}
                placeholder="Enter Room Name"
                maxLength={100}
                multiline={false}
                value={roomName}
                onChangeText={setRoomName}
            />
            
            <View style={{ top: "26%" }}>
                <CustButton
                    title="Log into Spotify"
                    onSub={SpotifyLogin}
                    disable={roomName.length===0 ? true : false}
                />

            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Join') }}>
                <Text style={styles.joinButton}>Join a Room</Text>
            </TouchableOpacity>

            {token ? null : <Text>{token.access_token}</Text>}
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