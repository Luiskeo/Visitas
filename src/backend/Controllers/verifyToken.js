import { Router } from "express";
import moment from "moment";
import NodeCache from "node-cache";

// Configura la caché
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }) // 5 minutos de TTL, verifica cada 60 segundos


const verifyTokenRouter = Router();


verifyTokenRouter.post('/verify-token', (req, res) => {
  const { token, usuario } = req.body

  const cachedToken = cache.get(token)

  if (cachedToken && cachedToken.usuario === usuario) {
    // Verifica si el token ha expirado
    if (moment().isAfter(cachedToken.expirationDate)) {
      cache.del(token) // Elimina el token expirado
      return res.status(400).json({ success: false, message: 'El token ha expirado' })
    }
    return res.status(200).json({ success: true })
  } else {
    return res.status(400).json({ success: false, message: 'Token inválido' })
  }
})

export default verifyTokenRouter;