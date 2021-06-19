import { Telephone } from './telephone';

export class SystemUser {

id: number;
login: string;
password: string;
name: string;
    cpf: string;
    birthDate: string;

telephones: Array<Telephone>;
}
