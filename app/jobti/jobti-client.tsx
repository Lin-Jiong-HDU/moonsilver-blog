"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  CAREERS,
  DIMENSIONS,
  QUESTIONS,
  type Career,
  type DimensionId,
} from "@/app/jobti/jobti-data";
import { calculateAssessment } from "@/app/jobti/jobti-engine";

const panelClass =
  "rounded-[32px] border border-white/10 bg-[rgba(8,14,32,0.78)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-2xl";

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function getDimensionById(id: DimensionId) {
  return DIMENSIONS.find((dimension) => dimension.id === id);
}

function getCareerById(id: string) {
  return CAREERS.find((career) => career.id === id);
}

export function JobtiClient() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    Array.from({ length: QUESTIONS.length }, () => -1),
  );
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const completed = answers.every((answer) => answer >= 0);
  const answeredCount = answers.filter((answer) => answer >= 0).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const assessment = completed ? calculateAssessment(answers) : null;
  const activeCareer: Career | undefined = assessment
    ? getCareerById(selectedCareerId ?? assessment.matches[0]?.career.id ?? "")
    : undefined;

  function handleStart() {
    setHasStarted(true);
    setCurrentQuestionIndex(0);
  }

  function handleRestart() {
    setHasStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedCareerId(null);
    setAnswers(Array.from({ length: QUESTIONS.length }, () => -1));
  }

  function handleBack() {
    if (currentQuestionIndex === 0) {
      setHasStarted(false);
      return;
    }

    setCurrentQuestionIndex((current) => Math.max(0, current - 1));
  }

  function handleSelect(optionIndex: number) {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestionIndex] = optionIndex;

    startTransition(() => {
      setAnswers(nextAnswers);

      if (currentQuestionIndex === QUESTIONS.length - 1) {
        const result = calculateAssessment(nextAnswers);
        setSelectedCareerId(result.matches[0]?.career.id ?? null);
        setCurrentQuestionIndex(QUESTIONS.length);
        return;
      }

      setCurrentQuestionIndex((current) => current + 1);
    });
  }

  if (!hasStarted) {
    return (
      <div className="flex flex-1 flex-col gap-8 pb-20 pt-8 sm:gap-10 sm:pb-24 sm:pt-14">
        <section className={`relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12 ${panelClass}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(125,231,255,0.16),transparent_26%),radial-gradient(circle_at_88%_16%,rgba(247,140,255,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_56%)]"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)] shadow-[0_0_18px_rgba(125,231,255,0.9)]" />
                Jobti Career Mapping
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
                  不是性格贴标签，
                  <br />
                  是岗位偏好测绘。
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                  这版把题库改成 24 道场景题，用 8 个能力维度去区分 12 类岗位。重点不在“你好不好”，而在“你更可能在哪种工作结构里发挥得更稳定”。
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#081122] transition-transform hover:-translate-y-0.5"
                >
                  开始测绘
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/22 hover:bg-white/10"
                >
                  返回导航站
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="font-mono text-xs tracking-[0.26em] text-[var(--accent-strong)]">
                    24Q
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    不再问空泛倾向，全部换成更像真实工作的场景题。
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="font-mono text-xs tracking-[0.26em] text-[var(--accent-strong)]">
                    12R
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    扩展到产品、技术、设计、运营、销售、咨询等常见岗位。
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="font-mono text-xs tracking-[0.26em] text-[var(--accent-strong)]">
                    8D
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    用分析、系统、执行、沟通、影响、创意、打磨、应变来拉开差异。
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/18 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                  This version focuses on
                </p>
                <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted-strong)]">
                  <p>更真实的工作场景，而不是空泛偏好。</p>
                  <p>更像“能力轮廓 + 岗位节奏匹配”，而不是单一性格结论。</p>
                  <p>更强调区分度，尽量避免所有人都掉进同一种结果。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!completed && currentQuestionIndex < QUESTIONS.length) {
    const question = QUESTIONS[currentQuestionIndex];
    const currentAnswer = answers[currentQuestionIndex];

    return (
      <div className="flex flex-1 flex-col gap-6 pb-20 pt-8 sm:gap-8 sm:pb-24 sm:pt-14">
        <section className={`relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8 ${panelClass}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(125,231,255,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(247,140,255,0.14),transparent_26%)]"
          />

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center self-start rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-colors hover:border-white/22 hover:bg-white/10"
              >
                {currentQuestionIndex === 0 ? "返回介绍" : "上一题"}
              </button>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  <span>{question.theme}</span>
                  <span>
                    {currentQuestionIndex + 1} / {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7de7ff,#8c82ff,#f78cff)] transition-[width] duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="space-y-5">
                <p className="font-mono text-xs tracking-[0.28em] text-[var(--accent-strong)]">
                  Q{String(currentQuestionIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="font-serif text-4xl leading-[1] tracking-[-0.05em] text-white sm:text-5xl">
                  {question.prompt}
                </h2>
                <p className="max-w-xl text-base leading-8 text-[var(--muted-strong)]">
                  {question.detail}
                </p>
                <div className="rounded-[24px] border border-white/10 bg-black/18 px-5 py-4 text-sm leading-7 text-[var(--muted)]">
                  没有标准答案。尽量选“你真实会先怎么做”，而不是“你觉得应该怎么做”。
                </div>
              </div>

              <div className="grid gap-3">
                {question.options.map((option, index) => {
                  const selected = currentAnswer === index;

                  return (
                    <button
                      key={option.title}
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={`group rounded-[24px] border px-5 py-5 text-left transition-all duration-200 ${
                        selected
                          ? "border-[rgba(125,231,255,0.55)] bg-[rgba(125,231,255,0.12)]"
                          : "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.07]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-black/20 text-xs font-medium text-[var(--accent-strong)]">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <div className="space-y-2">
                          <p className="text-base font-medium text-white">
                            {option.title}
                          </p>
                          <p className="text-sm leading-7 text-[var(--muted)]">
                            {option.detail}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <p className="text-center text-sm text-[var(--muted)]">
          {isPending ? "正在切到下一题..." : "选择后会自动进入下一题。"}
        </p>
      </div>
    );
  }

  if (!assessment || !activeCareer) {
    return null;
  }

  const topStrengths = assessment.topDimensions
    .map((dimensionId) => getDimensionById(dimensionId))
    .filter(isDefined);
  const growthAreas = assessment.bottomDimensions
    .map((dimensionId) => getDimensionById(dimensionId))
    .filter(isDefined);

  return (
    <div className="flex flex-1 flex-col gap-6 pb-20 pt-8 sm:gap-8 sm:pb-24 sm:pt-14">
      <section className={`relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10 ${panelClass}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(125,231,255,0.16),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(247,140,255,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_58%)]"
        />

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)] shadow-[0_0_18px_rgba(125,231,255,0.9)]" />
            Result Snapshot
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.26em] text-[var(--muted)]">
                {assessment.profile.label}
              </p>
              <h1 className="font-serif text-4xl leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl">
                最匹配的方向是
                <br />
                {assessment.matches[0].career.name}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                {assessment.profile.summary} {assessment.profile.workStyle}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/18 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                Top match
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
                {assessment.matches[0].score}%
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                {assessment.matches[0].reason}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className={`p-6 sm:p-7 ${panelClass}`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            岗位匹配
          </p>
          <div className="mt-5 space-y-3">
            {assessment.matches.slice(0, 6).map((match, index) => {
              const isActive = activeCareer.id === match.career.id;

              return (
                <button
                  key={match.career.id}
                  type="button"
                  onClick={() => setSelectedCareerId(match.career.id)}
                  className={`w-full rounded-[24px] border px-5 py-4 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[rgba(125,231,255,0.5)] bg-[rgba(125,231,255,0.12)]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/18 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs tracking-[0.24em] text-[var(--accent-strong)]">
                      0{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-white">
                        {match.career.name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {match.career.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-white">
                        {match.score}%
                      </p>
                      <p className="text-xs text-[var(--muted)]">fit</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`p-6 sm:p-7 ${panelClass}`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            当前查看
          </p>
          <div className="mt-4 space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                {activeCareer.category}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
                {activeCareer.name}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
                {activeCareer.summary}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                {activeCareer.fitSignal}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  适合的工作环境
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {activeCareer.environment}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  你的匹配原因
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {
                    assessment.matches.find((match) => match.career.id === activeCareer.id)
                      ?.reason
                  }
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  这个岗位常用到
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeCareer.goodAt.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  进入后要留意
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeCareer.watchOut.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[var(--muted-strong)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`p-6 sm:p-7 ${panelClass}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              能力轮廓
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
              你的强弱项分布
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            这里看的不是“绝对能力值”，而是你在一组工作偏好里的相对发力点和短板。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {DIMENSIONS.map((dimension) => {
            const score = assessment.normalizedScores[dimension.id];
            const isTop = assessment.topDimensions.includes(dimension.id);
            const isBottom = assessment.bottomDimensions.includes(dimension.id);

            return (
              <article
                key={dimension.id}
                className={`rounded-[24px] border p-5 ${
                  isTop
                    ? "border-white/18 bg-white/[0.07]"
                    : "border-white/10 bg-black/18"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dimension.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{dimension.label}</p>
                    <p className="text-xs text-[var(--muted)]">{dimension.description}</p>
                  </div>
                  <span className="text-sm font-medium text-white">{score}</span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{
                      width: `${score}%`,
                      background: `linear-gradient(90deg, ${dimension.color}, rgba(255,255,255,0.95))`,
                    }}
                  />
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                  {isBottom ? dimension.growthTip : dimension.strongSignal}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={`p-6 sm:p-7 ${panelClass}`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            你的发力点
          </p>
          <div className="mt-5 space-y-4">
            {topStrengths.map((dimension) => (
              <div
                key={dimension.id}
                className="rounded-[24px] border border-white/10 bg-black/18 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dimension.emoji}</span>
                  <p className="text-base font-medium text-white">
                    {dimension.label}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {dimension.strongSignal}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 sm:p-7 ${panelClass}`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            可以刻意补一补
          </p>
          <div className="mt-5 space-y-4">
            {growthAreas.map((dimension) => (
              <div
                key={dimension.id}
                className="rounded-[24px] border border-white/10 bg-black/18 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dimension.emoji}</span>
                  <p className="text-base font-medium text-white">
                    {dimension.label}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {dimension.growthTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${panelClass}`}>
        <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
          这份结果更适合拿来做职业方向筛选和自我观察，不建议把它当成唯一决策依据。最好的用法，是把前 2 到 3 个高匹配岗位拿去对照真实 JD、真实项目和真实工作节奏。
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#081122] transition-transform hover:-translate-y-0.5"
          >
            重新测一次
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/22 hover:bg-white/10"
          >
            返回导航站
          </Link>
        </div>
      </section>
    </div>
  );
}
