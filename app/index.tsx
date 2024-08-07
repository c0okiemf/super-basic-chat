import ChatButton from "@/components/ChatButton";
import PageWrapper from "@/components/PageWrapper";
import { Colors } from "@/constants/Colors";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useAuth } from "@/providers/AuthContextProvider";
import { router } from 'expo-router';
import { useState } from "react";
import { ColorSchemeName, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    text: {
        color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    textInput: {
        backgroundColor: colorScheme === "dark" ? Colors.dark.textInput : Colors.light.textInput,
        padding: 10,
        borderRadius: 5,
        height: 40,
        flex: 0.8,
        color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
});

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const styles = useThemedStyles(getStyles);

    const { setUsername: setAuthUserName } = useAuth();

    const onLogin = () => {
        setAuthUserName(username);
        router.navigate("/chat");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <PageWrapper>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                        placeholderTextColor={styles.text.color}
                        onSubmitEditing={onLogin}
                        clearButtonMode="always"
                    />
                    <ChatButton onPress={onLogin} label={"Login"} />
                </View>
            </PageWrapper>
        </TouchableWithoutFeedback>
    );
}