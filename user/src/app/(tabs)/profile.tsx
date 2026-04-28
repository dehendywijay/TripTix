import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { User, Settings, CreditCard, Heart, LogOut, ChevronRight } from "lucide-react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: User, label: "Edit Profil", color: "#3b82f6" },
    { icon: CreditCard, label: "Metode Pembayaran", color: "#10b981" },
    { icon: Heart, label: "Wishlist Saya", color: "#f43f5e" },
    { icon: Settings, label: "Pengaturan Akun", color: "#64748b" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-slate-900">Profil</Text>
      </View>

      <ScrollView className="flex-1 pt-6" showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View className="px-6 items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm mb-4 overflow-hidden items-center justify-center">
            {/* Using a placeholder avatar since we don't have one */}
            <User size={40} color="#94a3b8" />
          </View>
          <Text className="text-2xl font-bold text-slate-900 mb-1">Pengguna TripTix</Text>
          <Text className="text-slate-500">user@triptix.com</Text>

          <TouchableOpacity
            className="mt-4 px-6 py-2 bg-slate-100 rounded-full"
            onPress={() => router.push("/auth/login")}
          >
            <Text className="text-slate-700 font-semibold">Ubah Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="px-6 flex-row justify-between mb-8">
          <View className="bg-white flex-1 p-4 rounded-2xl items-center border border-slate-100 shadow-sm mr-2">
            <Text className="text-2xl font-bold text-primary mb-1">12</Text>
            <Text className="text-slate-500 text-xs text-center">Destinasi Dikunjungi</Text>
          </View>
          <View className="bg-white flex-1 p-4 rounded-2xl items-center border border-slate-100 shadow-sm ml-2">
            <Text className="text-2xl font-bold text-secondary mb-1">5</Text>
            <Text className="text-slate-500 text-xs text-center">Ulasan Diberikan</Text>
          </View>
        </View>

        {/* Menu */}
        <View className="bg-white px-6 py-2 border-y border-slate-100">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center justify-between py-4 ${index !== menuItems.length - 1 ? "border-b border-slate-50" : ""
                  }`}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                    <Icon size={20} color={item.color} />
                  </View>
                  <Text className="text-slate-700 font-medium text-base ml-3">{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <View className="px-6 py-8 pb-20">
          <TouchableOpacity className="bg-red-50 py-4 rounded-2xl flex-row items-center justify-center">
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Keluar Akun</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
