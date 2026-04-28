import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Search, SlidersHorizontal, MapPin, Star } from "lucide-react-native";
import { destinations, categories } from "../../data/destinations";
import DestinasiCard from "../../components/DestinasiCard";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const category = categories.find((c) => c.id === id);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesCategory = category?.name === "Semua" || dest.category === category?.name;
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [id, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header Navigation */}
      <View className="px-6 py-4 flex-row items-center bg-white border-b border-slate-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 mr-3"
        >
          <ChevronLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 flex-1">
          {category ? category.name : "Kategori"}
        </Text>
      </View>

      {/* Search and Filter */}
      <View className="px-6 mt-6">
        <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <Search size={20} color="#94a3b8" />
          <TextInput
            placeholder="Cari di kategori ini..."
            className="ml-2 flex-1 text-slate-900 text-base"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Destinations List */}
      <View className="flex-1 mt-6">
        <ScrollView
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          alwaysBounceVertical={true}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-500 font-medium">
              Menampilkan {filteredDestinations.length} destinasi
            </Text>
          </View>

          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((item) => (
              <DestinasiCard key={item.id} destination={item} />
            ))
          ) : (
            <View className="py-20 items-center justify-center">
              <Text className="text-slate-400 text-lg">Tidak ada destinasi ditemukan</Text>
              <TouchableOpacity
                className="mt-4"
                onPress={() => setSearchQuery("")}
              >
                <Text className="text-primary font-bold">Hapus Pencarian</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
