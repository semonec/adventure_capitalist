
export function msToHHMMSS(ms: number): string {

  // Pad to 2 or 3 digits, default is 2
  let formatter = (n: number) => ('00' + n).slice(-2);

  let sec = Math.ceil((ms / 1000) % 60);
  let min = Math.floor((ms / 1000 / 60) % 60);
  let hr = Math.floor((ms / 1000 / 60 / 60) % 60);

  return formatter(hr) + ':' + formatter(min) + ':' + formatter(sec);
}