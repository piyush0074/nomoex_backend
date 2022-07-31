export default {

    port:  8080,

    socketPort: 3000,
    host: /*process.env.HOST ||*/ 'localhost',

    binanceAPI: `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","ENJUSDT","GRTUSDT"]`,

    logs: {
        level: 'silly',
    },


    api: {
        prefix: '/api',
    },

    jwtSecret: 'AoTgab%$SKBJB(Baco&euro$!(*^%fcxuartcuYCAvhagA)Y^VYcdw(TVYCtxt@ibs)a%Wbha5$',

    jwtAlgorithm: process.env.JWT_ALGORITHUM || 'HS256',

    DatabaseURL: 'mongodb://127.0.0.1:27017/nomoex'
}