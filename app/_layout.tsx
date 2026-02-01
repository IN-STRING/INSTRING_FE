import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

const MyTheme = {
  ...DarkTheme,
  // colors: {
  //   ...DarkTheme.colors,
  //   background: Colors.background,
  //   card: Colors.background,
  // },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <SafeAreaView style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        />
        <StatusBar style="light" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
