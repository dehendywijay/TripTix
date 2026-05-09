import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Home, Backpack, Plus, Heart, User } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";

const CORAL = "#FF6B5B";
const ACTIVE = "#1e293b";
const INACTIVE = "#94a3b8";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const mainTabs = ["/", "/tickets", "/favorite", "/profile"];
  if (!mainTabs.includes(pathname)) return null;

  return (
    <View style={styles.wrapper}>
      {/* FAB center button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/category/1")}
          activeOpacity={0.85}
        >
          <Plus size={28} color="white" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Nav bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.navItem}>
          <Home size={22} color={pathname === "/" ? ACTIVE : INACTIVE} strokeWidth={pathname === "/" ? 2.5 : 2} />
          <Text style={[styles.navText, pathname === "/" && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/tickets")} style={styles.navItem}>
          <Backpack size={22} color={pathname === "/tickets" ? ACTIVE : INACTIVE} strokeWidth={pathname === "/tickets" ? 2.5 : 2} />
          <Text style={[styles.navText, pathname === "/tickets" && styles.navTextActive]}>My Trip</Text>
        </TouchableOpacity>

        {/* Spacer for FAB */}
        <View style={styles.fabSpacer} />

        <TouchableOpacity onPress={() => router.push("/favorite")} style={styles.navItem}>
          <Heart size={22} color={pathname === "/favorite" ? ACTIVE : INACTIVE} strokeWidth={pathname === "/favorite" ? 2.5 : 2} />
          <Text style={[styles.navText, pathname === "/favorite" && styles.navTextActive]}>Favorite</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.navItem}>
          <User size={22} color={pathname === "/profile" ? ACTIVE : INACTIVE} strokeWidth={pathname === "/profile" ? 2.5 : 2} />
          <Text style={[styles.navText, pathname === "/profile" && styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    height: 90,
    alignItems: "center",
    zIndex: 9999,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  fabContainer: {
    position: "absolute",
    top: 0,
    zIndex: 10000,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6B5B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B5B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  fabSpacer: {
    flex: 1,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: "#94a3b8",
    fontWeight: "500",
  },
  navTextActive: {
    color: "#1e293b",
    fontWeight: "700",
  },
});

export default BottomNav;
