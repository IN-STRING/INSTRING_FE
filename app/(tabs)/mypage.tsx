import { Screen } from "@/components/Screen";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function MypageScreen() {
  return (
    <Screen variant="main">
      <Text style={styles.text}>마이페이지 입니다</Text>
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
