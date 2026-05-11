export interface IWebhook {
	bot: string;
	status: string;
	event: string;
	time: string;
	payload: object;
}