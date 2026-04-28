import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { QrCode, MapPin, CalendarDays } from "lucide-react-native";
import { destinations } from "../data/destinations";

export default function TicketsScreen() {
  const [activeTab, setActiveTab] = useState("Aktif");
  const sampleTicket = destinations[0];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-900">Tiket Saya</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 pt-4 pb-2">
        {["Aktif", "Riwayat"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`mr-4 pb-2 border-b-2 ${
              activeTab === tab ? "border-primary" : "border-transparent"
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === tab ? "text-primary" : "text-slate-400"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1 px-6 pt-4">
        <ScrollView 
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          alwaysBounceVertical={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {activeTab === "Aktif" ? (
            <View className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
              <View className="relative h-32">
                <Image
                  source={{ uri: sampleTicket.image }}
                  className="w-full h-full"
                  contentFit="cover"
                />
                <View className="absolute inset-0 bg-black/30 justify-center items-center">
                  <Text className="text-white font-bold text-xl">{sampleTicket.name}</Text>
                </View>
              </View>

              <View className="p-5 relative">
                <View className="flex-row justify-between mb-4">
                  <View>
                    <Text className="text-slate-400 text-xs mb-1">Tanggal</Text>
                    <View className="flex-row items-center">
                      <CalendarDays size={14} color="#64748b" />
                      <Text className="text-slate-700 font-medium ml-1">Besok, 08:00</Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-slate-400 text-xs mb-1">Jumlah</Text>
                    <Text className="text-slate-700 font-medium text-right">2 Orang</Text>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-slate-400 text-xs mb-1">Lokasi</Text>
                  <View className="flex-row items-center">
                    <MapPin size={14} color="#64748b" />
                    <Text className="text-slate-700 font-medium ml-1">{sampleTicket.location}</Text>
                  </View>
                </View>

                <View className="border-t border-dashed border-slate-200 pt-5 mt-2 flex-row items-center justify-between">
                  <View>
                    <Text className="text-slate-400 text-xs mb-1">ID Pesanan</Text>
                    <Text className="text-slate-900 font-bold">TRX-82910</Text>
                  </View>
                  <TouchableOpacity className="bg-primary/10 px-4 py-2 rounded-xl flex-row items-center">
                    <QrCode size={16} color="#0ea5e9" />
                    <Text className="text-primary font-bold ml-2">Lihat QR</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Ticket cutouts for realistic effect */}
                <View className="absolute left-[-10px] bottom-[70px] w-5 h-5 bg-background rounded-full" />
                <View className="absolute right-[-10px] bottom-[70px] w-5 h-5 bg-background rounded-full" />
              </View>
            </View>
          ) : (
            <View className="py-20 items-center justify-center">
              <Text className="text-slate-400">Belum ada riwayat perjalanan.</Text>
            </View>
          )}
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}
