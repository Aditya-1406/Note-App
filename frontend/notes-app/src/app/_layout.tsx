import { Stack } from "expo-router";

export default function RootLayout() {
  return (<Stack>
      <Stack.Screen
        name="index"
        options={{ title: "My Notes" }}
      />

      <Stack.Screen
        name="home"
        options={{ title: "All Notes" }}
      />
    </Stack>
  )
}
