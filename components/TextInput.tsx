import { Colors } from "@/constants/theme";
import { typography } from "@/assets/fonts/typography";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  title: string;
  value: string;
  error?: string;
  touched?: boolean;
  showError?: boolean;
  isSend?: boolean;
  isPassword?: boolean;
}

export default function CustomInput({
  placeholder,
  title,
  value,
  error,
  touched,
  showError,
  isSend = false,
  isPassword = false,
  style,
  ...props
}: CustomInputProps) {
  const [visible, setVisible] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  // console.log(error);
  // console.log(isSend);
  
  return (
    <>
      <View style={styles.form}>
        <Text style={styles.text}>{title}</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.sub_title}
          style={[styles.input, style]}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={isPassword && !visible}
          {...props}
        />
        {value && isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(a => !a)}
            style={styles.eyeButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name={visible ? "eye" : "eye-off"}
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        )}
        {value && isSend && (
          <TouchableOpacity
            style={styles.eyeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.text}>발송</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorBox}>
        {showError && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 22,
    // backgroundColor: Colors.middle,
  },
  text: {
    ...typography.footer_bold,
    color: Colors.white,
  },
  input: {
    ...typography.footer_medium,
    // backgroundColor: Colors.semi_bad,
    color: Colors.white,
    borderColor: Colors.white,
    borderBottomWidth: 1,
    padding: 0,
    paddingVertical: 10,
    paddingRight: 40,
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 10,
  },
  buttonText: {
    ...typography.footer_bold,
    color: Colors.white,
  },
  errorBox: {
    height: 18,
    marginTop: 4,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
  },
});
