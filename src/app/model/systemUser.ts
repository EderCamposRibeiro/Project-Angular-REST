import { Telephone } from './telephone';
import { Profession } from './profession';

export class SystemUser {

id: number;
login: string;
password: string;
name: string;
cpf: string;
birthDate: string;

profession: Profession = new Profession();

telephones: Array<Telephone>;
}
