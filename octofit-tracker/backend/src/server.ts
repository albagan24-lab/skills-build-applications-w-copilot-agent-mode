import app from './index';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
const apiUrl = `${apiHost}/api`;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', apiUrl });
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on ${apiHost}`);
      console.log(`API base URL: ${apiUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
