
export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

 
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

 
  return res.status(200).json({
    message: 'Konnichiwa! 👋',
    success: true,
    timestamp: new Date().toISOString(),
    emoji: '🎌',
    description: 'made by steph tech',
  });
}


export { handler };