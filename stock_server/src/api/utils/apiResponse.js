const apiResponse = ({ status, msg, data }) => {
  return {
    status,
    msg,
    data
  }
}

module.exports = apiResponse
