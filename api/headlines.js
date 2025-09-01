import fetch from 'node-fetch';

export default async (req, res) => {
    const { category, pageSize } = req.query;
    const apiKey = process.env.VITE_NEWS_API_KEY;

    if (!apiKey) {
        res.status(500).json({ error: "API key is not configured" });
        return;
    }
    
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data.articles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
};