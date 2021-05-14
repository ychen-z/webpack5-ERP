const isProduction = process.env.NODE_ENV == 'production';
const sourceMapEnabled = !isProduction;

module.exports = {
    isProduction,
    sourceMapEnabled
};
