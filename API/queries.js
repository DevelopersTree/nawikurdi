const db = require('./config');

function getBaseNames(limit = 10, offset = 0, req = {}) {
    const query = db('names')
        .select(
            'nameId', 'name', 'desc', 'gender',
            'positive_votes', 'negative_votes'
        )
        .where('deleted', 0)
        .andWhere('activated', 1)
        .limit(limit)
        .offset(offset);
    const searchQuery = req.query.q;
    if (searchQuery) {
        query.whereRaw('name like ?', `%${searchQuery}%`);
    }
    if (req.query.gender) {
        query.andWhere('gender', req.query.gender);
    }
    if (req.query.sort && ['positive', 'negative', 'positive'].indexOf(req.query.sort) > -1) {
        const sort = req.query.sort;
        if(sort === 'positive') {
            query.orderBy('positive_votes', 'desc');
        }
        else if(sort === 'negative') {
            query.orderBy('negative_votes', 'desc');
        }
    }else {
        query.orderByRaw('CHAR_LENGTH(`desc`) DESC');
    }
    return query;
}

function getBaseRecordCount() {
    return db('names').count({
      recordCount: 'nameId',
    })
      .where('deleted', 0)
      .andWhere('activated', 1);
}
function vote(body) {
    let impactSection = 'positive_votes = positive_votes+1';
    if(body.impact === 'negative') impactSection = 'negative_votes = negative_votes+1';
    const promiseArray = [];
    if(body.impact) {
        promiseArray.push(db.raw(`UPDATE names SET ${impactSection} WHERE nameid=?`, [body.name_id]))
    }
    promiseArray.push(
        db('votes').insert({
            nameid: body.name_id,
            uid: body.uid,
            impact: body.impact,
          })
    )
    return Promise.all(promiseArray);
}
function newName(body) {
    return db('names').insert({
        name: body.name,
        desc: body.desc,
        gender: body.gender,
        sended: 1,
    })
}


module.exports = {
    getBaseNames,
    getBaseRecordCount,
    vote,
    newName,
}