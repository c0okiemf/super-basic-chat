import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { TouchableOpacity, Text, ColorSchemeName, StyleSheet } from "react-native";

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
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
            <ThemedText>{label}</ThemedText>
        </TouchableOpacity>
    );
}
