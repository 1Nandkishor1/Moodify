export const detectGesture = (lm) => {
  const isOpen = (tip, pip) => lm[tip].y < lm[pip].y;

  const index = isOpen(8, 6);
  const middle = isOpen(12, 10);
  const ring = isOpen(16, 14);
  const pinky = isOpen(20, 18);

  const thumb = Math.abs(lm[4].x - lm[2].x) > 0.04;

  if (thumb && index && middle && ring && pinky) return "palm";
  if (!thumb && !index && !middle && !ring && !pinky) return "fist";
  if (index && middle && !ring && !pinky) return "peace";

  return "unknown";
};