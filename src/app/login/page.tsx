import styles from "./login.module.css";

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
              <span>google로 시작하기</span>
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}
              className={`${styles.loginBtn} ${styles.kakao}`}
            >
              <span>카카오로 시작하기</span>
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`}
              className={`${styles.loginBtn} ${styles.naver}`}
            >
              <span>네이버로 시작하기</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
