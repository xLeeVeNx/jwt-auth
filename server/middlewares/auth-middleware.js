const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    const decodedData = await tokenService.validateAccessToken(token);
    console.log('decodedData', decodedData);
    if (!decodedData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = decodedData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
