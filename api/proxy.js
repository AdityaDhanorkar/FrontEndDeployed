export default async function handler(req, res) {
  const backend = 'http://16.170.233.222:8080';
  const path = req.url.replace('/api/proxy', '');
  const url = `${backend}${path}`;
  
  const response = await fetch(url, {
    method: req.method,
    headers: { 'Content-Type': 'application/json', ...req.headers },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });
  
  const data = await response.text();
  res.status(response.status).send(data);
}
