import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator,SafeAreaView,Image,StyleSheet,StatusBar,TouchableOpacity  } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { signupRequest } from "../slices/AuthSlice"

const SignupScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const {user, loading, error } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState("")
    const handleSignup = () => {
        dispatch(signupRequest({ email, password }));
         // Navigate back to login after signup
    };
    useEffect(() => {
        if (user) {
            console.log("Signup successful! Navigating to Login...");
            setSuccessMessage("Signup Successful! Redirecting to Login...");
            setTimeout(() => {
                navigation.replace("Login"); // Navigate to Login screen
            }, 1500);
        }
    }, [user]);

    return (
        <View style={styles.container}>
        <Image source={require('../../../assets/background.png')} style={styles.backImage2} />
           <View style={styles.whiteSheet}/>
           <SafeAreaView style={styles.form}>
           <Text style={styles.title}>Sign Up</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} 
             style={styles.input}
             autoCapitalize="none"
             />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry 
            autoCapitalize="none"
            style={styles.input}/>
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            {error && <Text style={styles.error}>{error}</Text>}

             
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.text1}> Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.viewtext}>
        <Text style={styles.text1}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text2}> Log In</Text>
        </TouchableOpacity>
      </View>
        </SafeAreaView>
        <StatusBar barStyle="light-content" />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1 ,
        backgroundColor: "#fff",
    },
    error:{
        color: 'red' 
    },
    text1:{
        fontWeight: 'bold', 
        color: '#fff', 
        fontSize: 18,
        
      },
      button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      
    input: {
        backgroundColor: "#87CEEB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      },
    
    text2:{
        color: '#f57c00', 
        fontWeight: '600', 
        fontSize: 14
    },
    text:{
        fontWeight: 'bold',
         color: '#fff', 
         fontSize: 18
    },
    text1:{
        color: 'gray',
         fontWeight: '600', 
         fontSize: 14
    },
    viewtext:{
        marginTop: 20,
         flexDirection: 'row',
          alignItems: 'center',
         alignSelf: 'center'
    },
    backImage2: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
      },
})

export default SignupScreen;