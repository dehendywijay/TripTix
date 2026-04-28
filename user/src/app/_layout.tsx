import { Stack } from "expo-router";
import { View } from "react-native";
import BottomNav from "../components/BottomNav";
import "../../global.css";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1, backgroundColor: '#f8fafc' }
        }}
      />
      <BottomNav />
    </View>
  );
}
