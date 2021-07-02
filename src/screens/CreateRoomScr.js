import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Title from '../components/Title'
import CustButton from '../components/CustButton';
import SpotifyLogin from '../api/spotifyLogin'

const CreateRoomScr = ({ navigation }) => {
    const [roomName, setRoomName] = useState("");

    const displayError = ()=>{
        return (
            <Text style = {styles.error}> Enter room name before proceeding</Text>
        )
    }
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

            {roomName.length>0? null: displayError()}
             
            <View style={{ top: "26%" }}>
                <CustButton
                    title="Log into Spotify"
                    onSub={SpotifyLogin}
                    disable={roomName.length===0 ? true : false}
                    buttonColor="#1BD760"
                />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Join') }}>
                <Text style={styles.joinButton}>Join a Room</Text>
            </TouchableOpacity>

        </>
    )
}

const styles = StyleSheet.create({
    error: {
        top: '25.5%',
        paddingVertical: 2,
        alignSelf: 'center',
        color: 'red',
    },
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