const express = require('express');
const fetch = require('node-fetch'); // node-fetch v2 i�in
const app = express();

app.use(express.static('public')); // HTML dosyan�z� 'public' klas�r�ne koyun

app.get('/proxy', async (req, res) => {
    const nickname = req.query.nickname;
    console.log(`�stek al�nan kullan�c� ad�: ${nickname}`);
    const url = `http://wolfteamklan.joygame.com/character/getusersgameinfo?ranktype=1&nickname=${encodeURIComponent(nickname)}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(`API yan�t� - Durum Kodu: ${response.status}`);
        const data = await response.json();
        console.log(`API yan�t� - Veri: ${JSON.stringify(data)}`);
        res.json(data);
    } catch (error) {
        console.error(`Hata olu�tu: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Sunucu 3000 portunda �al���yor'));