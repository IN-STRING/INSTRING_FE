import { typography } from "@/assets/fonts/typography";
import { Colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SubmitButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function SubmitButton({
  label,
  onPress,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 45,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.footer_bold,
    color: Colors.background,
  },
});
