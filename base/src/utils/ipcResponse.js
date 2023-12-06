/**
 * 通用结果返回
 */
module.exports = {
    STATUS_CODE: {
        SUCCESS: {
            errCode: 0,
            msg: 'SUCCESS',
            msgZh: '操作成功'
        },
        UNKNOWN_ERROR: {
            errCode: 1,
            msg: 'UNKNOWN_ERROR',
            msgZh: '未知异常'
        },
        PARAM_ERROR: {
            errCode: 10001,
            msg: 'PARAM_ERROR',
            msgZh: '参数错误'
        }
    },

    success(data, msg = Result.STATUS_CODE.SUCCESS.msg, code = Result.STATUS_CODE.SUCCESS.errCode) {
        return {
            code,
            msg,
            data
        };
    },

    fail(data, msg = Result.STATUS_CODE.UNKNOWN_ERROR.msg, code = Result.STATUS_CODE.UNKNOWN_ERROR.errCode) {
        return {
            code,
            msg,
            data
        };
    }
}