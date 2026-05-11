export interface IBot {
	id: string;
	name: string;
	description?: string;
	pair: string;
	exchange: string;
	status: string;
	enabled: boolean,
	totalPl: string;
}