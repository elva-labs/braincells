import { StackContext, Api, use } from 'sst/constructs';
import { DB } from './db-stack';

export function API({ stack }: StackContext) {
  const dbStack = use(DB);

  const api = new Api(stack, 'rest-api', {
    routes: {
      'GET /notes': 'src/functions/notes.getAll',
      'POST /notes': 'src/functions/notes.create',
      'GET /notes/{id}': 'src/functions/notes.getSingle',
      'DELETE /notes/{id}': 'src/functions/notes.remove',
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
