"use client"

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  DollarSign,
} from "lucide-react-native";
import { useWisatabyId } from "@/hook/wisata/useWisataById";



export default function DestinationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const {wisata, loading, error, refetch} = useWisatabyId(id as string);
  console.log( wisata?.Fotos?.[2]?.url);


  const shortDesc = wisata?.deskripsi.slice(0, 100);
  const isLong = (wisata?.deskripsi?.length ?? 0) > 100;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Hero Image */}
      <View className="relative h-[380px]">
        <Image
          source={{ uri:  wisata?.Fotos?.[2]?.url }}
          className="w-full h-full rounded-b-[36px]"
          contentFit="cover"
        />
        <View className="absolute top-0 left-0 right-0 h-28 bg-black/25 rounded-b-none" />

        {/* Top Navigation */}
        <View className="absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 bg-black/30 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className="w-11 h-11 bg-black/30 rounded-full items-center justify-center"
            >
              <Heart
                size={22}
                color="white"
                fill={isFavorite ? "white" : "transparent"}
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-11 h-11 bg-black/30 rounded-full items-center justify-center">
              <Share2 size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-6 pt-6">
          {/* Title */}
          <Text className="text-3xl font-bold text-slate-900">{wisata?.nama}</Text>

          {/* Rating + Distance */}
          <View className="flex-row items-center mt-2 flex-wrap gap-x-3">
            <View className="flex-row items-center">
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-slate-700 font-semibold ml-1">
                5
              </Text>
              <Text className="text-slate-400 ml-1 text-sm">(Google Reviews)</Text>
            </View>
            {/* {destination.distance && (
              <View className="flex-row items-center">
                <Text className="text-slate-300 mr-2">•</Text>
                <Text className="text-slate-500 text-sm">
                  📏 {destination.distance}
                </Text>
              </View>
            )} */}
          </View>

          {/* Description */}
          <View className="mt-5">
            <Text className="text-slate-500 leading-6 text-base">
              {expanded || !isLong ? wisata?.deskripsi : shortDesc + "..."}
            </Text>
            {isLong && (
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text className="text-primary font-semibold mt-1">
                  {expanded ? "Show less" : "Read more..."}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Location */}
          <View className="mt-6 flex-row items-start">
            <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center mr-3 mt-0.5">
              <MapPin size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-xs mb-0.5">Lokasi</Text>
              <Text className="text-slate-900 font-semibold">{wisata?.alamat}</Text>
            </View>
          </View>

          {/* Price */}
          <View className="mt-4 flex-row items-start">
            <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center mr-3 mt-0.5">
              <DollarSign size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-xs mb-0.5">Harga Tiket</Text>
              <Text className="text-slate-900 font-semibold">
                {wisata?.harga === 0
                  ? "Gratis"
                  : `Rp ${wisata?.harga.toLocaleString("id-ID")}`}
              </Text>
              {(wisata?.harga ?? 0) > 0 && (
                <Text className="text-slate-400 text-xs">per orang • IDR</Text>
              )}
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            className="bg-primary mt-8 py-4 rounded-2xl items-center shadow-lg"
            style={{ shadowColor: "#FF6B5B", shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}
            onPress={() => router.push(`/checkout/${wisata?.ID}`)}
          >
            <Text className="text-white font-bold text-lg">Mulai Perjalanan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
