import React from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import { Heart } from "lucide-react-native";

export default function FavoriteScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      <View className="px-6 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-900">Favorite</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="w-20 h-20 bg-slate-50 rounded-full items-center justify-center mb-4">
          <Heart size={36} color="#e2e8f0" />
        </View>
        <Text className="text-slate-700 text-lg font-semibold mb-2">Belum ada favorit</Text>
        <Text className="text-slate-400 text-sm text-center">
          Tap ikon hati pada destinasi untuk menyimpannya di sini.
        </Text>
      </View>
    </SafeAreaView>
  );
}
