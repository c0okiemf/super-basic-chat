import { Colors } from "@/constants/Colors";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { TouchableOpacity, Text, ColorSchemeName, StyleSheet } from "react-native";

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    text: {
        color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    button: {
        backgroundColor: colorScheme === "dark" ? Colors.dark.button : Colors.light.button,
        padding: 10,
        borderRadius: 5,
        flex: 0.2,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});

interface Props {
    onPress: () => void;
    label: string;
}

export default function ChatButton({ onPress, label }: Props) {
    const styles = useThemedStyles(getStyles);

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}
