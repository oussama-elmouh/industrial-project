import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const random = (min: number, max: number) => {
  const value = Math.floor(Math.random() * (max - min) + min);
  return [value, value, value];
};

export const calculate = (
  voltage: number,
  current: number,
  powerFactor = 0.8,
) => {
  const activePower = Math.round(
    Math.sqrt(3) * voltage * current * powerFactor,
  );
  const reactivePower = Math.round(
    Math.sqrt(3) * voltage * current * Math.sqrt(1 - powerFactor ** 2),
  );
  const apparentPower = Math.sqrt(activePower ** 2 + reactivePower ** 2);

  return {
    activePower,
    reactivePower,
    apparentPower,
    activeEnergy: 2,
    reactiveEnergy: 2,
  };
};
