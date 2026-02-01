import { Colors } from "@/constants/theme";
import { typography } from "@/assets/fonts/typography";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  title: string;
}

export default function CustomInput({
  placeholder,
  title,
  style,
  ...props
}: CustomInputProps) {
  return (
    <View style={styles.form}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.sub_title}
        style={[styles.input, style]}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 40,
    backgroundColor: Colors.middle,
  },
  text: {
    ...typography.footer_bold,
    color: Colors.white,
  },
  input: {
    ...typography.album_title,
    backgroundColor: Colors.semi_bad,
    color: Colors.white,
    borderColor: Colors.white,
    borderBottomWidth: 1,
    padding: 0,
    paddingVertical: 10,
  },
});
