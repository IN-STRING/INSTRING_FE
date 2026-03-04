import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { Screen } from "@/components/Screen";
import { SubmitButton } from "@/components/Button";
import { typography } from "@/assets/fonts/typography";
import { Image } from "expo-image";

/**
 * Render the survey completion screen with a success illustration and a call-to-action button.
 *
 * The displayed button labeled "시작하기" navigates to the app's root route when pressed.
 *
 * @returns The JSX element for the survey success screen.
 */
export default function Success() {
  const handleNext = () => {
    router.replace("/");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>설문에 참여해주셔서 감사해요!</Text>
        <Text style={styles.subtitle}>
          저희의 서비스를 마음껏 이용해주세요!
        </Text>

        <View style={styles.wrapper}>
          <Image
            source={require("@/assets/images/survey/success.svg")}
            style={styles.image}
            contentFit="contain"
          />
        </View>

        <SubmitButton label="시작하기" onPress={handleNext} />
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
