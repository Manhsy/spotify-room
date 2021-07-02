import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustButton = ({ title, onSub, disable, buttonColor }) => {

    return (<>

            <TouchableOpacity 
                style={buttonStyle(buttonColor).button} 
                onPress={() =>{disable? null: onSub()}}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>

        </>
    )
}

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        fontSize: 20,
    }
})

const buttonStyle = (buttonColor)=>StyleSheet.create({
    button: {
        width: 234,
        height: 55,
        paddingHorizontal: '50%',
        alignSelf: 'center',
        justifyContent: "center",
        borderRadius: 7,
        paddingHorizontal: 12,
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 4 },
        backgroundColor: buttonColor,
    }
})

export default CustButton;