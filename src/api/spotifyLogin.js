import React, { useEffect } from "react";
import { Linking } from 'react-native';
// import Rdirect from './RDirect'
import spotCred from '../sensitive/spotifyCred'
function SpotifyLogin() {
    console.log("hi")
    const REACT_APP_CLIENT_ID = spotCred.spodifyCred.REACT_APP_CLIENT_ID
    const REACT_APP_AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
    const REACT_APP_REDIRECT_URL = "exp://192.168.0.11:19000"
    var scope = 'playlist-read-private user-read-private user-read-email user-read-playback-state user-top-read playlist-read-private';
    const generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    var state = generateRandomString(16);
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(REACT_APP_CLIENT_ID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(REACT_APP_REDIRECT_URL);
    url += '&state=' + encodeURIComponent(state);
    // console.log(url);
    Linking.openURL(url)
    // Rdirect
    return (url)

}
export default SpotifyLogin;