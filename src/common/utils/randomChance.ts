import { Randomizable } from '../interfaces';

export function randomChance<T extends Randomizable>(choices: T[]) {
  const chances = [choices[0].chance];

  for (let i = 1; i < choices.length; i++) {
    chances[i] = choices[i].chance + chances[i - 1];
  }

  const random = Math.random() * chances[chances.length - 1];

  for (let i = 0; i < chances.length; i++) {
    if (chances[i] > random) return choices[i];
  }

  return choices[choices.length - 1];
}
