const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    }
});

app.get('/api/menu', (req, res) => {
    // We will reconstruct the MENU_DATA structure from the database
    const menuData = {};

    db.all(`SELECT * FROM categories`, [], (err, categories) => {
        if (err) return res.status(500).json({ error: err.message });

        let pendingCategories = categories.length;
        if (pendingCategories === 0) return res.json({});

        categories.forEach(cat => {
            const dataJson = JSON.parse(cat.data_json || "{}");
            menuData[cat.id] = {
                title: cat.title,
                description: cat.description,
                sizes: dataJson.sizes || [],
                extraPriceMap: dataJson.extraPriceMap || [],
                options: dataJson.options,
                extras: dataJson.extras,
                items: []
            };

            db.all(`
                SELECT i.*, p.price, p.price_large, p.size_index 
                FROM items i 
                LEFT JOIN prices p ON i.id = p.item_id 
                WHERE i.category_id = ?
                ORDER BY i.id
            `, [cat.id], (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });

                // Group items and prices
                const itemsMap = {};
                rows.forEach(row => {
                    if (!itemsMap[row.id]) {
                        const itemDataJson = JSON.parse(row.data_json || "{}");
                        itemsMap[row.id] = {
                            id: row.id,
                            name: row.name,
                            desc: row.description,
                            prices: [],
                            noFam: itemDataJson.noFam,
                            onlySmall: itemDataJson.onlySmall,
                            hasLarge: itemDataJson.hasLarge,
                            isSpecial: itemDataJson.isSpecial,
                            noOptions: itemDataJson.noOptions,
                            noCheeseCrust: itemDataJson.noCheeseCrust,
                        };
                    }
                    if (row.price !== null) {
                        itemsMap[row.id].prices[row.size_index] = row.price;
                        if (row.price_large !== null) {
                            itemsMap[row.id].pricesLarge = itemsMap[row.id].pricesLarge || [];
                            itemsMap[row.id].pricesLarge[row.size_index] = row.price_large;
                        }
                    }
                });

                menuData[cat.id].items = Object.values(itemsMap).sort((a, b) => {
                    const matchA = a.name.match(/^(\d+)/);
                    const matchB = b.name.match(/^(\d+)/);
                    if (matchA && matchB) {
                        return parseInt(matchA[1], 10) - parseInt(matchB[1], 10);
                    } else if (matchA) {
                        return 1;
                    } else if (matchB) {
                        return -1;
                    }
                    return a.name.localeCompare(b.name);
                });
                pendingCategories--;

                if (pendingCategories === 0) {
                    res.json(menuData);
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
