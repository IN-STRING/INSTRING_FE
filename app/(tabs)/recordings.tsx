import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

/**
 * Displays the Recordings screen.
 *
 * @returns A React element rendering the Recordings screen UI.
 */
export default function RecordingsScreen() {
  return (
    <Screen variant="main">
      <Text style={styles.text}>녹음페이지 입니다</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 24,
    marginTop: 100,
  },
});
