import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import Icon from "react-native-vector-icons/Ionicons";
import Clipboard from "@react-native-clipboard/clipboard";

export default function Converter() {
  const [imageUri, setImageUri] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageSelection = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
      });

      if (image?.path) {
        setImageUri(image.path);
        extractTextFromImage(image.path);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handleImageCapture = async () => {
    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
        compressImageQuality: 0.8,
      });

      if (image?.path) {
        setImageUri(image.path);
        extractTextFromImage(image.path);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert("Error", "Failed to capture image. Please try again.");
    }
  };

  const extractTextFromImage = async (uri) => {
    try {
      setLoading(true);

      const recognizedText = await TextRecognition.recognize(uri);

      if (recognizedText && recognizedText.text) {
        setExtractedText(recognizedText.text);
      } else {
        setExtractedText("No text found in the image.");
      }
    } catch (error) {
      console.error("Error during text extraction:", error);
      Alert.alert("Error", "Failed to extract text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (extractedText) {
      Clipboard.setString(extractedText);
      Alert.alert("Success", "Text copied to clipboard!");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      

        <Text style={styles.title}>Image to Text</Text>

        <TouchableOpacity style={styles.button} onPress={handleImageSelection}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleImageCapture}>
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        {loading && <ActivityIndicator size="large" color="#FFA726" />}

        {extractedText ? (
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Extracted Text:</Text>
            <Text style={styles.text}>{extractedText}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyText}>
              <Icon name="copy-outline" size={24} color="white" />
              <Text style={styles.copyButtonText}>Copy Text</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop:60
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FFA726",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#dd5201",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    shadowColor: "#dd5201",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "90%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFA726",
  },
  textContainer: {
    marginTop: 20,
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  textLabel: {
    fontWeight: "bold",
    color: "#FFA726",
    marginBottom: 10,
    fontSize: 16,
  },
  text: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "justify",
  },
  copyButton: {
    flexDirection: "row",
    backgroundColor: "#dd5201",
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#FFA726",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
