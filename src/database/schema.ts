import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'contato',
      columns: [
        {name: 'nome', type: 'string'},
        {name: 'numero', type: 'string'},
      ],
    }),
  ],
});
