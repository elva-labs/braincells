import { StackContext, Api, use } from 'sst/constructs';
import { DB } from './db-stack';

export function API({ stack }: StackContext) {
  const dbStack = use(DB);

  const api = new Api(stack, 'rest-api', {
    routes: {
      'GET /notes': 'src/functions/notes.getAll',
      // TODO: create the required endpoints here
    },
    defaults: {
      function: {
        bind: [dbStack.table],
        environment: {
          TABLE: dbStack.table.tableName,
        },
      },
    },
  });

  stack.addOutputs({
    EndPoint: api.url,
  });
}
