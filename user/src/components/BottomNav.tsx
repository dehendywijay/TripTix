import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { Home, Ticket, Heart, User } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Tampilan di tab utama agar posisi tetap solid
  const mainTabs = ["/", "/tickets", "/profile"];
  if (!mainTabs.includes(pathname)) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={styles.navItem}
      >
        <Home size={24} color={pathname === "/" ? "#0ea5e9" : "#94a3b8"} />
        <Text style={[styles.navText, pathname === "/" && styles.navTextActive]}>
          Beranda
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/tickets")}
        style={styles.navItem}
      >
        <Ticket size={24} color={pathname === "/tickets" ? "#0ea5e9" : "#94a3b8"} />
        <Text style={[styles.navText, pathname === "/tickets" && styles.navTextActive]}>
          Tiket
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { }}
        style={styles.navItem}
      >
        <Heart size={24} color={pathname === "/wishlist" ? "#0ea5e9" : "#94a3b8"} />
        <Text style={[styles.navText, pathname === "/wishlist" && styles.navTextActive]}>
          Simpan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/profile")}
        style={styles.navItem}
      >
        <User size={24} color={pathname === "/profile" ? "#0ea5e9" : "#94a3b8"} />
        <Text style={[styles.navText, pathname === "/profile" && styles.navTextActive]}>
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Elevation for Android
    elevation: 15,
    // Border for visibility
    borderWidth: 1,
    borderColor: '#f1f5f9',
    zIndex: 9999,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#94a3b8',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#0ea5e9',
    fontWeight: '700',
  }
});

export default BottomNav;
