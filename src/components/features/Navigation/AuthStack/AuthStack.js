import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from "../../Welcome/Welcome";
import Login from "../../Login/Login";
import SignUp from "../../SignUp/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signUp" component={SignUp} />
    </Stack.Navigator>
);

export default AuthStack;
