module.exports = function (req, res, next) {
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
  next()
}
