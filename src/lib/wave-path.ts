/** Shared waveform generator for decorative SVG backdrops (multicampus-style). */
export type WaveOptions = {
  y0: number
  amp: number
  phase: number
}

export function wavePath({ y0, amp, phase }: WaveOptions): string {
  const start = -290
  const end = 1450
  const period = 145
  const waves = (end - start) / period
  const steps = 220
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = start + (end - start) * t
    const y = y0 + amp * Math.sin(t * waves * 2 * Math.PI + phase)
    d += (i === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1)
  }
  return d
}
