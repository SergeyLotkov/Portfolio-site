// netlify/functions/send-telegram.js
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, type, message } = JSON.parse(event.body);
    const botToken = process.env.TELEGRAM_BOT_TOKEN; // Ключ из настроек Netlify
    const chatId = process.env.TELEGRAM_CHAT_ID;     // ID из настроек Netlify

    const text = `Новая заявка!%0AИмя: ${name}%0AEmail: ${email}%0AТип: ${type}%0AСообщение: ${message}`;

    try {
    const fetch = (await import('node-fetch')).default; // В новых версиях Node может потребоваться импорт
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send' }) };
    }
};