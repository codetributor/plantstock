import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomListItem from '../components/CustomListItem';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Avatar, Button } from 'react-native-elements';
import { auth, db } from '../firebase';
import { UserProfile, signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { addDoc, doc, collection, onSnapshot } from 'firebase/firestore';


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    useEffect(async () => {
        const chatRef = await collection(db, "chats");
        const unsubscribe = await onSnapshot(chatRef, (snapshot) => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [])

    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace('Login');
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Plantstock",
            headerStyle: { backgroundColor: "#fff"},
            headerTitleStyle: {color: "black}"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ 
                    marginLeft: 20,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                    }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL
                    }}
                    />
                    </TouchableOpacity> 
                    <Text onPress={signOutUser} style={{
                        marginLeft: 10
                    }}>Sign Out</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons onPress={() => {
                            navigation.navigate("AddChat");
                        }}name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    };

    return(
        <SafeAreaView>
            <ScrollView>
                {chats.map(({id, data: {chatName}}) => (
                    <CustomListItem 
                    key={id} 
                    id={id} 
                    chatName={chatName}
                    enterChat={enterChat}
                    />  
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
});