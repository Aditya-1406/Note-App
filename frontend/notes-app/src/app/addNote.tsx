import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import API from "../../services/api";

export default function addNote() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const add = async () => {
    try {

      await API.post("notes/", {
        title: title,
        content: content
      });

      router.back(); // go back to notes list

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Enter Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Enter Content"
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button
        title="Save Note"
        onPress={add}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6
  }

});