import { StackContext, Api, use } from 'sst/constructs';
import { DB } from './db-stack';

export function API({ stack }: StackContext) {
  const dbStack = use(DB);

  const api = new Api(stack, 'restApi', {
    routes: {
      'GET /notes': 'src/functions/notes.getAll',
      'GET /notes/{id}': 'src/functions/notes.getSingle',
      'POST /notes': 'src/functions/notes.addNote',
      'DELETE /notes/{id}': 'src/functions/notes.removeNote'
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
