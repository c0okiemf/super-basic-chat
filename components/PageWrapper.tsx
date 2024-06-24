import { Colors } from "@/constants/Colors";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { PropsWithChildren } from "react";
import { ColorSchemeName, View, StyleSheet } from "react-native";

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
    },
});

export default function PageWrapper({ children }: PropsWithChildren) {
    const styles = useThemedStyles(getStyles);

    return (
        <View style={styles.wrapper}>
            {children}
        </View>
    );
};
