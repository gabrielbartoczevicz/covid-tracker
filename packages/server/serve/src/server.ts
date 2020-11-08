import server from '@shared/infra/http/App';

import { info } from '@shared/logger';

server.listen(3333, () => info('Server running at port: 3333'));
