export type { IBot } from './IBot';
export type { IWebhook } from './IWebhook';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export type LogSource = 'webhook' | 'worker' | 'exchange' | 'db' | 'ui' | 'system';

export type LogEntityType =
	| 'bot'
	| 'signal'
	| 'order'
	| 'fill'
	| 'position'
	| 'exchange_account'
	| 'user'
	| 'job'
	| 'none';

/**
 * Лучше держать action как string union, чтобы не разъехались значения в UI/фильтрах.
 * Если захочешь расширять — добавляй сюда.
 */
export type LogAction =
	// webhook
	| 'webhook_received'
	| 'webhook_validated'
	| 'webhook_rejected'
	| 'signal_normalized'
	| 'signal_deduplicated'
	| 'signal_enqueued'
	// worker / queue
	| 'signal_claimed'
	| 'signal_processing_started'
	| 'signal_processing_done'
	| 'signal_processing_error'
	| 'signal_recovered_stuck'
	// exchange
	| 'exchange_request'
	| 'exchange_response'
	| 'exchange_error'
	| 'order_submitted'
	| 'order_updated'
	| 'fill_recorded'
	| 'balance_loaded'
	| 'position_loaded'
	// db/system
	| 'db_insert'
	| 'db_update'
	| 'system_healthcheck';

export type LogEventInput = {
	id: string;
	// обязательное (для стандартной записи)
	level: LogLevel;
	source: LogSource;
	action: LogAction;
	message: string;

	/** Один на всю цепочку "webhook -> signals -> worker -> exchange". */
	trace_id: string;

	// окружение/сервис (можно проставлять автоматически внутри logEvent())
	env?: 'local' | 'stage' | 'prod';
	service?: 'nuxt-api' | 'worker' | 'vercel' | string;
	version?: string; // git sha / semver

	// корреляция (если будешь делать "спаны")
	span_id?: string | null;
	parent_span_id?: string | null;

	// связи с доменными сущностями
	entity_type?: LogEntityType; // default "none"
	entity_id?: string | null;

	bot_id?: string | null;  // uuid as string
	user_id?: string | null; // uuid as string (auth.users.id)

	// идемпотентность
	idempotency_key?: string | null;
	is_duplicate?: boolean; // default false

	// метрики/ретраи
	duration_ms?: number | null;
	attempt?: number | null;

	// payload
	data?: Record<string, unknown> | null;
	meta?: Record<string, unknown> | null;

	/**
	 * Позволяет явно задать ts (например, если событие задним числом).
	 * Обычно не нужно — пусть БД ставит now().
	 */
	ts?: string; // ISO
}
