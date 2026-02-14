import { typography } from "@/assets/fonts/typography";
import { SubmitButton } from "@/components/Button";
import { Screen } from "@/components/screen";
import CustomInput from "@/components/TextInput";
import { Colors } from "@/constants/theme";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ResetPasswordStep2Screen() {
  const router = useRouter();

  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validate: (values) => {
      const errors: any = {}

      // if (!values.email) errors.email = "아이디를 8자 이상으로 작성해 주세요"
      if (!PASSWORD_REGEX.test(values.password)) errors.password = "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다"

      // if (!values.passwordConfirm) errors.passwordConfirm = "비밀번호 재확인 필수"
      if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "비밀번호가 다릅니다. 다시 입력해주세요"
      }

      return errors
    },
  });

  return (
    <Screen variant="auth" title="비밀번호 초기화" showBack >
      <View>
        <Text style={styles.text}>
          {`새롭게 사용할 비밀번호를 설정해주세요${"\n"}초기화를 원치 않는다면 뒤로가기를 눌러주세요`}
        </Text>
      </View>
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
          router.dismissAll()
          router.replace("/(auth)/reset-password/success")
        }} 
        disabled={(JSON.stringify(form.errors) !== '{}') || !form.values.password || !form.values.passwordConfirm ? true : false}
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
    ...typography.album_title,
    color: Colors.sub_title,
    paddingTop: 8,
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
