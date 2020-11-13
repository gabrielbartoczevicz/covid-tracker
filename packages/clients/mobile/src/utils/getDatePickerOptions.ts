import { startOfYear, subDays, subWeeks } from 'date-fns';

const yesterday = subDays(Date.now(), 1);

const options = [
  {
    dateFormatted: 'Últimos 7 dias',
    interval: {
      start: subDays(yesterday, 6),
      end: yesterday,
    }
  },
  {
    dateFormatted: 'Últimas 2 semanas',
    interval: {
      start: subWeeks(yesterday, 2),
      end: yesterday,
    }
  },
  {
    dateFormatted: 'Últimos 30 dias',
    interval: {
      start: subDays(yesterday, 29),
      end: yesterday,
    }
  },
  {
    dateFormatted: 'Todo tempo',
    interval: {
      start: startOfYear(new Date().setFullYear(2020)),
      end: yesterday,
    }
  },
];

export default options;
