import { typography } from "@/assets/fonts/typography";
import { SubmitButton } from "@/components/Button";
import { Screen } from "@/components/Screen";
import CustomInput from "@/components/TextInput";
import { Colors } from "@/constants/theme";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

/**
 * Renders the second step of the sign-up flow where the user sets and confirms their password.
 *
 * Validates that the password is at least 8 characters long and includes a letter, a digit, and a special character, and ensures the confirmation matches; submission is disabled until validation passes. On successful submission the navigation stack is dismissed and the user is taken to the sign-up success screen.
 *
 * @returns A React element representing the sign-up step 2 screen.
 */
export default function SignUpStep2Screen() {
  const router = useRouter();

  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validate: (values) => {
      const errors: any = {};

      // if (!values.email) errors.email = "아이디를 8자 이상으로 작성해 주세요"
      if (!PASSWORD_REGEX.test(values.password))
        errors.password = "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다";

      // if (!values.passwordConfirm) errors.passwordConfirm = "비밀번호 재확인 필수"
      if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "비밀번호가 다릅니다. 다시 입력해주세요";
      }

      return errors;
    },
  });

  return (
    <Screen variant="auth" title="회원가입" showBack>
      <View style={styles.inputWrapper}>
        <CustomInput
          label="password"
          title="비밀번호"
          isPassword
          showError={!!form.errors.password && form.touched.password}
          error={form.errors.password}
          touched={form.touched.password}
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함, 8자 이상)"
          {...form.getTextInputProps("password")}
          autoCapitalize="none"
          textContentType="password"
        />

        <CustomInput
          label="password"
          title="비밀번호 재확인"
          isPassword
          showError={!!form.errors.passwordConfirm}
          error={form.errors.passwordConfirm}
          touched={form.touched.passwordConfirm}
          placeholder="비밀번호 확인"
          {...form.getTextInputProps("passwordConfirm")}
          autoCapitalize="none"
          textContentType="password"
        />
      </View>
      <SubmitButton
        label="회원가입"
        onPress={() => {
          router.dismissAll();
          router.replace("/(auth)/sign-up/success");
        }}
        disabled={
          JSON.stringify(form.errors) !== "{}" ||
          !form.values.password ||
          !form.values.passwordConfirm
            ? true
            : false
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 20,
    flex: 1,
    color: Colors.white,
    borderColor: Colors.white,
  },
  text: {
    ...typography.footer_bold,
    color: Colors.background,
  },
  warning: {
    backgroundColor: Colors.normal,
    ...typography.album_title,
    color: Colors.high,
  },
  input: {
    // color: Colors.white,
    // borderColor: Colors.white,
    // borderWidth: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // margin: 5,
  },
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
});
