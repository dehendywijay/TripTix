import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Mail, Lock, User, ArrowLeft } from "lucide-react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-8 pt-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center mb-8 border border-slate-100"
          >
            <ArrowLeft size={20} color="#0f172a" />
          </TouchableOpacity>

          <View className="mb-10">
            <Text className="text-4xl font-bold text-slate-900 mb-2">Buat Akun</Text>
            <Text className="text-slate-500 text-base">
              Mulai perjalanan luar biasamu dengan bergabung menjadi member TripTix.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4 mb-8">
             <View className="bg-slate-50 px-4 py-4 rounded-2xl flex-row items-center border border-slate-100 mb-4">
              <User size={20} color="#94a3b8" />
              <TextInput
                placeholder="Nama Lengkap"
                className="ml-3 flex-1 text-slate-900 text-base"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="bg-slate-50 px-4 py-4 rounded-2xl flex-row items-center border border-slate-100 mb-4">
              <Mail size={20} color="#94a3b8" />
              <TextInput
                placeholder="Email Address"
                className="ml-3 flex-1 text-slate-900 text-base"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="bg-slate-50 px-4 py-4 rounded-2xl flex-row items-center border border-slate-100 mb-6">
              <Lock size={20} color="#94a3b8" />
              <TextInput
                placeholder="Password"
                className="ml-3 flex-1 text-slate-900 text-base"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            className="bg-primary w-full py-4 rounded-2xl items-center shadow-lg shadow-primary/30"
            onPress={() => router.push("/")}
          >
            <Text className="text-white font-bold text-lg">Daftar Sekarang</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-slate-500">Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary font-bold">Masuk di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
