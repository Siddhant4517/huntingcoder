// lib/corsMiddleware.js
export default function corsMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust this for better security in production
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
}
