import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { getToken } from "@/services/authStorage";
import { Colors } from "@/constants/theme";

export default function Splash() {
  useEffect(() => {
    const check = async () => {
      await new Promise(r => setTimeout(r, 1000));

      const token = await getToken();
      router.replace(token ? "/(tabs)" : "/(auth)/login");
    }

    check()
  }, []);

  return (
    <View
      style={styles.container}
    >
      <Image
        source={require("@/assets/images/header.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
  image: {
    width: 250, 
    height: 250
  }
})