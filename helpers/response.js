exports.errorResponse = (err, res) => {
    return res ({
        "statusCode": 400,
        "statusMessage": err
    })
}

exports.successResponse = (msg, result, res) => {
    return res({
        "statusCode": 200,
        "statusMessage": msg,
        "result": result
    })
}

exports.successResponse1 = (msg, total_count, result, res) => {
    return res({
        "statusCode": 200,
        "statusMessage": msg,
        "total_count": total_count,
        "result": result
    })
}

exports.successResponse2 = (msg, res) => {
    return res({
        "statusCode": 200,
        "statusMessage": msg
    })
}

exports.successResponse3 = (msg, res) => {
    return res({
        "statusCode": 201,
        "statusMessage": msg
    })
}

exports.successResponse4 = (msg, res) => {
    return res({
        "statusCode": 402,
        "statusMessage": msg
    })
}

exports.fieldMissingResponse = (res) => {
    return res({
        "statusCode": 400,
        "statusMessage": 'Mandatory Fields Missing'
    })
}

exports.tokenMissing = (msg, res) => {
    return res.send({
        "statusCode": 401,
        "statusMessage":msg
    })
}
