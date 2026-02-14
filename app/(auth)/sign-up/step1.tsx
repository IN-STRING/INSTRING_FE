import { typography } from "@/assets/fonts/typography";
import { SubmitButton } from "@/components/Button";
import { Screen } from "@/components/screen";
import CustomInput from "@/components/TextInput";
import { Colors } from "@/constants/theme";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SignUpStep1Screen() {
  const router = useRouter();

  const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const form = useForm({
    initialValues: {
      email: "",
      verify: "",
    },
    validate: (values) => {
      const errors: any = {}

      if (!values.email || !EMAIL_REGEX.test(values.email)) {errors.email = "올바른 이메일 형식이 아닙니다"}
      // if (!values.verify) {errors.verify = "인증번호를 입력해주세요"}

      return errors
    },
  });

  return (
    <Screen variant="auth" title="회원가입" showBack >
      <View>
        <Text style={styles.text}>
          {`입력하신 이메일은 추후에 ${"\n"}로그인, 비밀번호 찾기에 사용됩니다.`}
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <CustomInput
          label="email"
          title="이메일"
          isSend
          showError={!!form.errors.email && form.touched.email}
          error={form.errors.email}
          touched={form.touched.email}
          placeholder="이메일을 입력하세요"
          {...form.getTextInputProps("email")}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <CustomInput
          label="verify"
          title="인증번호"
          showError={!form.values.verify && form.touched.verify}
          error={form.errors.verify}
          touched={form.touched.verify}
          placeholder="이메일을 먼저 입력해주세요"
          {...form.getTextInputProps("verify")}
          autoCapitalize="none"
          keyboardType="numeric"
        />
      </View>
      <SubmitButton 
        label="다음 단계"
        onPress={() => {
          router.push("/(auth)/sign-up/step2");
        }} 
        disabled={(JSON.stringify(form.errors) !== '{}') || !form.values.email || !form.values.verify ? true : false}
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


