/**
 * Created by renyouchao on 14-3-16.
 */



var setAppGlobal = function(res,req,appGlobal){
    if (appGlobal.aid){
        res.cookie('aid', appGlobal.aid, { maxAge: 9000000 });
        req.session.loggedIn = appGlobal.aid;
    }if (appGlobal.cid){
        res.cookie('cid', appGlobal.cid, { maxAge: 9000000 });
        req.session.closetUserId = appGlobal.cid;
    }if (appGlobal.nickName){
        res.cookie('nickName', appGlobal.nickName, { maxAge: 9000000 });
        req.session.nickName = appGlobal.nickName;
    }if (appGlobal.eacc){
        res.cookie('eacc', appGlobal.eacc, { maxAge: 9000000 });
        req.session.emailAcc = appGlobal.eacc;
    }
};

exports.setAppGlobal = setAppGlobal;
