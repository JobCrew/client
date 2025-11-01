import styles from "./login.module.css";
import Image from "next/image";

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <main className={styles.container}>
        <div className={styles.box}>
          <div className={styles.logo}>
            <div className={styles.logoBox}>
              <p>
                <span className={styles.logoJob}>Job</span>
                <br />
                <span className={styles.logoCrew}>Crew</span>
              </p>
            </div>
            <h1>로그인</h1>
          </div>
          <div className={styles.socialLogin}>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}
              className={`${styles.loginBtn} ${styles.google}`}
            >
              <Image
                src="/icons/google.svg"
                alt="구글 로고"
                width={15}
                height={15}
              />
              <span>google로 시작하기</span>
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}
              className={`${styles.loginBtn} ${styles.kakao}`}
            >
              <Image
                src="/icons/kakao.svg"
                alt="카카오 로고"
                width={15}
                height={15}
              />
              <span>카카오로 시작하기</span>
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`}
              className={`${styles.loginBtn} ${styles.naver}`}
            >
              <Image
                src="/icons/naver.svg"
                alt="네이버 로고"
                width={15}
                height={15}
              />
              <span>네이버로 시작하기</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
