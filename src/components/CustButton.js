import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustButton = ({ title, onSub }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => { onSub() }}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 234,
        height: 55,
        paddingHorizontal: '50%',
        alignSelf: 'center',
        justifyContent: "center",
        backgroundColor: "#E5DCF3",
        borderRadius: 7,
        paddingHorizontal: 12,
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 4 },
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
    }
})

export default CustButton;