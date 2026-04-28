import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../data/destinations";
import * as Icons from "lucide-react-native";

interface KategoriListProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function KategoriList({ selectedId, onSelect }: KategoriListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
    >
      {categories.map((item) => {
        const isSelected = selectedId === item.id;
        // @ts-ignore
        const IconComponent = Icons[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)] || Icons.Circle;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelect(item.id)}
            className={`mr-3 px-5 py-3 rounded-2xl flex-row items-center border ${
              isSelected ? "bg-primary border-primary" : "bg-white border-slate-100"
            }`}
          >
            <IconComponent size={18} color={isSelected ? "white" : "#64748b"} />
            <Text
              className={`ml-2 font-medium ${
                isSelected ? "text-white" : "text-slate-600"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
