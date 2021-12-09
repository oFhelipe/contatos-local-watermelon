import {Model} from '@nozbe/watermelondb';
import {text} from '@nozbe/watermelondb/decorators';

export default class Contato extends Model {
  static table = 'contato';

  @text('nome')
  nome: string;

  @text('numero')
  numero: string;
}
