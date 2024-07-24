import ChatButton from "@/components/ChatButton";
import MessageBubble from "@/components/MessageBubble";
import PageWrapper from "@/components/PageWrapper";
import { Colors } from "@/constants/Colors";
import { useMessages } from "@/hooks/useMessages";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useState } from "react";
import { ColorSchemeName, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";

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
  flatList: {
    flex: 1,
    width: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  }
});

export default function Chat() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const styles = useThemedStyles(getStyles);

  const { messages, sendMessage } = useMessages();

  const onSendMessage = () => {
    sendMessage(currentMessage);
    setCurrentMessage("")
  };

  return (
    <PageWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          style={styles.flatList}
          data={messages}
          renderItem={({ item: { userName, message } }) => <MessageBubble userName={userName} message={message} />}
          keyExtractor={(_, index) => index.toString()}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          inverted={true}
        />
        <View style={styles.inputWrapper} >
          <TextInput
            style={styles.textInput}
            value={currentMessage}
            onChangeText={setCurrentMessage}
            onSubmitEditing={onSendMessage}
            clearButtonMode="always"
          />
          <ChatButton onPress={onSendMessage} label={"Send"} />
        </View>
      </KeyboardAvoidingView>
    </PageWrapper>
  );
}
