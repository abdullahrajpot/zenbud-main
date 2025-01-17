import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import Tts from "react-native-tts";
import ChatBubble from "./ChatBubble";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

export default function Chatbot() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyCYdkV6N2Fq5IyiKWO88eTIHTij18SODwo";

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "assistant",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      Tts.stop();
      setIsSpeaking(false);
    } else {
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1.0);
      Tts.speak(text, {
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <LinearGradient
      colors={[ '#000000' ,'#dd5201',]}
      start={{ x: 1, y: 1 }}
      end={{ x: 3, y: 0 }}
      style={styles.container}
    >
      <Image
        source={require('../../../assets/image/ai-avatar.jpg')}
        style={styles.avatar}
      />
      <Text style={styles.title}>Gemini Chatbot</Text>
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleUserInput}>
          <FontAwesome name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator style={styles.loading} color="#dd5201" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // Ensure gradient fills the entire background
    justifyContent: "space-between",
  },
  avatar: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#dd5201',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text for the title
    marginBottom: 20,
    textAlign: "left",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333", // Dark input background
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingLeft: 10,
    color: "#fff", // White input text
  },
  sendButton: {
    backgroundColor: "#dd5201", // Button with orange color
    borderRadius: 25,
    padding: 10,
  },
  loading: {
    marginTop: 10,
  },
  error: {
    color: "#dd5201", // Orange error text
    marginTop: 10,
    textAlign: "center",
  },
});
