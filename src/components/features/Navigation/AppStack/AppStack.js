import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from "../../Feed/Feed";
import Car from "../../Car/Car";
import AddCarData from "../../AddCarData/AddCarData";
import UpdateUserData from "../../UpdateUserData/UpdateUserData";
import UpdateCarData from '../../UpdateCarData/UpdateCarData';

const Stack = createNativeStackNavigator();

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="feed" component={Feed} />
        <Stack.Screen name="car" component={Car} />
        <Stack.Screen name="addCarData" component={AddCarData} />
        <Stack.Screen name="updateUserData" component={UpdateUserData} />
      <Stack.Screen name="updateCarData" component={UpdateCarData} />
    </Stack.Navigator>
);

export default AppStack;
