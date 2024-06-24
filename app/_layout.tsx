import { useThemedStyles } from "@/hooks/useThemedStyles";
import AuthContextProvider from "@/providers/AuthContextProvider";
import { Stack } from "expo-router";
import { ColorSchemeName } from "react-native";

const getHeaderStyles = (colorScheme: ColorSchemeName) => ({
  headerStyle: {
    backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
  },
  headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
});

export default function RootLayout() {
  const headerStyles = useThemedStyles(getHeaderStyles);

  return (
    <AuthContextProvider>
      <Stack screenOptions={headerStyles}>
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="chat" options={{ title: "Telegraph" }} />
      </Stack>
    </AuthContextProvider>
  );
}
