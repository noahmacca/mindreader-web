export function renderActivation(act: Number) {
  const actRound = Number(act.toFixed(3));
  if (actRound > 3) return `Very High (${actRound})`;
  if (actRound > 2) return `High (${actRound})`;
  if (actRound > 1) return `Moderate (${actRound})`;
  return `Low (${actRound})`;
}

export function prettifyClass(strIn: String) {
  return strIn
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
