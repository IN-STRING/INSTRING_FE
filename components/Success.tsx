import { Image, StyleSheet, Text, View } from "react-native";
import { SubmitButton } from "./Button";
import { Colors } from "@/constants/theme";
import { typography } from "@/assets/fonts/typography";

interface SuccessProps {
  description: string;
  buttonText: string;
  onPress: () => void;
}

export function Success({
  description,
  buttonText,
  onPress,
}: SuccessProps) {
  return (
    <View style={styles.container}>
      <View style={styles.start}>
        <Image
          source={require("@/assets/images/check_circle.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton label={buttonText} onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  start: {
    paddingVertical: 93,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    ...typography.bold,
    color: Colors.white,
  },
  buttonContainer: {
    flex: 1,
  }
})