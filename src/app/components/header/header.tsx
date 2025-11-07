"use client";

import React from "react";
import Link from "next/link";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathName = usePathname();
  const isAuthPage = pathName === "/login" || pathName === "/signup";
  // 로그인 상태 관리
  const isLoggedIn = false;

  // 로고만 있는 헤더 반환(로그인, 회원가입 페이지)
  if (isAuthPage) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoJob}>Job</span>
            <span className={styles.logoCrew}>Crew</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoJob}>Job</span>
          <span className={styles.logoCrew}>Crew</span>
        </Link>

        <nav className={styles.nav}>
          {isLoggedIn ? (
            <>
              <Link href="/trend" className={styles.navLink}>
                트렌드 대시보드
              </Link>
              <Link href="/curriculum" className={styles.navLink}>
                커리큘럼 추천
              </Link>
              <Link href="/mypage" className={styles.navLink}>
                마이페이지
              </Link>
            </>
          ) : (
            // 로그아웃 상태
            <>
              <Link href="/login" className={styles.navLink}>
                로그인
              </Link>
              <Link href="/signup" className={styles.navLink}>
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
