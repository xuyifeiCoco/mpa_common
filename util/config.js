const mode = process.env.NODE_ENV;
const isPro = mode === 'production';
module.exports = {
    isPro,
    mode,
};
