import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { Screen } from "@/components/Screen";
import { SubmitButton } from "@/components/Button";
import { typography } from "@/assets/fonts/typography";
import { Image } from "expo-image";

/**
 * Renders the intro screen for the survey with a title, subtitle, illustration, and a start button.
 *
 * The start button navigates to the "/(survey)/instrument" route when pressed.
 *
 * @returns The React element for the intro survey screen.
 */
export default function Intro() {
  const handleNext = () => {
    router.push("/(survey)/instrument");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>INSTRING에 오신걸 환영해요!</Text>
        <Text style={styles.subtitle}>시작하기 전에 설문을 진행해 볼까요?</Text>

        <View style={styles.wrapper}>
          <Image
            source={require("@/assets/images/survey/survey.svg")}
            style={styles.image}
            contentFit="contain"
          />
        </View>

        <SubmitButton label="설문 시작하기" onPress={handleNext} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    ...typography.bold,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    ...typography.footer_bold,
    color: Colors.sub_title,
    textAlign: "center",
    marginBottom: 60,
  },
  wrapper: {
    alignItems: "center",
    gap: 40,
    marginBottom: 60,
  },
  image: {
    width: 221,
    height: 280,
  },
});
