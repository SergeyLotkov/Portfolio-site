export const handler = async (event) => {
    // Разрешаем только POST запросы
    if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
    // Получаем данные из вашего фронтенда
    const { name, email, type, message } = JSON.parse(event.body);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Формируем красивый текст для сообщения
    const text = `📩 *Новое сообщение с сайта*%0A%0A` +
                    `👤 Имя: ${name}%0A` +
                    `📧 Email: ${email}%0A` +
                    `🏷 Тип: ${type}%0A` +
                    `💬 Сообщение: ${message}`;

    // Отправляем в Telegram
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=Markdown`;

    await fetch(url);

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
    };

    } catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send message' }),
    };
    }
};