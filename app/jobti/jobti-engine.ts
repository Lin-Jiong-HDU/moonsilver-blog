import {
  CAREERS,
  createEmptyScores,
  DIMENSIONS,
  QUESTIONS,
  type Career,
  type DimensionId,
  type WeightedScores,
} from "@/app/jobti/jobti-data";

type ProfileDescriptor = {
  label: string;
  summary: string;
  workStyle: string;
};

export type CareerMatch = {
  career: Career;
  score: number;
  reason: string;
};

export type AssessmentResult = {
  rawScores: WeightedScores;
  ratios: WeightedScores;
  normalizedScores: WeightedScores;
  topDimensions: DimensionId[];
  bottomDimensions: DimensionId[];
  profile: ProfileDescriptor;
  matches: CareerMatch[];
};

const PROFILE_MAP: Array<{
  keys: [DimensionId, DimensionId];
  profile: ProfileDescriptor;
}> = [
  {
    keys: ["analysis", "systems"],
    profile: {
      label: "结构洞察型",
      summary: "你偏向先把问题看清、搭起结构，再决定怎样行动。",
      workStyle: "适合复杂度高、需要长期机制和判断质量的工作环境。",
    },
  },
  {
    keys: ["execution", "influence"],
    profile: {
      label: "推进掌舵型",
      summary: "你更容易在节奏、协调和落地结果上建立价值。",
      workStyle: "适合目标明确、推进链路长、需要多方协作的工作环境。",
    },
  },
  {
    keys: ["people", "influence"],
    profile: {
      label: "连接驱动型",
      summary: "你通过理解人、连接人和推动共识来创造结果。",
      workStyle: "适合高沟通密度、人与人适配度很关键的角色。",
    },
  },
  {
    keys: ["creativity", "craft"],
    profile: {
      label: "表达打磨型",
      summary: "你不仅重视创意，更在意最后呈现出来的质感与辨识度。",
      workStyle: "适合对成品体验要求高、允许持续打磨的岗位。",
    },
  },
  {
    keys: ["systems", "execution"],
    profile: {
      label: "搭建落地型",
      summary: "你擅长把抽象想法搭成可执行路径，并持续推进到落地。",
      workStyle: "适合既要框架能力、又要交付结果的复合型岗位。",
    },
  },
  {
    keys: ["creativity", "adaptability"],
    profile: {
      label: "探索开路型",
      summary: "你在陌生环境里会更快打开思路，用新解法找到突破口。",
      workStyle: "适合变化快、需要不断试验和寻找增量机会的团队。",
    },
  },
  {
    keys: ["analysis", "craft"],
    profile: {
      label: "精确工匠型",
      summary: "你在判断准确度和成品质量上都有比较高的要求。",
      workStyle: "适合标准高、细节密度高、错误成本较高的岗位。",
    },
  },
  {
    keys: ["people", "creativity"],
    profile: {
      label: "共感表达型",
      summary: "你更容易把人的感受转成有感染力的方案和表达。",
      workStyle: "适合内容、品牌、体验设计等以感知为核心的角色。",
    },
  },
];

const DIMENSION_IDS = DIMENSIONS.map((dimension) => dimension.id);

function getMaxPossibleScores() {
  const maxScores = createEmptyScores();

  for (const question of QUESTIONS) {
    for (const dimensionId of DIMENSION_IDS) {
      const bestForDimension = question.options.reduce((best, option) => {
        return Math.max(best, option.weights[dimensionId] ?? 0);
      }, 0);

      maxScores[dimensionId] += bestForDimension;
    }
  }

  return maxScores;
}

const MAX_POSSIBLE_SCORES = getMaxPossibleScores();

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function deriveProfile(topDimensions: DimensionId[]): ProfileDescriptor {
  const topTwo = topDimensions.slice(0, 2);
  const matched = PROFILE_MAP.find(({ keys }) =>
    keys.every((key) => topTwo.includes(key)),
  );

  if (matched) {
    return matched.profile;
  }

  return {
    label: "复合成长型",
    summary: "你的优势并不只集中在一个方向，而是带有明显的混合型特征。",
    workStyle: "更适合允许你跨问题、跨角色发挥的成长型环境。",
  };
}

