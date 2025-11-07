"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OAuthRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    const isProfileCompleted = searchParams.get("isProfileCompleted");

    const provider = searchParams.get("provider");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (provider) {
        localStorage.setItem("provider", provider);
      }
      if (isProfileCompleted == "false") {
        router.push("/signup");
      } else {
        router.push("/mypage");
      }
    } else {
      alert("로그인 실패");
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div>
      <p>로그인 중...</p>
    </div>
  );
}
