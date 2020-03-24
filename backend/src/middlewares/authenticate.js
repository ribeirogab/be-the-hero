const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authenticateHeader = req.headers.authorization

  if (!authenticateHeader) return res.status(401).json({ error: 'No token provided.' })

  const parts = authenticateHeader.split(' ')

  if (!parts.length === 2) return res.status(401).json({ error: 'Token error.' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted.' })

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid.' })

    req.ngoId = decoded.id
    return next()
  })
}
