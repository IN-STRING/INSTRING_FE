import { Screen } from "@/components/screen";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function SearchScreen() {
  return (
    <Screen variant="main">
      <Text style={styles.text}>검색페이지 입니다</Text>
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
