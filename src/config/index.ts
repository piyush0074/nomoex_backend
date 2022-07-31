export default {

    port:  8080,
    host: /*process.env.HOST ||*/ 'localhost',

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