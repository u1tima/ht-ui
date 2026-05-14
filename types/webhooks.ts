export type WebhookProvider = 'tradingview'

export type WebhookAction = 'BUY' | 'DCA' | 'CLOSE'

export type WebhookStatus = 'active' | 'disabled'

/**
 * Конфиг вебхука (то, что показываем в UI на вкладке Webhooks).
 * Это НЕ payload от TradingView, а настройки нашей системы.
 */
export type WebhookConfig = {
	id: string
	provider: WebhookProvider

	/** К какому боту привязан вебхук (в простом варианте 1 webhook = 1 bot) */
	botId: string

	/** URL, который нужно вставить в TradingView Webhook URL */
	endpointUrl: string

	/** Секрет для проверки входящих запросов */
	secret: string

	status: WebhookStatus

	/** Базовая мета для UI */
	createdAt: string // ISO
	updatedAt: string // ISO

	/** Для удобства UX */
	lastRequestAt?: string // ISO
	lastRequestStatus?: 'ok' | 'error'
	lastErrorMessage?: string

	/**
	 * Опционально: разрешённые IP (если решишь делать allowlist).
	 * На практике TW IP-диапазоны могут меняться, поэтому это поле часто не используют.
	 */
	allowlistIps?: string[]
}

/**
 * Минимальный payload, который отправляет TradingView в webhook.
 * % баланса и order_type берём из настроек бота, поэтому здесь их нет.
 */
export type TradingViewWebhookPayload = {
	bot_id: string
	action: WebhookAction

	/**
	 * Уникальный идентификатор сигнала для идемпотентности.
	 * Повторная доставка с тем же signal_id НЕ должна породить второй ордер.
	 */
	signal_id: string

	/** Секрет для авторизации вебхука */
	secret: string

	/**
	 * Нужен, только если bot_settings.order_type = 'limit'
	 * и цену ты хочешь задавать из TradingView.
	 */
	limit_price?: number

	/**
	 * Опционально: timestamp, если удобно для логов/дебага.
	 * Но для идемпотентности полагаться лучше на signal_id.
	 */
	ts?: string // ISO

	/**
	 * Опционально: любые доп. поля для отладки (не используем в логике).
	 */
	meta?: Record<string, unknown>
}

export type WebhookIngestStatus =
	| 'received'
	| 'duplicate'
	| 'rejected'   // secret неверный / webhook выключен
	| 'error'      // ошибка записи/валидации

export type WebhookIngestRecord = {
	id: string
	provider: WebhookProvider

	webhookConfigId?: string
	botId?: string

	receivedAt: string // ISO
	status: WebhookIngestStatus

	/** идемпотентный ключ, который формируем внутри системы */
	idempotencyKey?: string // `${bot_id}:${signal_id}`

	/** сырой payload, который пришёл */
	payload: unknown

	/** для дебага */
	errorMessage?: string
	requestIp?: string
	userAgent?: string
}
