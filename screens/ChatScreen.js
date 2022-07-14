import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { addDoc, doc, collection, onSnapshot, setDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { auth, db } from "../firebase";
import { currentUser } from "firebase/auth";

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messaages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
                >
                    <Text
                    style={{ color: "white", marginLeft: 10, fontWeight: "700"}}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation]);

    const sendMessage = async () => {
        Keyboard.dismiss();

        let collRef = await collection(db, `chats/${route.params.id}/messages`);
        await addDoc( collRef, { 
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoUrl: auth.currentUser.photoURL,
            timeStamp: serverTimestamp(db)
        })
        .catch(error => alert(error));
        setInput("");
    }

    useLayoutEffect(() => {
        const collRef = collection(db, `chats/${route.params.id}/messages`);
        const messList = query(collRef, orderBy("timeStamp", "asc"));
        const unsubscribe = onSnapshot(messList, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
        return unsubscribe
    }, []);

    return(
        
        
        <KeyboardAvoidingView 
                behavior="padding"
                keyboardVerticalOffset={-300}
                style={styles.container}
            >
            <StatusBar style="light" />
        
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    <ScrollView contentContainerStyle={{paddingTop: 15}}>
                        {messaages.map(({id, data}) => (
                            data.email == auth.currentUser.email ? (
                                <View key={id} style={styles.sender}>
                                    <Text style={styles.senderText}>{data.message}</Text>
                                </View>
                            ) : ( 
                                <View key={id} style={styles.reciever}>
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                    <Text style={styles.nameText}>~{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                        autoFocus
                        placeholder="tock the Tock"
                        style={styles.textInput}
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sender: {
        padding: 5,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 10,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
    },
    senderText: {
    },
    reciever: { 
        padding: 5,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 10,
        margin: 15,
        maxWidth: "80%",
    },
    recieverText: {
        color: "#ECECEC",
    },
    nameText: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
        marginBottom: 5,
        marginTop: 5
    },
    footer: {
        flexDirection: "row",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
});