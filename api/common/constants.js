/**
 * Created by renyouchao on 14-3-16.
 */


var loginStates = {
    UP_CORRECT : 0,     //用户名和密码正确
    UP_INCORRECT : 1,   //您输入的密码和账户名不匹配，请重新输入。忘记密码或账户名？
    MAX_ATTEMPTS : 2,   //重试太多次，需要输入验证码
    BAN_ACCOUNT : 3     //由于安全原因,账号被禁用
}


exports.loginStates = loginStates;