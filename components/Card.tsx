import { typography } from "@/assets/fonts/typography";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CustomCardProps {
  label: string;
  source: any;
  isSelected: boolean;
  onPress: () => void;
}

export function CustomCard({
  label,
  source,
  isSelected,
  onPress,
}: CustomCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      <Image source={source} style={styles.image} contentFit="contain" />
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 140,
    backgroundColor: Colors.container,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.container
  },
  selectedCard: {
    borderColor: Colors.semi_bad,
  },
  image: {
    width: 80,
    height: 80,
  },
  cardText: {
    ...typography.footer_bold,
    color: Colors.white,
  },
});
