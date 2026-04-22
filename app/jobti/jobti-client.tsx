"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  careerTypes,
  dimensions,
  getAbilityById,
  normalizedQuestions,
  systemOverview,
} from "@/app/jobti/jobti-data";
import { calculateJobtiResult, createEmptyAnswers } from "@/app/jobti/jobti-engine";

const answerOptions = [
  { value: 1, label: "左侧非常符合" },
  { value: 2, label: "左侧符合" },
  { value: 3, label: "无感" },
  { value: 4, label: "右侧符合" },
  { value: 5, label: "右侧非常符合" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <p className="text-xs tracking-widest text-white/15">© {new Date().getFullYear()}</p>
    </footer>
  );
}

export function JobtiClient() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(createEmptyAnswers);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const result = useMemo(() => calculateJobtiResult(answers), [answers]);
  const currentQuestion = normalizedQuestions[currentIndex];
  const currentValue = currentQuestion ? answers[currentIndex] : null;
  const answeredCount = answers.filter((value) => value !== null).length;
  const completed = answeredCount === normalizedQuestions.length;
  const activeMatch = result.jobs.find((match) => match.job.job_id === selectedJobId) ?? result.jobs[0] ?? null;

  function handleStart() {
    setStarted(true);
    setCurrentIndex(0);
  }

  function handleRestart() {
    setStarted(false);
    setCurrentIndex(0);
    setSelectedJobId(null);
    setAnswers(createEmptyAnswers());
  }

  function handleAnswer(value: number) {
    setAnswers((current) => {
      const next = [...current];
      next[currentIndex] = value;
      return next;
    });
  }

  function handlePrevious() {
    if (currentIndex === 0) {
      setStarted(false);
      return;
    }

    setCurrentIndex((value) => value - 1);
  }

  function handleNext() {
    if (currentValue === null) {
      return;
    }

    if (currentIndex < normalizedQuestions.length - 1) {
      setCurrentIndex((value) => value + 1);
    }
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-black pt-20 text-white">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <SectionLabel>Entertainment</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">Jobti</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
            一个放在网站娱乐区里的职业测绘小游戏。它会根据 80 道题、16 种职业画像和岗位向量，
            给出更细的类型结果与岗位匹配。
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Question Bank</p>
              <p className="mt-4 text-3xl font-semibold text-white">{normalizedQuestions.length}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/40">双向题，覆盖四个维度。</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Career Types</p>
              <p className="mt-4 text-3xl font-semibold text-white">{careerTypes.length}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/40">类型更细，不容易全落到同一种。</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">System</p>
              <p className="mt-4 text-3xl font-semibold text-white">V16</p>
              <p className="mt-2 text-sm leading-relaxed text-white/40">
                当前模块直接读取整套 JSON 数据，内容完整且可独立运行。
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {systemOverview.slice(0, 4).map((item) => (
              <div key={item.section} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <p className="text-sm font-medium text-white">{item.section}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/40">{item.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleStart}
              className="rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              开始体验
            </button>
            <Link
              href="/fun"
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
            >
              返回娱乐区
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {dimensions.map((dimension) => (
              <div key={dimension.dimension} className="rounded-2xl border border-white/8 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  {dimension.left_letter}/{dimension.right_letter}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {dimension.left_name_cn} / {dimension.right_name_cn}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  {dimension.left_description}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {dimension.right_description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (!completed && currentQuestion) {
    const dimensionMeta = dimensions.find((item) => item.dimension === currentQuestion.dimension);
    const progress = Math.round(((currentIndex + 1) / normalizedQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-black pt-20 text-white">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-12">
            <SectionLabel>Jobti</SectionLabel>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold md:text-5xl">
                  {currentIndex + 1} / {normalizedQuestions.length}
                </h1>
                <p className="mt-3 text-sm text-white/40">
                  {dimensionMeta?.left_name_cn} / {dimensionMeta?.right_name_cn}
                </p>
              </div>
              <p className="text-sm text-white/30">{progress}%</p>
            </div>
            <div className="mt-5 h-px bg-white/10">
              <div className="h-px bg-white" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">{currentQuestion.question_id}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/40">
              下面两种描述里，选择更接近你真实状态的一项。结果会在全部答完后统一生成。
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">Left</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{currentQuestion.left_text}</h2>
              </div>
              <div className="rounded-2xl border border-white/8 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">Right</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{currentQuestion.right_text}</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {answerOptions.map((option) => {
                const active = currentValue === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAnswer(option.value)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
                      active
                        ? "border-white/30 bg-white/[0.08] text-white"
                        : "border-white/8 bg-transparent text-white/50 hover:border-white/20 hover:text-white/80"
                    }`}
                  >
                    <span className="text-sm">{option.label}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                      {option.value}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                {currentIndex === 0 ? "返回介绍" : "上一题"}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentValue === null}
                className="rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {currentIndex === normalizedQuestions.length - 1 ? "查看结果" : "下一题"}
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionLabel>Result</SectionLabel>
        <div className="mt-4">
          <h1 className="text-4xl font-bold md:text-5xl">
            {result.careerType.career_code} · {result.careerType.type_name}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/40">
            {result.careerType.summary}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/30">
            {result.careerType.fit_scenes}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {result.dimensions.map((dimension) => (
            <div key={dimension.dimension} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">{dimension.dimension}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{dimension.normalized}</p>
              <p className="mt-2 text-sm text-white/40">
                {dimension.leftLetter} / {dimension.rightLetter}
              </p>
              <div className="mt-4 h-px bg-white/10">
                <div className="h-px bg-white" style={{ width: `${dimension.normalized}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Matches</SectionLabel>
            <div className="mt-6 space-y-3">
              {result.jobs.map((match, index) => {
                const active = activeMatch?.job.job_id === match.job.job_id;

                return (
                  <button
                    key={match.job.job_id}
                    type="button"
                    onClick={() => setSelectedJobId(match.job.job_id)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-colors ${
                      active
                        ? "border-white/25 bg-white/[0.04]"
                        : "border-white/8 bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-base font-medium text-white">{match.job.job_display_name}</p>
                        <p className="mt-1 text-sm text-white/40">
                          {match.job.job_family} · {match.job.career_stage}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-white">{match.fitScore}</p>
                        <p className="text-xs text-white/30">fit</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <SectionLabel>Detail</SectionLabel>
            <div className="mt-6 rounded-3xl border border-white/8 bg-white/[0.02] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">{activeMatch?.job.domain}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">{activeMatch?.job.job_display_name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/40">{activeMatch?.job.job_summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/30">{activeMatch?.job.family_desc}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">Core Abilities</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(activeMatch?.job.coreAbilityIds ?? []).map((abilityId) => (
                      <span
                        key={abilityId}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                      >
                        {getAbilityById(abilityId)?.ability_name ?? abilityId}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">Education Hint</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/40">
                    {activeMatch?.job.education_hint}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">Profile</p>
                  <div className="mt-4 space-y-2 text-sm text-white/40">
                    <p>阶段：{activeMatch?.job.career_stage}</p>
                    <p>主代码：{activeMatch?.job.primary_code}</p>
                    <p>领域：{activeMatch?.job.domain}</p>
                    <p>匹配分：{activeMatch?.fitScore}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">Why It Fits</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/40">
                    你的结果代码是 {result.careerType.career_code}，当前岗位主代码是{" "}
                    {activeMatch?.job.primary_code}。匹配分同时参考了类型代码、四维向量距离和岗位排序权重。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionLabel>Abilities</SectionLabel>
            <div className="mt-6 space-y-3">
              {result.topAbilities.map((ability) => (
                <div key={ability.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-medium text-white">{ability.name}</p>
                    <span className="text-sm text-white/30">× {ability.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Type Map</SectionLabel>
            <div className="mt-6 space-y-3">
              {careerTypes.map((type) => (
                <div
                  key={type.career_code}
                  className={`rounded-2xl border px-5 py-4 ${
                    type.career_code === result.careerType.career_code
                      ? "border-white/25 bg-white/[0.04]"
                      : "border-white/8 bg-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/30">{type.career_code}</p>
                      <p className="mt-2 text-base font-medium text-white">{type.type_name}</p>
                    </div>
                    <span className="text-sm text-white/30">{type.job_count_primary}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/40">{type.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            再测一次
          </button>
          <Link
            href="/fun"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            返回娱乐区
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
