import { View, Text, FlatList, TouchableOpacity,StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


export default function Index() {
   const router = useRouter();

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get("notes/");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
  useCallback(() => {
    fetchNotes();
  }, [])
);

  return (
    <View style={styles.container}>

      <FlatList 
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{marginBottom:15,borderBottomColor:"black",borderBottomWidth:3}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />

       <View style={{justifyContent:"flex-end",padding:20}} >
    <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/addNote")}
      >
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
    </View>

    </View>

     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },


  title: {
    fontSize: 18,
    fontWeight: "bold",
    
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});