import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { loginAsync, clearError } from '../store/slice/authSlice'

import { slate } from '../style/color'
import { fontSize } from '../style/fontSize'
import { spacing } from '../style/spacing'
import { fontWeight } from '../style/fontWeight'

import { useToast } from '../components/toast/useToast'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing[12]
    },
    header: {
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight['semibold'],
        marginBottom: spacing[6],
        color: slate[800]
    },
    formGroup: {
        width: "100%",
        marginBottom: spacing[4],
    },
    label: {
        marginBottom: spacing[1],
        color: slate[700],
        fontSize: fontSize['xs'],
    },
    input: {
        borderWidth: 1,
        borderColor: slate[300],
        borderRadius: 4,
        padding: spacing[2],
        fontSize: fontSize['sm'],
        color: slate[800],
        outlineWidth: 0,
    },
    loginBtn: {
        width: "100%",
        paddingVertical: spacing[2],
        borderRadius: 4,
        backgroundColor: slate[800],
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing[4],
        flexDirection: 'row',
    },
    loginDisabled: {
        backgroundColor: slate[500],
    },
    btnText: {
        fontSize: fontSize['sm'],
        color: slate[100],
        fontWeight: fontWeight['normal']
    }
})

export default function Login() {
    const { isLoading, error } = useSelector((state) => state.auth);
    const { showToast } = useToast();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            showToast(error.error, 'error');
            dispatch(clearError());
        }
    }, [error])

    useEffect(() => {
        if (username !== "" && password !== "") {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [username, password])

    const handleLogin = () => {
        if (username !== "" && password !== "") {
            dispatch(loginAsync({ username, password }))
            setPassword('');
            setUsername('');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
            </View>
            <Pressable style={[styles.loginBtn, isDisabled && styles.loginDisabled]} onPress={handleLogin} disabled={isDisabled || isLoading}>
                {
                    isLoading && <ActivityIndicator color={slate[100]} size={"small"} style={{ marginLeft: spacing[4] }} />
                }
                <Text style={styles.btnText}>Login</Text>
            </Pressable>
        </View>
    )
}