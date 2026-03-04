import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { CustomOption } from "@/components/Option";
import { useSurveyStore, LevelType } from "@/stores/useSurveyStore";
import { SubmitButton } from "@/components/Button";
import { typography } from "@/assets/fonts/typography";
import { Screen } from "@/components/screen";

export default function Level() {
  const level = useSurveyStore(state => state.survey.level);
  const setSurvey = useSurveyStore(state => state.setSurvey);

  const handleSelect = (value: LevelType) => {
    setSurvey({ level: value });
  };

  const handleNext = () => {
    router.push("/(survey)/strings");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>당신의 실력 수준을 알려주세요</Text>
        <Text style={styles.subtitle}>실력에 따라 수준에 맞는 곡 추천</Text>

        <View style={styles.wrapper}>
          <CustomOption 
            title="입문"
            subTitle="기타 1년차 이하에요"
            isSelected={level === "Beginner"}
            onPress={()=>handleSelect("Beginner")}
          />
          <CustomOption 
            title="초급"
            subTitle="기타 1년차 이상이에요"
            isSelected={level === "LowerIntermed"}
            onPress={()=>handleSelect("LowerIntermed")}
          />
          <CustomOption 
            title="중급"
            subTitle="기타 2년차 이상이에요"
            isSelected={level === "Intermediate"}
            onPress={()=>handleSelect("Intermediate")}
          />
          <CustomOption 
            title="고급"
            subTitle="기타 4년차 이상이에요"
            isSelected={level === "Advance"}
            onPress={()=>handleSelect("Advance")}
          />
          <CustomOption 
            title="전문가"
            subTitle="기타 8년차 이상이에요"
            isSelected={level === "Professional"}
            onPress={()=>handleSelect("Professional")}
          />
        </View>

        <SubmitButton
          label="선택하기"
          onPress={handleNext} 
          disabled={!level}
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
