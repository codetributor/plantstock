import { StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements'
import { StatusBar } from "expo-status-bar";
import { useState, useLayoutEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';



const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            const user = authUser.user
            updateProfile(user,{
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            })
        }).catch((error) => alert(error.message));
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50, textAlign: "center"}}>
                Create a Plantstock account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    secureTextEntry 
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder="Profile Picture URL (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Register"
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        width: 300,
    },
    button: {
        width : 200,
        marginTop: 10
    }
})