export interface SwissEphemeris {
  julday: (year: number, month: number, day: number, hour: number, gregflag: number) => number;
  calcUt: (tjd: number, ipl: number, iflag: number, xx: number[], serr: string) => number;
  setEphePath: (path: string) => void;
  houses: (tjd: number, iflag: number, lat: number, lon: number, hsys: number, cusps: number[], ascmc: number[]) => number;
  revjul: (jd: number, gregflag: number, year: number[], month: number[], day: number[], hour: number[]) => void;
  close: () => void;
}

export default function loadSwissEph(): Promise<SwissEphemeris>;
