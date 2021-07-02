import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustButton = ({ title, onSub, disable }) => {
    const displayError = ()=>{
        return (
            <Text style = {styles.error}> Enter room name before proceeding</Text>
        )
    }
    const [error, setError] = useState("");
    return (<>
            {error.length>0? <Text style = {styles.error}> Enter room name before proceeding</Text>: null}
            <TouchableOpacity 
                style={styles.button} 
                onPress={() =>{
                    if(disable)setError("Enter room name before proceeding")
                    return (
                        disable? null: onSub()
                    )
                }}
                // disabled={disable}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    error: {
        paddingVertical: 10,
        alignSelf: 'center',
        color: 'red',
    },
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