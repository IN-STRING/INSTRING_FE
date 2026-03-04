import { Screen } from "@/components/screen";
import { Success } from "@/components/Success";
import { router } from "expo-router";

export default function signUpSuccess() {
  return (
    <Screen>
      <Success
        description="계정 생성이 완료 되었습니다! INSTRING의 회원이 된것을 환영합니다!"
        buttonText="시작하기"
        onPress={() => router.replace("/(auth)/login")}
      />
    </Screen>
  );
}
