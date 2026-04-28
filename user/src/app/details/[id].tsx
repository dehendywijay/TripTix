import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Clock,
  CircleCheck,
} from "lucide-react-native";
import { destinations } from "../../data/destinations";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) return null;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      
      {/* Hero Image Section */}
      <View className="relative h-[450px]">
        <Image
          source={{ uri: destination.image }}
          className="w-full h-full"
          contentFit="cover"
        />
        <View className="absolute top-0 left-0 right-0 h-32 bg-black/20" />
        
        {/* Top Navigation */}
        <SafeAreaView className="absolute top-0 left-0 right-0">
          <View className="px-6 py-4 flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-12 h-12 bg-white/20 rounded-full items-center justify-center backdrop-blur-md"
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center backdrop-blur-md">
              <Heart size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Floating Category Badge */}
        <View className="absolute bottom-6 left-6 bg-primary px-4 py-2 rounded-full shadow-lg">
          <Text className="text-white font-bold">{destination.category}</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 -mt-10 bg-white rounded-t-[40px] px-6 pt-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Rating */}
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-4">
            <Text className="text-3xl font-bold text-slate-900">{destination.name}</Text>
            <View className="flex-row items-center mt-2">
              <MapPin size={16} color="#64748b" />
              <Text className="text-slate-500 ml-1">{destination.location}</Text>
            </View>
          </View>
          <View className="bg-slate-50 p-3 rounded-2xl items-center border border-slate-100">
            <View className="flex-row items-center mb-1">
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-lg font-bold ml-1">{destination.rating}</Text>
            </View>
            <Text className="text-slate-400 text-xs">{destination.reviews} Reviews</Text>
          </View>
        </View>

        {/* Info Grid */}
        <View className="flex-row justify-between mt-8 py-4 border-y border-slate-50">
          <View className="items-center flex-1">
            <View className="w-10 h-10 bg-sky-50 rounded-full items-center justify-center mb-2">
              <Clock size={20} color="#0ea5e9" />
            </View>
            <Text className="text-slate-400 text-xs">Durasi</Text>
            <Text className="text-slate-900 font-bold">4-6 Jam</Text>
          </View>
          <View className="items-center flex-1 border-x border-slate-50">
            <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mb-2">
              <CircleCheck size={20} color="#10b981" />
            </View>
            <Text className="text-slate-400 text-xs">Akses</Text>
            <Text className="text-slate-900 font-bold">Mudah</Text>
          </View>
          <View className="items-center flex-1">
            <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mb-2">
              <Star size={20} color="#f59e0b" />
            </View>
            <Text className="text-slate-400 text-xs">Jenis</Text>
            <Text className="text-slate-900 font-bold">Outdoor</Text>
          </View>
        </View>

        {/* Description */}
        <View className="mt-8">
          <Text className="text-xl font-bold text-slate-900 mb-3">Tentang Destinasi</Text>
          <Text className="text-slate-500 leading-6 text-base">
            {destination.description} Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>

        {/* Amenities / Includes (Static for UI) */}
        <View className="mt-8">
          <Text className="text-xl font-bold text-slate-900 mb-4">Yang Kamu Dapatkan</Text>
          <View className="flex-row flex-wrap gap-3">
            {["Tiket Masuk", "Pemandu Wisata", "Asuransi Perjalanan", "Air Mineral"].map(
              (item, i) => (
                <View
                  key={i}
                  className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"
                >
                  <Text className="text-slate-600 font-medium">{item}</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Bottom Padding */}
        <View className="h-32" />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-6 flex-row justify-between items-center shadow-2xl">
        <View>
          <Text className="text-slate-400 text-sm">Harga Mulai Dari</Text>
          <Text className="text-2xl font-bold text-primary">
            Rp {destination.price.toLocaleString("id-ID")}
          </Text>
        </View>
        <TouchableOpacity 
          className="bg-primary px-10 py-4 rounded-2xl shadow-lg shadow-primary/30"
          onPress={() => router.push(`/checkout/${destination.id}`)}
        >
          <Text className="text-white font-bold text-lg">Pesan Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
