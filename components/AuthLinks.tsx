import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/theme";
import { typography } from "@/assets/fonts/typography";
import { useRouter } from "expo-router";

export function AuthLinks() {
  const router = useRouter();

  return (
    <>
    <View style={styles.container}>
      <View style={styles.side}>
        <TouchableOpacity onPress={() => router.push("/(auth)/reset-password/step1")}>
          <Text style={[styles.text, { textAlign: 'right' }]}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.side}>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-up/step1")}>
          <Text style={[styles.text, { textAlign: 'left' }]}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    width: "100%",
  },
  side: {
    flex: 1,
    paddingHorizontal: 15,
  },
  text: {
    // ...typography.album_title,
    color: Colors.white,
  },
  afterElement: {
    width: 1, 
    height: 20,
    backgroundColor: Colors.white
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.white,
  },
});
