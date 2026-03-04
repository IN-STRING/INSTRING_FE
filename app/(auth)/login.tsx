import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, Button } from "react-native";
import { setToken, getToken } from "@/services/authStorage";
import { useRouter } from "expo-router";
import { Screen } from "@/components/screen";
import { Colors } from "@/constants/theme";
import CustomInput from "@/components/TextInput";
import { useForm } from "@/hooks/useForm";
import { typography } from "@/assets/fonts/typography";
import { AuthLinks } from "@/components/AuthLinks";
import { SubmitButton } from "@/components/Button";

export default function MypageScreen() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
    },
    validate: (values) => {
      const errors: any = {}

      if (!values.password) errors.password = "비밀번호 필수"
      if (!values.email) errors.email = "이메일 필수"

      return errors
    },
  });
  
  return (
    <Screen variant="auth" title="로그인" >
      <View style={styles.inputWrapper}>
        <CustomInput
          label="email"
          title="이메일"
          showError={form.errors && form.touched.email}
          error={form.errors.email}
          touched={form.touched.email}
          placeholder="이메일을 입력하세요"
          {...form.getTextInputProps("email")}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <CustomInput
          label="password"
          title="비밀번호"
          isPassword
          error={form.errors.password}
          touched={form.touched.password}
          placeholder="비밀번호를 입력하세요"
          {...form.getTextInputProps("password")}
          autoCapitalize="none"
          textContentType="password"
        />

        <AuthLinks />
        
        <SubmitButton 
          label="로그인"
          onPress={() =>
            form.handleSubmit(async () => {
              await setToken("1");
              router.replace("/");
            })
          } 
          disabled={!form.values.email || !form.values.password ? true : false}
        />
      </View>
    </Screen>
  );
}


const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    alignItems: "stretch", 
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
