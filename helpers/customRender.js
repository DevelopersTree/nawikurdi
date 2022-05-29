const {globalVars} = require('./viewFunctions');
const makePlainText = require('./makePlainText');
const decodeHTMLEntities = require('./decodeHTMLEntities');
module.exports = (req, res, info = {
    view: 'index',
    title: 'ماڵپه‌ری ناوی كوردی',
}) =>{
    res.render(info.view, {
        ...globalVars(req, res),
        makePlainText,
        decodeHTMLEntities,
        ...info
    })
}