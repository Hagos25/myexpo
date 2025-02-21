import React, { useState ,useEffect} from 'react';
import { View, TextInput, StatusBar, Text, ActivityIndicator ,SafeAreaView,Image, StyleSheet,TouchableOpacity} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../slices/AuthSlice'

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const {user, loading, error } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const [successMessage, setSuccessMessage] = useState("")
    const handleLogin = () => {
        
        dispatch(loginRequest({ email, password }));
        //console.log('loginRequest',action.payload);
        
    };
    useEffect(() => {
        if (user) {
            console.log("Login successful! Navigating to Chat...");
            setSuccessMessage("Login Successful! Redirecting to Chat...");
            setTimeout(() => {
                navigation.replace("Chat", { chatId: "chatId1" });// Navigate to Chat screen
            }, 1500);
        }
    }, [user]);
    return (
        <View style={styles.container}>
        <SafeAreaView style={styles.form}>
            <Image source={require('../../../assets/backImage.png')} style={styles.backImage} />
        <View style={styles.whiteSheet}/>
        
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} 
             style={styles.input}
             autoCapitalize="none"
             autoCorrect={false}
             />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry 
             style={styles.input}
             autoCapitalize="none"
             autoCorrect={false}
             />
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
            {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text1}> Log In</Text>
      </TouchableOpacity>
      <View style={styles.Text2}>
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.Text}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
        </View>
       
    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFEFD5",
      },
      whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
    backImage: {
        width: "100%",
        height: 350,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
      },
      input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      text1:{
        fontWeight: 'bold', 
        color: '#fff', 
        fontSize: 18
      },
      Text2:{
        marginTop: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        alignSelf: 'center',
       
      },
      button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      text:{
        color: 'gray',
         fontWeight: '600', 
         fontSize: 14
      },
      Text:{
        color: '#f57c00',
         fontWeight: '600', 
         fontSize: 14
      },
      error:{
         color: 'red' 
      }
})
export default LoginScreen;