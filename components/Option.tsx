import { typography } from "@/assets/fonts/typography";
import { Colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CustomCardProps {
  title: string;
  subTitle: string;
  isSelected: boolean;
  onPress: () => void;
}

export function CustomOption({
  title,
  subTitle,
  isSelected,
  onPress,
}: CustomCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.option, isSelected && styles.optionSelected]}
      onPress={onPress}
    >
      <Text style={styles.optionText}>{title}</Text>
      <Text style={styles.optionSubText}>{subTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    width: 344,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 6,
    backgroundColor: Colors.container,
    flexDirection: "row",
    alignItems: "center",
    gap: 100,
    borderWidth: 2,
    borderColor: Colors.container
  },
  optionSelected: {
    borderColor: Colors.sub_title,
  },
  optionText: {
    ...typography.bold,
    color: Colors.white,
  },
  optionSubText: {
    ...typography.footer_bold,
    color: Colors.white,
  },
});
