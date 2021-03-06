import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Button, Input, Image } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from "react-native";
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if(authUser) {
            navigation.replace("Home")
        }
    });
    return unsubscribe;
}, [])

const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .catch(error => alert(error))
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image 
                source={{
                    uri:
                    "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }}
                style={{ width: 200, height: 200}}
            />
            <View style={styles.inputContainer}>
                <Input 
                style={styles.input}
                placeholder="Email" 
                autofocus 
                type="email"
                value={email}
                onChangeText = {(text => setEmail(text))}
                />
                <Input 
                style={styles.input}
                placeholder="Password" 
                secureTextEntry 
                type="password"
                value={password}
                onChangeText = {(text => setPassword(text))}
                onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button onPress={() =>  navigation.navigate('Register')}containerStyle={styles.button} type="outline" title="Register" />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
        paddingTop: 30
    },
    inputContainer: {
        width: 200
    },
    input: {
        width: "100%"
    },
    button: {
        width: 200,
        marginTop: 10
    }
})