import { Screen } from "@/components/screen";
import { Success } from "@/components/Success";
import { router } from "expo-router";

export default function resetPasswordSuccess() {
  return (
    <Screen variant="success">
      <Success
        description="비밀번호 초기화가 완료 되었습니다"
        buttonText="로그인하러 가기"
        onPress={() => router.replace("/login")}
      />
    </Screen>
  );
}
