import { Colors } from "@/constants/theme";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Header";

export function Screen({
  children,
  variant,
  title,
  showBack,
}: {
  children: React.ReactNode;
  variant: "auth" | "main";
  title?: string;
  showBack?: boolean;
}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <Header variant={variant} title={title} showBack={showBack} />
        <View style={styles.bg}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
    margin: 0,
    padding: 0,
  },
  bg: {
    flex: 1,
    marginHorizontal: 40,
  },
});
