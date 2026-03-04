import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { InstrumentType, useSurveyStore } from "@/stores/useSurveyStore";
import { Screen } from "@/components/screen";
import { SubmitButton } from "@/components/Button";
import { typography } from "@/assets/fonts/typography";
import { CustomCard } from "@/components/Card";

export const INSTRUMENTS = {
  acoustic: "통기타",
  electric: "일렉기타",
  classic: "클래식기타",
  bass: "베이스기타",
} as const;

const INSTRUMENT_IMAGES = {
  acoustic: require("@/assets/images/survey/acoustic.svg"),
  electric: require("@/assets/images/survey/electric.svg"),
  classic: require("@/assets/images/survey/classic.svg"), 
  bass: require("@/assets/images/survey/bass.svg"),
} as const;

export default function Instrument() {
  const instrument = useSurveyStore(state => state.survey.instrument);
  const setSurvey = useSurveyStore(state => state.setSurvey);

  const handleSelect = (value: InstrumentType) => {
    setSurvey({ instrument: value });
  };

  const handleNext = () => {
    router.push("/(survey)/level");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>사용하는 악기를 선택해주세요</Text>
        <Text style={styles.subtitle}>관리를 할 악기를 선택해주세요</Text>

        <View style={styles.wrapper}>
          <View style={styles.row}>
            <CustomCard 
              label={INSTRUMENTS.acoustic}
              source={INSTRUMENT_IMAGES.acoustic}
              isSelected={instrument === "acoustic"}
              onPress={() => handleSelect("acoustic")}
            />
            <CustomCard 
              label={INSTRUMENTS.electric}
              source={INSTRUMENT_IMAGES.electric}
              isSelected={instrument === "electric"}
              onPress={() => handleSelect("electric")}
            />
          </View>
          <View style={styles.row}>
            <CustomCard 
              label={INSTRUMENTS.classic}
              source={INSTRUMENT_IMAGES.classic}
              isSelected={instrument === "classic"}
              onPress={() => handleSelect("classic")}
            />
            <CustomCard 
              label={INSTRUMENTS.bass}
              source={INSTRUMENT_IMAGES.bass}
              isSelected={instrument === "bass"}
              onPress={() => handleSelect("bass")}
            />
          </View>
        </View>

        <SubmitButton
          label="선택하기"
          onPress={handleNext} 
          disabled={!instrument}
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
    marginBottom: 60,
  },
  wrapper: {
    alignItems: "center",
    gap: 40,
    marginBottom: 60,
  },
  row: {
    flexDirection: "row",
    gap: 40,
    justifyContent: "center",
  },
});
