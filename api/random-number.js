

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }


  const min = parseInt(req.query.min) || 1;
  const max = parseInt(req.query.max) || 100;

  
  if (min >= max) {
    return res.status(400).json({
      success: false,
      error: 'Le minimum doit être inférieur au maximum',
      example: '/api/random-number?min=1&max=100'
    });
  }

  
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  let message = '🎲';
  if (randomNumber < 25) {
    message = '🌟 Petit nombre chanceux!';
  } else if (randomNumber < 50) {
    message = '✨ Nombre équilibré!';
  } else if (randomNumber < 75) {
    message = '💫 Bon nombre!';
  } else {
    message = '🔥 Grand nombre puissant!';
  }

  return res.status(200).json({
    success: true,
    number: randomNumber,
    range: {
      min: min,
      max: max
    },
    message: message,
    timestamp: new Date().toISOString(),
    tip: 'Utilise ?min=X&max=Y pour personnaliser la plage'
  });
}

export { handler };