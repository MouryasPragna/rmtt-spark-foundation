import roshan from '../assets/roshan-tanuk.webp.asset.json';
import ravi from '../assets/ravi-kumar.webp.asset.json';
import syamala from '../assets/syamala-kumar.webp.asset.json';
export type Leader = { name: string; role: string; img: string };

// Portrait/name associations verified against FINAL page 16; roles remain unconfirmed.
export const leaders: Leader[] = [
  { name: 'Roshan Tanuk', role: '', img: roshan.url },
  { name: 'K. Ravi Kumar', role: '', img: ravi.url },
  { name: 'K. Syamala Kumar', role: '', img: syamala.url },
];