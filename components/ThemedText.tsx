import { Colors } from "@/constants/Colors";
import { PropsWithChildren } from "react";
import { ColorSchemeName, StyleProp, StyleSheet, Text, TextStyle, useColorScheme } from "react-native";

type Props = PropsWithChildren<{
    style?: StyleProp<TextStyle>;
}>

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    text: {
        color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
});

export default function ThemedText({ children, style }: Props) {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);

    return <Text style={[styles.text, style]}>{children}</Text>;
}