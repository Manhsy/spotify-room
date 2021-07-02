import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Title from '../components/Title'
const JoinARoomScr = ({ navigation }) => {
    return (
        <>
            <Title />
            <TextInput style={styles.input}
                placeholder="Enter Room Code"
                maxLength={100}
                multiline={false}
            />
            <TouchableOpacity onPress={() => { navigation.navigate('Create') }}>
                <Text style={styles.button}>Create a room</Text>
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
    button: {
        top: "1150%",
        alignSelf: "center",
        color: "blue",
        fontSize: 18,
    }
})

export default JoinARoomScr;