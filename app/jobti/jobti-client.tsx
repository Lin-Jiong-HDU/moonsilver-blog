"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  abilities,
  careerTypes,
  dimensions,
  getAbilityById,
  normalizedQuestions,
  systemOverview,
  type DimensionMeta,
} from "@/app/jobti/jobti-data";
import { calculateJobtiResult, createEmptyAnswers, type JobtiResult } from "@/app/jobti/jobti-engine";

const panelClass =
  "rounded-[32px] border border-white/10 bg-[rgba(8,14,32,0.78)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-2xl";

function getDimensionMeta(dimensionCode: string) {
  return dimensions.find((item) => item.dimension === dimensionCode);
}

function getDimensionTitle(dimension: DimensionMeta) {
  return `${dimension.left_letter}${dimension.right_letter} 维度`;
}

export function JobtiClient() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(createEmptyAnswers);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const result = useMemo<JobtiResult>(() => calculateJobtiResult(answers), [answers]);
  const currentQuestion = normalizedQuestions[currentIndex];
  const currentValue = answers[currentIndex] ?? 3;
  const answeredCount = answers.filter((value) => value !== null).length;
  const completed = answeredCount === normalizedQuestions.length;
  const overallProgress = Math.round((answeredCount / normalizedQuestions.length) * 100);
  const currentDimensionQuestions = currentQuestion
    ? normalizedQuestions.filter((question) => question.dimension === currentQuestion.dimension)
    : [];
  const currentDimensionProgress = currentQuestion
    ? currentDimensionQuestions.findIndex(
        (question) => question.question_id === currentQuestion.question_id,
      ) + 1
    : 0;

  const activeMatch = useMemo(() => {
    if (!result.jobs.length) {
      return null;
    }

    if (!selectedJobId) {
      return result.jobs[0];
    }

    return result.jobs.find((match) => match.job.job_id === selectedJobId) ?? result.jobs[0];
  }, [result.jobs, selectedJobId]);

  const topType = result.careerType;

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

  function handleChange(value: number) {
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

    setCurrentIndex((value) => Math.max(0, value - 1));
  }

  function handleNext() {
    setAnswers((current) => {
      const next = [...current];
      if (next[currentIndex] === null) {
        next[currentIndex] = currentValue;
      }
      return next;
    });

    if (currentIndex < normalizedQuestions.length - 1) {
      setCurrentIndex((value) => value + 1);
    }
  }

  if (!started) {
    return (
      <div className="flex flex-1 flex-col gap-8 pb-20 pt-8 sm:gap-10 sm:pb-24 sm:pt-14">
        <section className={`relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12 ${panelClass}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(125,231,255,0.16),transparent_26%),radial-gradient(circle_at_88%_16%,rgba(247,140,255,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_56%)]"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)] shadow-[0_0_18px_rgba(125,231,255,0.9)]" />
                Jobti V16
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
                  80 题，16 型，1020 岗位。
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                  这套测绘直接读取你放进来的 V16 数据包，用双向题、能力库和岗位向量来生成更细的职业轮廓。
                  它会尽量把不同人的偏好拉开，让结果更像真实的工作风格，而不是千篇一律的同一类。
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
                  返回 Moonsilver 的小家
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="font-mono text-xs tracking-[0.26em] text-[var(--accent-strong)]">
                    {careerTypes.length}T
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    16 种职业画像，来自同一份数据包。
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="font-mono text-xs tracking-[0.26em] text-[var(--accent-strong)]">
                    {normalizedQuestions.length}Q
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    80 道双向题，覆盖四个核心维度。
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="font-mono text-xs tracking-[0.26em] text-[var(--accent-strong)]">
                    {abilities.length}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    144 项能力标签，用来补充结果解释。
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/18 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                  System Overview
                </p>
                <div className="mt-5 grid gap-3">
                  {systemOverview.slice(0, 4).map((item) => (
                    <div
                      key={item.section}
                      className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4"
                    >
                      <p className="text-sm font-medium text-white">{item.section}</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`grid gap-4 md:grid-cols-3 ${panelClass} p-6 sm:p-7`}>
          {dimensions.map((dimension) => (
            <div
              key={dimension.dimension}
              className="rounded-[24px] border border-white/10 bg-black/18 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                {getDimensionTitle(dimension)}
              </p>
              <h2 className="mt-3 text-xl font-medium text-white">
                {dimension.left_name_cn} / {dimension.right_name_cn}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                {dimension.left_description}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                {dimension.right_description}
              </p>
            </div>
          ))}
        </section>
      </div>
    );
  }

  if (!completed && currentQuestion) {
    const dimensionMeta = getDimensionMeta(currentQuestion.dimension);

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
                onClick={handlePrevious}
                className="inline-flex items-center self-start rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-colors hover:border-white/22 hover:bg-white/10"
              >
                {currentIndex === 0 ? "返回介绍" : "上一题"}
              </button>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  <span>
                    {dimensionMeta?.left_name_cn} · {currentDimensionProgress}/20
                  </span>
                  <span>
                    {currentIndex + 1} / {normalizedQuestions.length}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7de7ff,#8c82ff,#f78cff)] transition-[width] duration-300"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="space-y-5">
                <p className="font-mono text-xs tracking-[0.28em] text-[var(--accent-strong)]">
                  {currentQuestion.question_id}
                </p>
                <h2 className="font-serif text-4xl leading-[1] tracking-[-0.05em] text-white sm:text-5xl">
                  {currentQuestion.left_text}
                </h2>
                <p className="max-w-xl text-base leading-8 text-[var(--muted-strong)]">
                  {currentQuestion.right_text}
                </p>
                <div className="rounded-[24px] border border-white/10 bg-black/18 px-5 py-4 text-sm leading-7 text-[var(--muted)]">
                  {currentQuestion.recommended_scale}
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/18 px-5 py-4 text-sm leading-7 text-[var(--muted)]">
                  {currentQuestion.scoring_rule}
                </div>
              </div>

              <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{dimensionMeta?.left_name_cn}</span>
                  <span>{dimensionMeta?.right_name_cn}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={currentValue}
                  onChange={(event) => handleChange(Number(event.target.value))}
                  className="w-full accent-[var(--accent-strong)]"
                  aria-label={currentQuestion.question_id}
                />
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  <span>1</span>
                  <span>3</span>
                  <span>5</span>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                    Current Draft
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">
                    {result.typeCode}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                    这个预览会随着你每一题的选择实时变化。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            {answeredCount} / {normalizedQuestions.length} 题已完成
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#081122] transition-transform hover:-translate-y-0.5"
          >
            {currentIndex === normalizedQuestions.length - 1 ? "查看结果" : "下一题"}
          </button>
        </div>
      </div>
    );
  }

  const visibleJobs = result.jobs;
  const topJob = activeMatch ?? visibleJobs[0];

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
                {topType.career_code} · {topType.type_name}
              </p>
              <h1 className="font-serif text-4xl leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl">
                {topType.summary}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                {topType.fit_scenes}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/18 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                职业代码
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
                {topType.career_code}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                {topType.type_name}
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
            {visibleJobs.map((match, index) => {
              const isActive = topJob?.job.job_id === match.job.job_id;

              return (
                <button
                  key={match.job.job_id}
                  type="button"
                  onClick={() => setSelectedJobId(match.job.job_id)}
                  className={`w-full rounded-[24px] border px-5 py-4 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[rgba(125,231,255,0.5)] bg-[rgba(125,231,255,0.12)]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/18 hover:bg-[rgba(255,255,255,0.07)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs tracking-[0.24em] text-[var(--accent-strong)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-white">
                        {match.job.job_display_name}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {match.job.job_family} · {match.job.career_stage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-white">{match.fitScore}</p>
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
                {topJob?.job.domain}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
                {topJob?.job.job_display_name}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
                {topJob?.job.job_summary}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                {topJob?.job.family_desc}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  核心能力
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(topJob?.job.coreAbilityIds ?? []).map((abilityId) => {
                    const ability = getAbilityById(abilityId);
                    return (
                      <span
                        key={abilityId}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white"
                      >
                        {ability?.ability_name ?? abilityId}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  匹配理由
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  这份岗位的主代码是 {topJob?.job.primary_code}，你的结果代码是 {topType.career_code}。
                  {topJob?.codeBonus
                    ? ` 代码匹配额外加分 ${topJob.codeBonus}。`
                    : " 这份岗位更依赖综合向量，而不是单一代码。"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  岗位画像
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[var(--muted-strong)]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">阶段</p>
                    <p className="mt-1 text-white">{topJob?.job.career_stage}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">主代码</p>
                    <p className="mt-1 text-white">{topJob?.job.primary_code}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">领域</p>
                    <p className="mt-1 text-white">{topJob?.job.domain}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">匹配分</p>
                    <p className="mt-1 text-white">{topJob?.fitScore}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/18 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                  教育建议
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {topJob?.job.education_hint}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`p-6 sm:p-7 ${panelClass}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              四维结果
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
              你的向量轮廓
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            每个维度都在看你更偏向哪一侧。它们组合起来，才是最终的职业代码。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {result.dimensions.map((dimension) => {
            const meta = getDimensionMeta(dimension.dimension);

            return (
              <article
                key={dimension.dimension}
                className="rounded-[24px] border border-white/10 bg-black/18 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                      {dimension.dimension}
                    </p>
                    <p className="mt-1 text-base font-medium text-white">
                      {dimension.leftLetter} / {dimension.rightLetter}
                    </p>
                  </div>
                  <span className="text-2xl font-semibold text-white">{dimension.normalized}</span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7de7ff,#8c82ff,#f78cff)]"
                    style={{ width: `${dimension.normalized}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                  {meta?.left_name_cn} 更靠近左侧，{meta?.right_name_cn} 更靠近右侧。
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={`p-6 sm:p-7 ${panelClass}`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            核心能力
          </p>
          <div className="mt-5 space-y-4">
            {result.topAbilities.map((ability) => (
              <div
                key={ability.id}
                className="rounded-[24px] border border-white/10 bg-black/18 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-medium text-white">{ability.name}</p>
                  <span className="text-sm text-[var(--muted)]">× {ability.count}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  这项能力在你最匹配的岗位里出现得比较频繁。
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 sm:p-7 ${panelClass}`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            职业画像
          </p>
          <div className="mt-5 space-y-4">
            {careerTypes.map((type) => (
              <div
                key={type.career_code}
                className={`rounded-[24px] border px-5 py-4 ${
                  type.career_code === topType.career_code
                    ? "border-[rgba(125,231,255,0.5)] bg-[rgba(125,231,255,0.12)]"
                    : "border-white/10 bg-black/18"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                      {type.career_code}
                    </p>
                    <p className="mt-1 text-base font-medium text-white">{type.type_name}</p>
                  </div>
                  <span className="text-sm text-[var(--muted)]">{type.job_count_primary}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {type.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${panelClass}`}
      >
        <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
          这份结果更适合拿来做方向筛选和自我观察，不建议只看一个分数就下结论。
          最好的用法，是把前 2 到 3 个高匹配岗位拿去对照真实 JD、真实项目和真实工作节奏。
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
            返回 Moonsilver 的小家
          </Link>
        </div>
      </section>
    </div>
  );
}
