import { View, Text, StyleSheet, TouchableOpacity, style, Alert,buttonText } from "react-native";
import { COLORS } from "../utils/colors";
import { useState } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { apiClient } from "../utils/api";




export default function AddPostScreen() {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  
  async function handleSubmit(){
    try{
   
    const response = await apiClient.post("/posts",{title,content});
    console.log("post created:",response.data);

    setContent("");
    setTitle("");
    Alert.alert("Success","Post Submited");
  }
  catch (error){
    Alert.alert("Post Submited");
  }
  }
   
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.TextInput}
      placeholder="Title"
      value={title}
      onChangeText={setTitle}
      />
      <TextInput
      style={styles.TextInput}
      placeholder="Content"
      value={content}
      onChangeText={setContent}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  button:{
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
});
