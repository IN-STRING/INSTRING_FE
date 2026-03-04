import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/assets/fonts/typography";

interface HeaderProps {
  variant?: "main" | "auth";
  title?: string;
  showBack?: boolean;
}

export const Header = ({ variant, title, showBack }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 48) : 50;

  return (
    <>
      <View
        style={[
          styles.container,
          variant === "main" && styles.mainHeader,
          variant === "auth" && styles.authHeader,
          { height: 38 + STATUS_BAR_HEIGHT, paddingTop: 8},
        ]}
      >
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="chevron-back" size={26} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          <Image
            source={require("@/assets/images/header.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.right} />
      </View>
      {
        title && (
          <View style={styles.titleBox}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", 
    paddingHorizontal: 26,
    // backgroundColor: Colors.error
  },

  mainHeader: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.sub_title,
    
  },

  authHeader: {
    backgroundColor: Colors.background,
  },

  left: {
    width: 40,
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    width: 40,
  },
  titleBox: {
    paddingTop: 25,
    marginHorizontal: 34,
  },
  title: {
    ...typography.bold,
    color: Colors.white,
  },
  logo: {
    width: 116,
    height: 42,
    resizeMode: "contain",
  },
});

