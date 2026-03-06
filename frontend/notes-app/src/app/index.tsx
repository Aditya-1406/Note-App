import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Index() {

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get("notes/");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />

    </View>
  );
}