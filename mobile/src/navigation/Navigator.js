import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import Toast from '../components/toast/Toast';

import { getToken } from '../services/tokenServices';

import { AppStack } from './stack/AppStack';
import { AuthStack } from './stack/AuthStack';

import { setAuth } from '../store/slice/authSlice';

export default function Navigator() {
    const { isAuth } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        getToken()
            .then(token => {
                if (token && isAuth === false) {
                    dispatch(setAuth(true));
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <NavigationContainer >
            {isAuth ? <AppStack /> : <AuthStack />}
            <Toast />
        </NavigationContainer>
    )
}