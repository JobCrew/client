"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import { ChevronDown } from "lucide-react";

export default function Signup() {
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

  const jobTags = [
    "프론트엔드",
    "백엔드",
    "데이터 사이언스",
    "AI/ML",
    "DevOps",
    "모바일",
    "게임 개발",
    "솔루션개발",
    "보안",
    "클라우드",
  ];
  const skillTags = [
    "Java",
    "Python",
    "C",
    "C#",
    "DevOps",
    "모바일",
    "게임 개발",
    "블록체인",
    "보안",
    "클라우드",
  ];

  return (
    <div className={styles.signupPage}>
      <main className={styles.container}>
        <div className={styles.box}>
          <h1>회원가입</h1>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" placeholder="이름" />
              </div>
              <div className={styles.inputItem}>
                <label htmlFor="nickname">
                  닉네임 <span>*</span>
                </label>
                <input type="text" id="nickname" placeholder="닉네임" />
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
                />
              </div>
              <div className={styles.inputItem}>
                <label>
                  성별 <span>*</span>
                </label>
                <div className={styles.radioGroup}>
                  <input type="radio" id="male" name="gender" value="남" />
                  <label htmlFor="male">남</label>
                  <input type="radio" id="female" name="gender" value="여" />
                  <label htmlFor="female">여</label>
                </div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <label htmlFor="region">거주 지역</label>
                <input type="text" id="name" placeholder="예: 서울특별시" />
              </div>
              <div className={styles.inputItem}>
                <label htmlFor="education">
                  학력 <span>*</span>
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="education"
                    className={styles.selectField}
                    defaultValue=""
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
                  <input type="radio" id="major" name="major" value="전공" />
                  <label htmlFor="major">전공</label>
                  <input
                    type="radio"
                    id="nonMajor"
                    name="major"
                    value="비전공"
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
                    value="신입"
                  />
                  <label htmlFor="newbie">신입</label>
                  <input
                    type="radio"
                    id="experienced"
                    name="experience"
                    value="경력"
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
