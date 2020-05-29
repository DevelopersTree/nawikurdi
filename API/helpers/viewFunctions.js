const url = require('url');
module.exports = {
    globalVars: (req, res) =>{
        const originalUrl = (req.originalUrl).split('/')
        var activePage = originalUrl[1] || 'home';
        return {
            seoFromContent: false,
            activePage: activePage,
            public_website_link: process.env.public_website_link,
            // API_LINK: process.env.API_LINK,
            // BASE_API_LINK: `${parsedURL.protocol}//${parsedURL.host}`,
            title: 'ماڵپه‌ری ناوی كوردی',
        }
    }
}