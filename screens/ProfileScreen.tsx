import {StyleSheet} from "react-native";
import {Text, View} from "../components/Themed";
import {RootTabScreenProps} from "../types";
import {useAuthentication} from "../hooks/useAuthentication";

export default function ProfileScreen({
                                          navigation,
                                      }: RootTabScreenProps<"TabOne">) {
    const user = useAuthentication();
    console.log(user);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Page</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