function getCareerReason(career: Career, topDimensions: DimensionId[]) {
  const matchedDimensions = topDimensions
    .filter((dimensionId) => career.weights[dimensionId] >= 7)
    .slice(0, 2)
    .map((dimensionId) => {
      const dimension = DIMENSIONS.find((item) => item.id === dimensionId);
      return dimension?.label ?? dimensionId;
    });

  if (matchedDimensions.length === 0) {
    return "你的整体偏好和这类岗位的工作节奏仍有一定重合。";
  }

  return `你的 ${matchedDimensions.join(" / ")} 更贴近这类岗位的核心要求。`;
}

export function calculateAssessment(answers: number[]): AssessmentResult {
  const rawScores = createEmptyScores();

  QUESTIONS.forEach((question, index) => {
    const optionIndex = answers[index];
    const selectedOption = question.options[optionIndex];

    if (!selectedOption) {
      return;
    }

    for (const dimensionId of DIMENSION_IDS) {
      rawScores[dimensionId] += selectedOption.weights[dimensionId] ?? 0;
    }
  });

  const ratios = createEmptyScores();
  const normalizedScores = createEmptyScores();

  const ratioValues = DIMENSION_IDS.map((dimensionId) => {
    const maxScore = MAX_POSSIBLE_SCORES[dimensionId];
    const ratio = maxScore === 0 ? 0 : rawScores[dimensionId] / maxScore;
    ratios[dimensionId] = ratio;
    return ratio;
  });

  const minRatio = Math.min(...ratioValues);
  const maxRatio = Math.max(...ratioValues);
  const spread = maxRatio - minRatio || 1;

  for (const dimensionId of DIMENSION_IDS) {
    const normalized =
      38 + ((ratios[dimensionId] - minRatio) / spread) * 48 + ratios[dimensionId] * 8;
    normalizedScores[dimensionId] = Math.round(clamp(normalized, 28, 96));
  }

  const rankedDimensions = [...DIMENSION_IDS].sort(
    (left, right) => normalizedScores[right] - normalizedScores[left],
  );

  const topDimensions = rankedDimensions.slice(0, 3);
  const bottomDimensions = rankedDimensions.slice(-3).reverse();
  const profile = deriveProfile(topDimensions);

  const matches = CAREERS.map((career) => {
    let overlapScore = 0;
    let targetTotal = 0;
    let distance = 0;
    let weightedTotal = 0;
    let penalty = 0;

    const careerTopDimensions = [...DIMENSION_IDS]
      .sort((left, right) => career.weights[right] - career.weights[left])
      .slice(0, 4);

    for (const dimensionId of DIMENSION_IDS) {
      const target = career.weights[dimensionId] / 10;
      const user = ratios[dimensionId];
      const weight = career.weights[dimensionId];

      overlapScore += Math.min(user, target) * weight;
      targetTotal += target * weight;
      distance += Math.abs(user - target) * weight;
      weightedTotal += weight;

      if (weight >= 8 && user < target - 0.12) {
        penalty += (target - user) * 10;
      }
    }

    const coverage = targetTotal === 0 ? 0 : overlapScore / targetTotal;
    const closeness =
      weightedTotal === 0 ? 0 : 1 - distance / weightedTotal;
    const topHit =
      topDimensions.filter((dimensionId) =>
        careerTopDimensions.includes(dimensionId),
      ).length / topDimensions.length;

    const score = Math.round(
      clamp(24 + coverage * 42 + closeness * 20 + topHit * 14 - penalty, 18, 96),
    );

    return {
      career,
      score,
      reason: getCareerReason(career, topDimensions),
    };
  }).sort((left, right) => right.score - left.score);

  return {
    rawScores,
    ratios,
    normalizedScores,
    topDimensions,
    bottomDimensions,
    profile,
    matches,
  };
}
