import React from 'react'
import { View, Text } from 'react-native'
import { slate } from '../style/color'

export default function About() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
            <Text style={{ fontSize: 32, color: slate[600], fontWeight: 600}}>About</Text>
        </View>
    )
}