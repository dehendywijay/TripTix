import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { MapPin, Star, Users } from "lucide-react-native";
import { RecentTrip } from "../data/destinations";

interface RecentTripCardProps {
  trip: RecentTrip;
}

export default function RecentTripCard({ trip }: RecentTripCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-3 flex-row overflow-hidden"
    >
      <Image
        source={{ uri: trip.image }}
        className="w-24 h-24"
        contentFit="cover"
        transition={300}
      />
      <View className="flex-1 px-3 py-2 justify-between">
        <View className="flex-row items-center justify-between">
          <View className="bg-green-100 px-2 py-0.5 rounded-full">
            <Text className="text-green-700 text-xs font-semibold">{trip.status}</Text>
          </View>
          <Text className="text-slate-400 text-xs">{trip.date}</Text>
        </View>
        <Text className="text-slate-900 font-bold text-base" numberOfLines={1}>
          {trip.name}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <MapPin size={12} color="#94a3b8" />
            <Text className="text-slate-400 text-xs ml-1" numberOfLines={1}>
              {trip.location.split(",")[0]}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Star size={12} color="#f59e0b" fill="#f59e0b" />
            <Text className="text-slate-600 text-xs ml-1">{trip.rating}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Users size={12} color="#94a3b8" />
            <Text className="text-slate-400 text-xs ml-1">{trip.people} Orang</Text>
          </View>
          <Text className="text-primary text-xs font-bold">
            Rp {trip.price.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
