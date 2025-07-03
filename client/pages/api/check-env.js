// TEMPORARY FILE - DELETE AFTER DEBUGGING
export default function handler(req, res) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Return masked but useful information about environment variables
  res.status(200).json({
    google_id: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 5)}...${process.env.GOOGLE_CLIENT_ID.substring(process.env.GOOGLE_CLIENT_ID.length - 5)}` : 'not set',
    google_secret: process.env.GOOGLE_CLIENT_SECRET ? `${process.env.GOOGLE_CLIENT_SECRET.substring(0, 3)}...` : 'not set',
    github_id: process.env.GITHUB_CLIENT_ID ? `${process.env.GITHUB_CLIENT_ID.substring(0, 5)}...` : 'not set',
    github_secret: process.env.GITHUB_CLIENT_SECRET ? `${process.env.GITHUB_CLIENT_SECRET.substring(0, 3)}...` : 'not set',
    nextauth_url: process.env.NEXTAUTH_URL || 'not set',
    secret: process.env.SECRET ? 'set' : 'not set',
    nextauth_secret: process.env.NEXTAUTH_SECRET ? 'set' : 'not set',
  });
}
