import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CustButton from '../components/CustButton'
import Title from '../components/Title'
import * as AuthSession from 'expo-auth-session';

const DefaultScr = ({ navigation }) => {

    // AuthSession.makeRedirectUri()
    console.log(AuthSession.makeRedirectUri())
    // console.log(AuthSession.getRedirectUrl())
    return (
        <>

            <Title />
            <View style={styles.container}>
                <CustButton
                    title="Create Room"
                    color="#E5DCF3"
                    onSub={() => { navigation.navigate('Create') }}
                />

                <View style={{ marginTop: 25 }}>
                    <CustButton
                        title="Join Room"
                        onSub={() => { navigation.navigate('Join') }}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        top: '22%',
    }
})

export default DefaultScr;