export type LeagueConfig = {
  code: "PL" | "PD" | "BL1" | "SA" | "FL1";
  name: string;
  country: string;
};

export type FootballStandingRow = {
  position: number;
  team: {
    id: number;
    name: string;
    shortName?: string;
    crest?: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: string;
};

export type FootballScorerRow = {
  player: {
    name: string;
  };
  team: {
    name: string;
    crest?: string;
  };
  playedMatches?: number;
  goals?: number;
  assists?: number | null;
  penalties?: number | null;
};

export type FootballLeagueSnapshot = {
  league: LeagueConfig;
  season?: string;
  matchday?: number | null;
  updatedAt?: string;
  standings: FootballStandingRow[];
  scorers: FootballScorerRow[];
};

export const FIVE_MAJOR_LEAGUES: LeagueConfig[] = [
  { code: "PL", name: "英超", country: "England" },
  { code: "PD", name: "西甲", country: "Spain" },
  { code: "BL1", name: "德甲", country: "Germany" },
  { code: "SA", name: "意甲", country: "Italy" },
  { code: "FL1", name: "法甲", country: "France" },
];

const API_BASE = "https://api.football-data.org/v4";

function getFootballApiKey() {
  return process.env.FOOTBALL_DATA_API_KEY ?? process.env.FOOTBALL_DATA_TOKEN ?? "";
}

async function fetchFootballData<T>(path: string): Promise<T> {
  const apiKey = getFootballApiKey();

  if (!apiKey) {
    throw new Error("missing_api_key");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "X-Auth-Token": apiKey,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`football_data_${response.status}`);
  }

  return response.json() as Promise<T>;
}

type StandingsResponse = {
  season?: {
    startDate?: string;
    endDate?: string;
    currentMatchday?: number | null;
  };
  standings?: Array<{
    type?: string;
    table?: FootballStandingRow[];
  }>;
  filters?: {
    season?: string;
  };
};

type ScorersResponse = {
  season?: {
    startDate?: string;
    endDate?: string;
    currentMatchday?: number | null;
  };
  scorers?: FootballScorerRow[];
};

function formatSeasonLabel(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) {
    return undefined;
  }

  return `${startDate.slice(0, 4)}-${endDate.slice(0, 4)}`;
}

export async function getLeagueSnapshot(league: LeagueConfig): Promise<FootballLeagueSnapshot> {
  const [standingsResponse, scorersResponse] = await Promise.all([
    fetchFootballData<StandingsResponse>(`/competitions/${league.code}/standings`),
    fetchFootballData<ScorersResponse>(`/competitions/${league.code}/scorers`),
  ]);

  const standings =
    standingsResponse.standings?.find((item) => item.type === "TOTAL")?.table ??
    standingsResponse.standings?.[0]?.table ??
    [];

  const scorers = scorersResponse.scorers ?? [];
  const season =
    formatSeasonLabel(standingsResponse.season?.startDate, standingsResponse.season?.endDate) ??
    formatSeasonLabel(scorersResponse.season?.startDate, scorersResponse.season?.endDate);

  return {
    league,
    season,
    matchday: standingsResponse.season?.currentMatchday ?? scorersResponse.season?.currentMatchday ?? null,
    updatedAt: new Date().toISOString(),
    standings,
    scorers,
  };
}

export async function getFiveLeagueSnapshots() {
  return Promise.all(FIVE_MAJOR_LEAGUES.map((league) => getLeagueSnapshot(league)));
}
