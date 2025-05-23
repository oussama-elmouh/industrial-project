import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const random = (min: number, max: number) => {
  const value = Math.floor(Math.random() * (max - min) + min);
  return [value, value, value];
};

export const calculateRealPower = (
  voltage: number,
  current: number,
  powerFactor = 0.8,
) => {
  return Math.sqrt(3) * voltage * current * powerFactor;
};
