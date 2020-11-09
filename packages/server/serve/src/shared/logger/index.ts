import chalk from 'chalk';

const { log } = console;

export const warn = (message: any): void => {
  log(chalk.yellow(message));
};

export const info = (message: any): void => {
  log(chalk.blue(message));
};

export const error = (message: any): void => {
  log(chalk.red(message));
};
