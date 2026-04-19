export type CharLayer = "ring" | "planet" | "space";

export interface AsciiChar {
  char: string;
  layer: CharLayer;
}

const RAW_LINES = [
  "",
  "                                          ,o88888",
  "                                       ,o8888888'",
  "                 ,:o:o:oooo.        ,8O88Pd8888\"",
  "             ,.::.::o:ooooOoOoO. ,oO8O8Pd888'",
  "           ,.:.::o:ooOoOoOO8O8OOo.8OOPd8O8O\"",
  "          , ..:.::o:ooOoOOOO8OOOOo.FdO8O8\"",
  "         , ..:.::o:ooOoOO8O888O8O,COCOO\"",
  "        , . ..:.::o:ooOoOOOO8OOOOCOCO\"",
  "         . ..:.::o:ooOoOoOO8O8OCCCC\"o",
  "            . ..:.::o:ooooOoCoCCC\"o:o",
  "            . ..:.::o:o:,cooooCo\"oo:o:",
  "         `   . . ..:.:cocoooo\"'o:o:::'",
  "         .`   . ..::ccccoc\"'o:o:o:::'",
  "        :.:.    ,c:cccc\"':.:.:.:.:.'",
  "      ..:.:\"'`::::c:\"'..:.:.:.:.:.'",
  "    ...:.'.:.::::\"'    . . . . .'",
  "   .. . ....:.\"' `   .  . . ''",
  " . . . ....\"'",
  " .. . .\"'          ",
  ".",
];

const ALWAYS_PLANET = new Set(["8", "P", "d", "F", "C"]);

function isPlanet(char: string, col: number, line: string): boolean {
  if (ALWAYS_PLANET.has(char)) return true;
  if (char === "O") {
    const left = col > 0 ? line[col - 1] : " ";
    const right = col < line.length - 1 ? line[col + 1] : " ";
    if (ALWAYS_PLANET.has(left) || ALWAYS_PLANET.has(right)) return true;
  }
  return false;
}

function classifyLine(line: string, lineIdx: number): AsciiChar[] {
  if (line === "") return [];

  const chars = [...line];
  let firstNonSpace = -1;
  let lastNonSpace = -1;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] !== " ") {
      if (firstNonSpace === -1) firstNonSpace = i;
      lastNonSpace = i;
    }
  }

  if (firstNonSpace === -1) {
    return chars.map((char) => ({ char, layer: "space" as const }));
  }

  return chars.map((char, colIdx) => {
    if (colIdx < firstNonSpace || colIdx > lastNonSpace) {
      return { char, layer: "space" as const };
    }
    if (char === " ") {
      return { char, layer: "ring" as const };
    }
    if (isPlanet(char, colIdx, line)) {
      return { char, layer: "planet" as const };
    }
    return { char, layer: "ring" as const };
  });
}

export const saturnArt: AsciiChar[][] = RAW_LINES.map(classifyLine);