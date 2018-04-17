
const ip = process.env.IP || '127.0.0.1';
const isDev = process.env.NODE_ENV == 'development';
module.exports = {
    SERVER_IP : ip,
    SERVER_PORT: process.env.PORT || 8001,
    CLIENT_PORT: 9000,

    // MONGODB_IP: ip,

    MONGODB_IP: '192.168.10.142',
    IS_DEV: isDev,
    MOCK_PORT: 8200,

    DATA_INTERFACE: { //后端数据接口
        INDEX_ESQL: 'http://192.168.10.84:8086/esql/rest/search',
        OTHER: ''
    }
}