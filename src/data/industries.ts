import { Car, Plane, Shield, Zap, Wrench, Droplets } from 'lucide-react';

// Industry presentation from the company's FINAL deck; not product assignments.
export const industries = [
  { label: 'Automotive', icon: Car },
  { label: 'Aerospace', icon: Plane },
  { label: 'Defence', icon: Shield },
  { label: 'Energy', icon: Zap },
  { label: 'General Engineering', icon: Wrench },
  { label: 'Hydraulic', icon: Droplets },
] as const;

export const industryNames = industries.map(industry => industry.label);