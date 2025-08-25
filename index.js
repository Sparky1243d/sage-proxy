const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <form method="GET" action="/proxy">
      <input name="url" placeholder="Enter URL" style="width:300px" />
      <button type="submit">Go</button>
    </form>
  `);
});

app.get("/proxy", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.send("Please enter a URL.");
    const response = await fetch(url);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching site: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
