"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [education, setEducation] = useState("");
  const [major, setMajor] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // 희망 직무 태그
  const toggleJobTag = (tag: string) => {
    const MAX_JOBS = 3;
    setSelectedJobs((prev) => {
      // 이미 선택된 태그인 경우 제거
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      // 새로 선택하는 경우 개수 제한 검사
      if (prev.length >= MAX_JOBS) {
        console.log(`직무는 최대 ${MAX_JOBS}개까지 선택 가능합니다.`);
        return prev;
      }
      // 제한에 걸리지 않으면 새 태그 추가
      return [...prev, tag];
    });
  };

  // 관심 키워드 태그
  const toggleSkillTag = (tag: string) => {
    const MAX_SKILLS = 15;
    setSelectedSkills((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      if (prev.length >= MAX_SKILLS) {
        console.log(`키워드는 최대 ${MAX_SKILLS}개까지 선택 가능합니다.`);
        return prev;
      }
      return [...prev, tag];
    });
  };

  // API 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    // API 페이로드 생성
    const payload = {
      username: nickname,
      age: age,
      gender: gender,
      majorType: major,
      educationLevel: education,
      careerType: experience,
      avatarUrl: null,
      interestJobs: selectedJobs,
      region: region || null,
      skill: selectedSkills,
    };

    // 필수 필드 검증
    if (
      !nickname ||
      !age ||
      !gender ||
      !education ||
      !major ||
      !experience ||
      selectedJobs.length === 0
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    console.log("payload", payload);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`;
      await axios.post(
        apiUrl, // API 엔드포인트
        payload, // 전송할 데이터 (JSON)
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        },
      );
      // 성공 시
      console.log("회원가입이 완료되었습니다!");
      router.push("/mypage");
    } catch (err) {
      // 실패 시
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage =
          err.response.data?.message || err.response.data || err.message;
        console.log(`회원가입 실패: ${errorMessage}`);
      } else if (err instanceof Error) {
        console.log(`서버 응답 없음: ${err.message}`);
      } else {
        console.log("오류 발생");
      }
    }
  };

  const jobTags = [
    "프론트엔드 개발자",
    "백엔드 개발자",
    "풀스택 개발자",
    "모바일 개발자",
    "DevOps 엔지니어",
    "데이터 엔지니어",
    "AI/ML 엔지니어",
  ];
  const skillTags = [
    // ===== 언어(Language) =====
    "PYTHON", "JAVA", "C", "C++", "JAVASCRIPT", "TYPESCRIPT", "SQL", "KOTLIN", "GO", "RUST", "RUBY_ON_RAILS", "PHP",

    // ===== 데이터베이스(Database) =====
    "MYSQL", "POSTGRESQL", "MONGODB", "ORACLE_DB", "FIREBASE_REALTIME_DB",

    // ===== 프론트엔드(Frontend) =====
    "HTML", "CSS_SCSS", "REACT", "VUE", "NEXT_JS", "NUXT_JS", "ANGULAR",

    // ===== 인프라 / DevOps =====
    "GIT", "GITHUB", "GITLAB", "DOCKER", "KUBERNETES", "AWS", "GCP", "AZURE",
    "JENKINS", "GITHUB_ACTIONS",

    // ===== 백엔드(Backend) =====
    "SPRING", "SPRING_BOOT", "DJANGO", "FLASK", "EXPRESS", "NESTJS", "FASTAPI",

    // ===== 테스트 & 기타 =====
    "JUNIT", "PYTEST", "JEST", "CYPRESS", "SELENIUM", "K6",

    // ===== 백엔드 심화 =====
    "REST_API", "GRAPHQL", "JWT", "OAUTH2", "MICROSERVICE", "CLEAN_ARCHITECTURE", "DDD",
    "ELASTICSEARCH", "KIBANA", "LOGSTASH", "REDIS",

    // ===== 인프라 / 운영 =====
    "CICD", "TERRAFORM", "ANSIBLE", "PROMETHEUS", "GRAFANA", "ELK", "CLOUD_NATIVE",

    // ===== 프론트엔드 심화 =====
    "REDUX", "ZUSTAND", "RECOIL", "PINIA", "SSR", "SSG", "SEO", "UX_UI", "RESPONSIVE_WEB", "ACCESSIBILITY",

    // ===== 일반 / CS =====
    "DATA_STRUCTURE", "ALGORITHM", "OPERATING_SYSTEM", "NETWORK", 'DATABASE_DESIGN', "DESIGN_PATTERN",

    // ===== 데이터 & AI =====
    "HADOOP", "SPARK", "MACHINE_LEARNING", "DEEP_LEARNING", "DATA_VISUALIZATION", "D3_JS", "CHART_JS",
    "OPENAI_API", "HUGGINGFACE", "BIGDATA",
  ];

  return (
    <div className={styles.signupPage}>
      <main className={styles.container}>
        <div className={styles.box}>
          <h1>회원가입</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className={styles.inputItem}>
                <label htmlFor="nickname">
                  닉네임 <span>*</span>
                </label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <label htmlFor="age">
                  나이 <span>*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  placeholder="나이"
                  min="1"
                  max="150"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputItem}>
                <label>
                  성별 <span>*</span>
                </label>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male">남</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female">여</label>
                </div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <label htmlFor="region">거주 지역</label>
                <input
                  type="text"
                  id="region"
                  placeholder="예: 서울특별시"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  autoComplete="address-level1"
                />
              </div>
              <div className={styles.inputItem}>
                <label htmlFor="education">
                  학력 <span>*</span>
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="education"
                    className={styles.selectField}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      학력 선택
                    </option>
                    <option value="high_school">고졸</option>
                    <option value="associate">초대졸</option>
                    <option value="bachelor">대졸</option>
                    <option value="master">석사</option>
                    <option value="doctorate">박사</option>
                  </select>
                  <ChevronDown className={styles.selectIcon} size={20} />
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <label>
                  전공 <span>*</span>
                </label>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    id="major"
                    name="major"
                    value="major"
                    checked={major === "major"}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                  <label htmlFor="major">전공</label>
                  <input
                    type="radio"
                    id="nonMajor"
                    name="major"
                    value="nonMajor"
                    checked={major === "nonMajor"}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                  <label htmlFor="nonMajor">비전공</label>
                </div>
              </div>
              <div className={styles.inputItem}>
                <label>
                  경력 <span>*</span>
                </label>
                <div className={styles.radioGroup}>
                  <input
                    type="radio"
                    id="newbie"
                    name="experience"
                    value="new"
                    checked={experience === "new"}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <label htmlFor="newbie">신입</label>
                  <input
                    type="radio"
                    id="experienced"
                    name="experience"
                    value="experienced"
                    checked={experience === "experienced"}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <label htmlFor="experienced">경력</label>
                </div>
              </div>
            </div>

            {/* 희망 직무 선택 */}
            <div className={styles.tagSection}>
              <label>
                희망 직무 (최대 3개) <span>*</span>
              </label>
              <div className={styles.tagContainer}>
                {jobTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleJobTag(tag)}
                    className={`${styles.tagButton} ${selectedJobs.includes(tag) ? styles.active : ""}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 관심 키워드 선택 */}
            <div className={styles.tagSection}>
              <label>관심 키워드 (최대 15개)</label>
              <div className={styles.tagContainer}>
                {skillTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleSkillTag(tag)}
                    className={`${styles.tagButton} ${selectedSkills.includes(tag) ? styles.active : ""}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              회원가입
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
