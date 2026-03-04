import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { CustomOption } from "@/components/Option";
import { useSurveyStore, stringsType } from "@/stores/useSurveyStore";
import { SubmitButton } from "@/components/Button";
import { typography } from "@/assets/fonts/typography";
import { Screen } from "@/components/screen";

export default function Strings() {
  const strings = useSurveyStore(state => state.survey.strings);
  const setSurvey = useSurveyStore(state => state.setSurvey);

  const handleSelect = (value: stringsType) => {
    setSurvey({ strings: value });
  };

  const handleNext = () => {
    router.push("/(survey)/success");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>당신이 사용하는 줄을 알려주세요</Text>
        <Text style={styles.subtitle}>줄 선택에 따라 변경주기 변경</Text>

        <View style={styles.wrapper}>
          <CustomOption 
            title="코팅줄"
            subTitle="엘릭서, 마틴, 옵티웹등"
            isSelected={strings === "coating"}
            onPress={()=>handleSelect("coating")}
          />
          <CustomOption 
            title="일반줄"
            subTitle="코팅줄이 아닌 모든 줄"
            isSelected={strings === "normal"}
            onPress={()=>handleSelect("normal")}
          />
        </View>

        <SubmitButton
          label="선택하기"
          onPress={handleNext} 
          disabled={!strings}
        />
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
    marginBottom: 52,
  },
  wrapper: {
    alignItems: "center",
    gap: 16,
    marginBottom: 60,
  },
  option: {
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: Colors.container,
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: Colors.container,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  nextText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
