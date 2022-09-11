/**
 * Regular JSON Headers - no authentication
 * @param language {String}
 * @returns {{'Content-type': {String}, Accept: {String}, 'Content-Language': {String}}}
 */
const getJSONHeaders = (language = 'en') => ({
  'Content-type': 'application/json',
  Accept: 'application/json',
  'Content-Language': language,
});

/**
 * JSON Header with authentication (if provided), otherwise just JSON Headers and the request will probably throw 401
 * @param token {String}
 * @param language {String}
 * @returns {{Authorization: {String}, 'Content-type': {String}, Accept: {String}, 'Content-Language': {String}}|{'Content-type': {String}, Accept: {String}, 'Content-Language': {String}}}
 */
const getAuthenticatedHeaders = (token = null, language = 'en') => {
  if (!token) {
    return {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'Content-Language': language,
    };
  }
  return {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Content-Language': language,
    Authorization: `Bearer ${token}`,
  };
};

export const calls = {
  onSignIn: (service, data) => ({
    url: `${service}/api/login`,
    method: 'POST',
    headers: getJSONHeaders(),
    data: data,
  }),
  onValidateToken: (service, token) => ({
    url: `${service}/api/validate-token`,
    method: 'GET',
    headers: getAuthenticatedHeaders(token),
  }),
  onGetAllTicketsByUserId: (service, token, id) => ({
    url: `${service}/api/tickets/user/${id}`,
    method: 'GET',
    headers: getAuthenticatedHeaders(token),
  }),
};
