export function canAutoplay(reducedMotion: boolean, paused: boolean, hovering: boolean, count: number) {
  return !reducedMotion && !paused && !hovering && count > 1;
}