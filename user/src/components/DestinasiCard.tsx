import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Star, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Destination } from "../data/destinations";

interface DestinasiCardProps {
  destination: Destination;
  horizontal?: boolean;
}

export default function DestinasiCard({ destination, horizontal }: DestinasiCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/details/${destination.id}`)}
      className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-4 ${horizontal ? "w-72 mr-4" : "w-full"
        }`}
    >
      <View className="relative">
        <Image
          source={{ uri: destination.image }}
          className="w-full h-48"
          contentFit="cover"
          transition={500}
        />
        <View className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex-row items-center">
          <Star size={14} color="#f59e0b" fill="#f59e0b" />
          <Text className="text-xs font-bold ml-1">{destination.rating}</Text>
        </View>
        <View className="absolute bottom-3 left-3 bg-primary/90 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-medium">{destination.category}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-1">
          <Text className="text-lg font-bold text-slate-900 flex-1" numberOfLines={1}>
            {destination.name}
          </Text>
          <Text className="text-primary font-bold">
            Rp {destination.price.toLocaleString("id-ID")}
          </Text>
        </View>

        <View className="flex-row items-center">
          <MapPin size={14} color="#64748b" />
          <Text className="text-slate-500 text-sm ml-1" numberOfLines={1}>
            {destination.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
