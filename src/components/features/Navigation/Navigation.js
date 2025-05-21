import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import AuthStack from './AuthStack/AuthStack';
import AppStack from './AppStack/AppStack';

import { fetchAllUsersModelAsync } from '../../../store/slices/userSlice';
import { fetchAllCardsModelAsync } from '../../../store/slices/carSlice';

const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchAllUsersModelAsync());
        dispatch(fetchAllCardsModelAsync());
    }, []);

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation;
