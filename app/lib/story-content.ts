import path from "node:path";
import { readFile } from "node:fs/promises";

export type Story = {
  title: string;
  sourceName: string;
  paragraphs: string[];
};

const STORY_FILE = path.join(process.cwd(), "content", "story", "dxy.word.txt");

export async function getFirstStory(): Promise<Story> {
  const raw = await readFile(STORY_FILE, "utf8");
  const paragraphs = raw
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    title: "dxy.word",
    sourceName: "dxy.docx",
    paragraphs,
  };
}
