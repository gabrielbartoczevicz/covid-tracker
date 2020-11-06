import cron from 'node-cron';

class CronService {
  public async execute(): Promise<void> {
    cron.schedule('* * * * *', () => console.log('Executando a tarefa a cada 1 minuto'));
  }
}

export default CronService;
