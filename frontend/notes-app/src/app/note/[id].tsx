import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function NoteDetail() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNote = async () => {
    try {
      const res = await API.get(`notes/${id}/`);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const updateNote = async () => {
    try {
      await API.put(`notes/${id}/`, {
        title,
        content
      });
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async () => {
    try {
      await API.delete(`notes/${id}/`);
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (

    <View style={styles.container}>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="Update Note" onPress={updateNote} />

      <Button title="Delete Note" onPress={deleteNote} color="red" />

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