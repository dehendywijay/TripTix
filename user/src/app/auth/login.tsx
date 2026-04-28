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
import { Mail, Lock, ArrowRight } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-8 pt-20">
          <View className="mb-12">
            <Text className="text-4xl font-bold text-slate-900 mb-2">Selamat Datang</Text>
            <Text className="text-slate-500 text-base">
              Masuk untuk melanjutkan eksplorasi destinasi liburan impianmu bersama TripTix.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4 mb-8">
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

            <View className="bg-slate-50 px-4 py-4 rounded-2xl flex-row items-center border border-slate-100">
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

            <TouchableOpacity className="items-end mt-4">
              <Text className="text-primary font-semibold">Lupa Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            className="bg-primary w-full py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary/30"
            onPress={() => router.push("/")}
          >
            <Text className="text-white font-bold text-lg mr-2">Masuk Sekarang</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-slate-500">Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text className="text-primary font-bold">Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
