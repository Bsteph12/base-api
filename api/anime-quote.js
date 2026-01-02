
const quotes = [
  {
    text: "Si tu ne prends pas de risques, tu ne peux pas créer de futur.",
    anime: "One Piece",
    character: "Monkey D. Luffy",
    emotion: "💪"
  },
  {
    text: "L'échec est simplement l'opportunité de recommencer, cette fois plus intelligemment.",
    anime: "Naruto",
    character: "Minato Namikaze",
    emotion: "🔥"
  },
  {
    text: "La vie est un voyage continu. Profite du moment présent.",
    anime: "Demon Slayer",
    character: "Tanjiro Kamado",
    emotion: "⚔️"
  },
  {
    text: "Ne vis pas en te basant sur les valeurs des autres.",
    anime: "My Hero Academia",
    character: "All Might",
    emotion: "⭐"
  },
  {
    text: "Les rêves ne se réalisent pas d'eux-mêmes. Tu dois les poursuivre.",
    anime: "Haikyuu!!",
    character: "Hinata Shoyo",
    emotion: "🏐"
  },
  {
    text: "Même dans les moments les plus sombres, il y a toujours une lueur d'espoir.",
    anime: "Attack on Titan",
    character: "Eren Yeager",
    emotion: "🗡️"
  }
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sélectionner une citation aléatoire
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  return res.status(200).json({
    success: true,
    quote: selectedQuote,
    totalQuotes: quotes.length,
    timestamp: new Date().toISOString(),
  });
}

export { handler };