const validateEvent = (req, res, next) => {
  const { name, type, date, points } = req.body;

  if (!name || !type || !date) {
    return res.status(400).json({
      message: 'Los campos name, type y date son obligatorios'
    });
  }

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'El nombre del evento debe ser un texto válido'
    });
  }

  if (typeof type !== 'string' || type.trim() === '') {
    return res.status(400).json({
      message: 'El tipo de evento debe ser un texto válido'
    });
  }

  if (Number.isNaN(Date.parse(date))) {
    return res.status(400).json({
      message: 'La fecha del evento no es válida'
    });
  }

  if (points !== undefined && (typeof points !== 'number' || points < 0)) {
    return res.status(400).json({
      message: 'Los puntos deben ser un número mayor o igual a 0'
    });
  }

  next();
};

module.exports = validateEvent;