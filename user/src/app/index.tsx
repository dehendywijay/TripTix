import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Search, Bell, MapPin, SlidersHorizontal, User } from "lucide-react-native";
import DestinasiCard from "../components/DestinasiCard";
import KategoriList from "../components/KategoriList";
import { destinations, categories } from "../data/destinations";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedKategori, setSelectedKategori] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategoryObj = categories.find(c => c.id === selectedKategori);

  const filteredDestinations = destinations.filter((item) => {
    const matchesKategori =
      selectedKategori === "1" || item.category === selectedCategoryObj?.name;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKategori && matchesSearch;
  });

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <View>
          <View className="flex-row items-center">
            <MapPin size={14} color="#0ea5e9" />
            <Text className="text-slate-500 text-xs ml-1 font-medium">Lokasi Anda</Text>
          </View>
          <Text className="text-lg font-bold text-slate-900">Jakarta, Indonesia</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100 shadow-sm"
            onPress={() => router.push("/profile")}
          >
            <User size={20} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100 shadow-sm">
            <Bell size={20} color="#1e293b" />
            <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Welcome Text */}
        <View className="px-6 mt-4">
          <Text className="text-3xl font-bold text-slate-900 leading-tight">
            Jelajahi Keindahan{"\n"}
            <Text className="text-primary">Destinasi Lokal</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-6 mt-6">
          <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <Search size={20} color="#94a3b8" />
            <TextInput
              placeholder="Cari destinasi impianmu..."
              className="ml-2 flex-1 text-slate-900 text-base"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories */}
        <View className="mt-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-slate-900">Kategori</Text>
            <TouchableOpacity onPress={() => router.push("/category/1")}>
              <Text className="text-primary font-semibold">Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <KategoriList
            selectedId={selectedKategori}
            onSelect={(id) => {
              setSelectedKategori(id);
              router.push(`/category/${id}`);
            }}
          />
        </View>

        {/* Popular Destinations */}
        <View className="px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-slate-900">Populer Untukmu</Text>
          </View>

          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((item) => (
              <DestinasiCard key={item.id} destination={item} />
            ))
          ) : (
            <View className="py-10 items-center justify-center">
              <Text className="text-slate-400">Destinasi tidak ditemukan</Text>
            </View>
          )}
        </View>

        {/* Padding bottom for scroll */}
        <View className="h-10" />
      </ScrollView>

    </SafeAreaView>
  );
}
