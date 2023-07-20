export const getRandom = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min) / 100;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
