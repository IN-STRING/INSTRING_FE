import { getToken, setToken, removeToken } from "@/services/authStorage";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Text, View, Button } from "react-native";
import { Screen } from "@/components/screen";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <Screen variant="main">
      <Text style={styles.text}>메인페이지 입니다</Text>
      <Button
        title="토큰 테스트"
        onPress={async () => {
          // 서버에서 토큰 받아와야됨
          await setToken("abc");
          const t = await getToken();
          console.log("저장된 토큰:", t);
        }}
      />
      <Button
        title="토큰 지우기"
        onPress={async () => {
          await removeToken();
          const t = await getToken();
          console.log("저장된 토큰:", t);
          router.replace("/(auth)/login");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 24,
    marginTop: 100,
  },
});
