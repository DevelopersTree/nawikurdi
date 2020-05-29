module.exports = (content = '') =>{
    return (content+"").replace(/<[^>]*>?/gm, '');
}