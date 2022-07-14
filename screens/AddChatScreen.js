import { StyleSheet, Text, View } from "react-native-web";
import { useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from "../firebase";
import { addDoc, doc, collection } from 'firebase/firestore';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add New Chat",
            headerBackTitle: "Chats",
        })
    }, [])

    const createChat = async () => {
        let collRef = await collection(db, "chats");
        await addDoc( collRef, { chatName: input})
        .then(() => {
            navigation.goBack();
        })
        .catch(error => alert(error));
        
    }

    return(
        <View style={ styles.container }>
            <View style={styles.inputContainer}>
            <Input 
            autoFocus
            placeholder="Enter chat name"
            value={input}
            onChangeText={text => setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            }
            />
            <Button 
            disable={!input}
            style={styles.button}
            onPress={createChat} 
            title="Create New Chat"
             />
            </View>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30
    },
    inputContainer: {
        backgroundColor: "white",
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
    },
})