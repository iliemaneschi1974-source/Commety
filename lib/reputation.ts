export const XP = {
  REPORT_CREATED: 10,

  PHOTO_UPLOADED: 3,

  VIDEO_UPLOADED: 5,

  COMMENT_CREATED: 2,

  REPORT_CONFIRMED: 5,

  REPORT_RESOLVED: 20,
} as const;

export const LEVELS = [
  0,
  100,
  250,
  500,
  800,
  1200,
  1700,
  2300,
  3000,
  3800,
];

export interface ReputationProgress {
  level: number;
  currentLevelXp: number;
  xpForNextLevel: number | null;
  remainingXp: number;
}

/**
 * Restituisce l'avanzamento all'interno del livello corrente.
 * Gli XP dell'utente sono cumulativi, mentre la barra mostra solo
 * quelli guadagnati dal raggiungimento del livello attuale.
 */
export function getReputationProgress(
  xp: number
): ReputationProgress {
  const totalXp = Math.max(0, Math.floor(xp));
  let levelIndex = 0;

  for (let index = 1; index < LEVELS.length; index++) {
    if (totalXp >= LEVELS[index]) {
      levelIndex = index;
    }
  }

  const levelStartXp = LEVELS[levelIndex];
  const nextLevelXp = LEVELS[levelIndex + 1];

  if (nextLevelXp === undefined) {
    return {
      level: levelIndex + 1,
      currentLevelXp: totalXp - levelStartXp,
      xpForNextLevel: null,
      remainingXp: 0,
    };
  }

  const xpForNextLevel = nextLevelXp - levelStartXp;
  const currentLevelXp = totalXp - levelStartXp;

  return {
    level: levelIndex + 1,
    currentLevelXp,
    xpForNextLevel,
    remainingXp: Math.max(nextLevelXp - totalXp, 0),
  };
}
