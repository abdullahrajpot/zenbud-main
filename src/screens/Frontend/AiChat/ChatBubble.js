import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import Clipboard from "@react-native-clipboard/clipboard";

const ChatBubble = ({ role, text, onSpeech }) => {
  const handleCopy = async () => {
    Clipboard.setString(text);
    Alert.alert("Error","Copied to clipboard!");
  };

  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <FontAwesome name="volume-up" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCopy} style={styles.copyIcon}>
          <FontAwesome name="copy" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
  },
  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: "#dd5201",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
  },
  chatText: {
    fontSize: 16,
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    marginTop: 5,
  },
  speakerIcon: {
    marginRight: 10,
  },
  copyIcon: {},
});

export default ChatBubble;
