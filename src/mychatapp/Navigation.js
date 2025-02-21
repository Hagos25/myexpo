

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ChatScreen from './screens/ChatScreen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer style={{flex:1}}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    
                />
                <Stack.Screen 
                    name="Signup" 
                    component={SignupScreen} 
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen 
                    name="Chat" 
                    component={ChatScreen} 
                    
                    options={{ headerTitle: "Chat Group" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
