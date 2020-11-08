import chalk from 'chalk';

const { log } = console;

export const warn = (message: string): void => {
  log(chalk.yellow(message));
};

export const info = (message: string): void => {
  log(chalk.blue(message));
};

export const error = (message: string): void => {
  log(chalk.red(message));
};
