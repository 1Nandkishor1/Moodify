export const detectExpression = (lm) => {
  const left = lm[61];
  const right = lm[291];
  const top = lm[13];
  const bottom = lm[14];

  const eyeTop = lm[159];
  const eyeBottom = lm[145];

  const mouthWidth = Math.abs(right.x - left.x);
  const mouthOpen = Math.abs(top.y - bottom.y);
  const eyeOpen = Math.abs(eyeTop.y - eyeBottom.y);

  if (mouthWidth > 0.09) return "happy";
  if (mouthOpen > 0.02 && eyeOpen > 0.02) return "surprise";
  if (mouthWidth < 0.07 && eyeOpen < 0.02) return "sad";

  return "neutral";
};