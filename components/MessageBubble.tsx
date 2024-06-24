import ThemedText from "@/components/ThemedText";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useEffect, useState } from "react";
import { ColorSchemeName, StyleSheet, View, useColorScheme } from "react-native";

const darkBackgroundColors = [
    "#1A1A1A", /* Dark Charcoal */
    "#0A0F0D", /* Rich Black */
    "#003366", /* Dark Midnight Blue */
    "#2C3E50", /* Madison */
    "#34495E", /* Ebony */
    "#4A235A", /* Plum */
    "#154360", /* Prussian Blue */
    "#1B4F72", /* Queen Blue */
    "#212F3D", /* Outer Space */
    "#283747"  /* Gunmetal */
];

const lightBackgroundColors = [
    "#F2F3F4", /* Whisper */
    "#D5DBDB", /* Morning Fog */
    "#AEB6BF", /* Cadet Grey */
    "#EAECEE", /* Solitude */
    "#D6EAF8", /* Pattens Blue */
    "#A9CCE3", /* French Pass */
    "#AED6F1", /* Jordy Blue */
    "#A3E4D7", /* Magic Mint */
    "#ABEBC6", /* Grannysmith Apple */
    "#F9E79F"  /* Buff */
];

const userColors = new Map();

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
        padding: 20,
        margin: 10,
        borderRadius: 20,
        maxWidth: "80%",
        position: "relative",
    },
    authorName: {
        color: colorScheme === "dark" ? "#bbb" : "#555",
        fontSize: 12,
        position: "absolute",
        bottom: 5,
        right: 20,
        opacity: 0.6,
    },
});

interface Props {
    message: string;
    userName: string;
}

export default function MessageBubble({ message, userName }: Props) {
    const [userColor, setUserColor] = useState<string>("#f0f0f0");
    const colorScheme = useColorScheme() ?? "light";
    const styles = useThemedStyles(getStyles);

    useEffect(() => {
        if (!userColors.has(userName)) {
            const darkColor = darkBackgroundColors[Math.floor(Math.random() * darkBackgroundColors.length)];
            const lightColor = lightBackgroundColors[Math.floor(Math.random() * lightBackgroundColors.length)];
            userColors.set(userName, { dark: darkColor, light: lightColor });
        }
        const userColor = userColors.get(userName)[colorScheme];
        setUserColor(userColor);
    }, [userName, colorScheme]);

    return (
        <View style={[styles.container, { backgroundColor: userColor }]}>
            <ThemedText>{message}</ThemedText>
            <ThemedText style={styles.authorName}>{userName}</ThemedText>
        </View>
    );
}