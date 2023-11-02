import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAsync } from "../store/slice/authSlice";
import { slate } from "../style/color";

export default function Home() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(getProfileAsync());
        }
    }, [dispatch, user]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
            <Text style={{ fontSize: 32, color: slate[600], fontWeight: 600}}>Home</Text>
            <Text style={{ fontSize: 20, color: slate[500], fontWeight: 400}}>{user?.username}</Text>
        </View>
    )
}