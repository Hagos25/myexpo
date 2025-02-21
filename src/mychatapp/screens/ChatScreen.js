import React, { useEffect, useState,useLayoutEffect } from "react";
import { View, TextInput, Image, FlatList, Text,StyleSheet ,TouchableOpacity,KeyboardAvoidingView, Platform  } from "react-native";
import { db, collection, onSnapshot } from '../firebase'
import { useDispatch, useSelector } from "react-redux";
import { sendMessageRequest,fetchMessagesRequest } from '../slices/ChatSlice'
import { logoutRequest } from '../slices/AuthSlice'
const ChatScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    //const { user } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.auth) || {};
    const [message, setMessage] = useState("");
    
    //const [messages, setMessages] = useState([]);
    const { messages =[]} = useSelector(state => state.chat);
   console.log(messages,"message")
    useEffect(() => {
        dispatch(fetchMessagesRequest()); // Fetch messages using Redux-Saga
    }, []);

    useEffect(() => {
        console.log("Updated messages:", messages);
    }, [messages]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    const handleLogout = () => {
        dispatch(logoutRequest()); // Logout user from Redux
        navigation.replace("Login"); //  Navigate to Login screen
    };
    
    {/*useEffect(() => {
        // Real-time Firestore listener for chat messages
        const unsubscribe = onSnapshot(
            collection(db, "messages"),
            (snapshot) => {
                const newMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(newMessages);
                console.log("Received real-time messages:", newMessages);
            }
        );

        return () => unsubscribe();
    }, []);
    */}
    const sendMessage = () => {
        dispatch(sendMessageRequest({ message, senderId: user.uid,
 avatar: `https://i.pravatar.cc/300?u=${user.uid}`

        }));
        setMessage("");
    };

    return (
        <View style={styles.container}>
            <FlatList

                data={(messages|| []).filter(item => item && item.id)}
                renderItem={({ item }) => (
            <View style={styles.messageRow}>
               <Image 
               source={{ uri: item.avatar || "https://i.pravatar.cc/300" }} 
                style={styles.avatar} 

               />
                    
                    <View style={[
                        styles.messageBubble,
                        item.senderId === user.uid ? styles.sentMessage : styles.receivedMessage
                    ]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesContainer}
            />
            <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
    >
        <View style={styles.inputWrapper}>
            <TextInput 
             style={styles.input}
            placeholder="Type a message" value={message}
             onChangeText={setMessage} 
             />
            {/*<Button title="Send" onPress={sendMessage} />*/}
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#f0f0f0",
    },
    messagesContainer: {
        flexGrow: 1, 
        paddingBottom: 10 ,// Ensures space for input
        padding: 10,
        //height:"80%",
    },
    messageBubble: {
        padding: 12,
        borderRadius: 18,
        maxWidth: "75%",
        marginVertical: 4,
    },
    sentMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#007AFF", // Blue for sender
        padding: 12,
        borderRadius: 15,
    },
    receivedMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#E5E5EA", // Gray for receiver
        padding: 12,
        borderRadius: 15,
    },
    messageText: {
        fontSize: 16,
        color: "#fff",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: "#f5f5f5",
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputWrapper: {
        flexDirection: "row", // Keeps input & button on the same row
        alignItems: "center", // Aligns them properly
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    logoutButton: {
        marginRight: 15, 
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#e74c3c", // Red logout button
        borderRadius: 5,
    },
    logoutText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },

    messageRow: {
        flexDirection: "row", //  Ensures avatar & message are aligned
        alignItems: "center",
        marginVertical: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20, //  Circular avatar
        marginRight: 10,
    },
});

export default ChatScreen;
