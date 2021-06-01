import { Telephone } from './telephone';

export class SystemUser {

	id: Number;
	login: String;
	password: String;
	name: String;
	cpf: String;

	telephones: Array<Telephone>;
}
