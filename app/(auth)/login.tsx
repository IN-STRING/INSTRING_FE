import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, Button } from "react-native";
import { setToken, getToken } from "@/services/authStorage";
import { useRouter } from "expo-router";
import { Screen } from "@/components/screen";
import { Colors } from "@/constants/theme";
import CustomInput from "@/components/TextInput";
import { useForm } from "@/hooks/useForm";
import { typography } from "@/assets/fonts/typography";

export default function MypageScreen() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validate: values => {
      const errors: any = {}

      if (!values.username) errors.username = "아이디 필수"
      if (!values.password) errors.password = "비밀번호 필수"
      if (!values.email) errors.email = "이메일 필수"

      return errors
    },
  });

  return (
    <Screen variant="auth" title="로그인" showBack>
      <View style={styles.inputWrapper}>
        <CustomInput
          title="아이디"
          placeholder="아이디를 입력하세요"
          {...form.getTextInputProps("username")}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />
        {form.touched.username && form.errors.username && (
          <Text style={{ color: "red" }}>{form.errors.username}</Text>
        )}

        <CustomInput
          title="이메일"
          placeholder="이메일을 입력하세요"
          {...form.getTextInputProps("email")}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {form.touched.email && form.errors.email && (
          <Text style={{ color: "red" }}>{form.errors.email}</Text>
        )}

        <CustomInput
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          {...form.getTextInputProps("password")}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
        />
        {
          form.touched.password && form.errors.password ? (
            <Text style={styles.warning}>{form.errors.password}</Text>
          ) : null
        }
        <View style={{flex: 1, flexDirection: "row", backgroundColor: Colors.high}}>
          <Text style={{}}>아이디 찾기 </Text><Text>|</Text>
          <Text> 비밀번호 찾기 </Text><Text>|</Text>
          <Text> 회원가입</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() =>
            form.handleSubmit(async (values) => {
              await setToken("1");
              const t = await getToken();
              console.log("저장된 토큰:", t);
              router.replace("/(tabs)");
            })
          }
        >
          <Text style={styles.text}>로그인</Text>
        </TouchableOpacity>
      </View>

    </Screen>
  );
}


const styles = StyleSheet.create({
  inputWrapper: {
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
