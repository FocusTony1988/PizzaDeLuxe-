const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './database.sqlite';
if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile); // Reset DB
}

const db = new sqlite3.Database(dbFile);

const MENU_DATA = {
    pizzas: {
        title: "Pizza",
        description: "Alle Pizzen mit Tomatensoße und Käse. Wahlweise BBQ oder Sahne-Soße.",
        sizes: [{ id: "26cm", label: "Klein (26cm)", priceIndex: 0 }, { id: "32cm", label: "Groß (32cm)", priceIndex: 1 }, { id: "50cm", label: "Familie (50cm)", priceIndex: 2 }],
        extraPriceMap: [0.50, 0.50, 1.00],
        extras: [
            { name: "Käserand", priceSmall: 2.50, priceLarge: 4.00 },
            { name: "Extra Käse", priceSmall: 1.50, priceLarge: 4.00 }
        ],
        items: [
            { id: "p0", name: "Pizza Brot", prices: [5.00, 6.50, 0], desc: "Tomatensoße ODER Knoblauchöl (Nur 26/32cm)", noFam: true },
            { id: "p0m", name: "Margherita", prices: [7.00, 8.00, 16.00], desc: "Käse" },
            { id: "p1", name: "1. Basic", prices: [8.00, 9.00, 18.00], desc: "Salami, Schinken" },
            { id: "p2", name: "2. Bacon", prices: [8.00, 9.00, 18.00], desc: "Schinken, Räucherspeck" },
            { id: "p3", name: "3. Parma", prices: [9.00, 10.00, 19.00], desc: "Parmaschinken, Rucola" },
            { id: "p4", name: "4. Hawaii", prices: [8.00, 9.00, 18.00], desc: "Schinken, Ananas" },
            { id: "p5", name: "5. Mexicana", prices: [8.00, 9.00, 18.00], desc: "Rinderhackfleisch, rote Bohnen, Mais, scharf" },
            { id: "p6", name: "6. Gorgonzola", prices: [8.00, 9.00, 18.00], desc: "Schinken, Gorgonzola" },
            { id: "p7", name: "7. Mozzarella", prices: [8.00, 9.00, 18.00], desc: "Frische Tomaten, Mozzarella" },
            { id: "p8", name: "8. Quattro Formaggi", prices: [8.00, 9.00, 18.00], desc: "Mozzarella, Fetakäse, Gorgonzola, Edamer" },
            { id: "p9", name: "9. Vegetaria", prices: [9.00, 10.00, 19.00], desc: "Zucchini, Paprika, frische Champignons, Brokkoli" },
            { id: "p10", name: "10. Tonno", prices: [8.00, 9.00, 18.00], desc: "Thunfisch, Zwiebeln" },
            { id: "p11", name: "11. Frutti Di Mare", prices: [8.00, 9.00, 18.00], desc: "Meeresfrüchte, Shrimps" },
            { id: "p12", name: "12. Sucuk", prices: [8.00, 9.00, 18.00], desc: "Türkische Wurst, Mais" },
            { id: "p13", name: "13. Diavolo", prices: [8.00, 9.00, 18.00], desc: "Scharfe Salami, Sardellen, Peperoni" },
            { id: "p14", name: "14. Solo Mio", prices: [8.00, 9.00, 18.00], desc: "Blattspinat, Shrimps, Knoblauch" },
            { id: "p15", name: "15. Gyros", prices: [9.00, 10.00, 19.00], desc: "Gewürztes Putenfleisch, Zwiebeln" },
            { id: "p16", name: "16. Pizza De Luxe", prices: [9.00, 10.00, 19.00], desc: "Salami, Paprika, frische Tomaten" },
            { id: "p17", name: "17. Nach Wunsch", prices: [7.00, 8.00, 17.00], desc: "Grundpreis + Zutaten extra berechnet" },
            { id: "p18", name: "18. Calzone (Tasche)", prices: [9.00, 10.00, 0], desc: "Schinken, Champignons (Nur 26/32cm)", noFam: true, noCheeseCrust: true },
            { id: "p19", name: "19. Vesuvio (Rund)", prices: [10.50, 12.00, 0], desc: "Salami, Champignons (Nur 26/32cm)", noFam: true },
            { id: "p20", name: "20. Spezial", prices: [9.00, 10.00, 20.00], desc: "Salami, Schinken, Champignons, Peperoni, Zwiebeln" },
            { id: "p21", name: "21. Emely (Kinder)", prices: [5.00, 0, 0], desc: "2 Zutaten nach Wahl (Nur Klein)", onlySmall: true }
        ]
    },
    creations: {
        title: "De Luxe Kreationen",
        description: "Spezielle Pizzen für die besten Kunden.",
        sizes: [{ id: "26cm", label: "Klein (26cm)", priceIndex: 0 }, { id: "32cm", label: "Groß (32cm)", priceIndex: 1 }, { id: "50cm", label: "Familie (50cm)", priceIndex: 2 }],
        extraPriceMap: [0.50, 0.50, 1.00],
        extras: [
            { name: "Käserand", priceSmall: 2.50, priceLarge: 4.00 },
            { name: "Extra Käse", priceSmall: 1.50, priceLarge: 4.00 }
        ],
        items: [
            { id: "c1", name: "Pizza Tony", prices: [10.00, 11.00, 20.00], desc: "Spinat, Brokkoli, Shrimps, Fetakäse, Knoblauch" },
            { id: "c2", name: "Pizza Rößner", prices: [10.00, 11.00, 21.00], desc: "Scharfe Salami, Schinken, Artischocken, Champignons, Paprika, Peperoni, Käse unter Zutaten" },
            { id: "c3", name: "Pizza Calzone Willi", prices: [11.00, 12.00, 0], desc: "Salami, Schinken, Paprika, Peperoni, Knoblauch, Zwiebeln, Mozzarella", noFam: true, noCheeseCrust: true },
            { id: "c4", name: "Vesuvio BBQ-Meat-Lovers", prices: [12.50, 14.00, 0], desc: "Bacon, Schinken, Scharfe Salami, Salami, Zwiebeln, Champignons, Mozzarella, Paprika", noFam: true },
            { id: "c5", name: "Pizza Rusti", prices: [9.00, 10.00, 19.00], desc: "BBQ-Soße, Mozzarella, Feta, Jalapenos, Schinken" },
            { id: "c6", name: "Pizza Jörg", prices: [10.00, 11.00, 20.00], desc: "Scharfe Salami, frische Tomaten, Zwiebeln, Gorgonzola, Knoblauch" }
        ]
    },
    pasta: {
        title: "Nudelgerichte",
        description: "Wahlweise mit: Spaghetti, Rigatoni oder Tortellini.",
        sizes: [{ id: "klein", label: "Klein", priceIndex: 0 }, { id: "gross", label: "Groß", priceIndex: 1 }],
        options: [{ name: "Spaghetti" }, { name: "Rigatoni" }, { name: "Tortellini" }],
        extras: [{ name: "Mit Käse überbacken", priceSmall: 1.00, priceLarge: 2.00 }],
        items: [
            { id: "n1", name: "Napoli", prices: [6.00, 8.00], desc: "Tomatensoße" },
            { id: "n2", name: "Bolognese", prices: [7.50, 10.00], desc: "Schinken-Sahnesauce" },
            { id: "n3", name: "Carbonara", prices: [7.50, 10.00], desc: "Sahne, Speck, Ei" },
            { id: "n4", name: "Quattro Formaggi", prices: [8.00, 10.00], desc: "4 Käsesorten" },
            { id: "n5", name: "Spinat & Shrimps", prices: [8.00, 10.00], desc: "Sahnesauce" },
            { id: "n6", name: "Nudeln A La Dani", prices: [8.00, 12.00], desc: "Schinken, Sahne, Brokkoli, Champignons, Knoblauch, Zwiebeln", isSpecial: true },
            { id: "n7", name: "Spaghetti Don Andrea", prices: [8.00, 12.00], desc: "Grüne Bohnen, Speck, Zwiebeln, Tomaten", isSpecial: true },
            { id: "n8", name: "Nudeln A La Oli", prices: [8.00, 12.00], desc: "Putengeschnetzeltes, Zwiebeln, Champignons, Sahne", isSpecial: true }
        ]
    },
    salads: {
        title: "Salate",
        description: "Wahlweise mit Joghurt, Balsamic, oder Essig & Öl Dressing.",
        sizes: [{ id: "klein", label: "Klein", priceIndex: 0 }, { id: "gross", label: "Groß", priceIndex: 1 }],
        options: ["Joghurt-Dressing", "Balsamico-Dressing", "Essig & Öl", "Ohne Dressing"],
        items: [
            { id: "s1", name: "Gemischter Salat", prices: [5.50, 8.00], desc: "Eisbergsalat, Gurken, Tomaten, Paprika, Peperoni, Oliven, Zwiebeln, Käse" },
            { id: "s2", name: "Italienischer Salat", prices: [6.50, 9.00], desc: "Gemischter Salat + Schinken, Ei" },
            { id: "s3", name: "Puten Salat", prices: [6.50, 9.00], desc: "Gemischter Salat + Putenstreifen" },
            { id: "s4", name: "Bauern Salat", prices: [6.50, 9.00], desc: "Gemischter Salat + Schafskäse, Mais" },
            { id: "s5", name: "Hawaii Salat", prices: [6.50, 9.00], desc: "Gemischter Salat + Ananas, Thunfisch" },
            { id: "s6", name: "De Luxe Salat", prices: [7.00, 10.00], desc: "Gemischter Salat + Thunfisch, Ei, Schinken, Mais" },
            { id: "s7", name: "Jörg Salat", prices: [8.50, 12.00], desc: "Gemischter Salat + panierte Putenstreifen und Fetakäse" },
            { id: "s8", name: "Gemüse Salat", prices: [7.50, 11.00], desc: "Grüner Salat + gebratenem Gemüse und Fetakäse" }
        ]
    },
    meat: {
        title: "Fleischgerichte",
        description: "Inkl. kleinem Beilagensalat (außer beim Sandwich).",
        sizes: [{ id: "std", label: "Standard", priceIndex: 0 }],
        options: ["Mit Pommes", "Mit Kroketten"],
        items: [
            { id: "f1", name: "Schnitzel Wiener Art", prices: [8.00], pricesLarge: [11.00], hasLarge: true, desc: "Paniertes Schnitzel" },
            { id: "f2", name: "Schnitzel Jäger Art", prices: [8.50], pricesLarge: [12.50], hasLarge: true, desc: "Mit Pilzrahmsoße" },
            { id: "f3", name: "Cordon Bleu", prices: [10.00], pricesLarge: [14.00], hasLarge: true, desc: "Gefüllt mit Schinken und Käse" },
            { id: "f4", name: "Gegrilltes Naturschnitzel", prices: [14.00], desc: "Mit Rigatoni, Spinat und Gorgonzola Sauce" },
            { id: "f5", name: "Currywurst", prices: [7.50], pricesLarge: [10.00], hasLarge: true, desc: "Mit Pommes (oder wahlweise Kroketten)" },
            { id: "f6", name: "Schnitzel Sandwich", prices: [9.00], desc: "Mit großem Schnitzel Wiener Art", noOptions: true }
        ]
    },
    baguettes: {
        title: "Baguettes",
        sizes: [{id: "std", label: "Standard", priceIndex: 0}],
        items: [
            { id: "b1", name: "Salami Baguette", prices: [7.00], desc: "Salami, Käse, Eisbergsalat, Gurke, Tomate" },
            { id: "b2", name: "Schinken Baguette", prices: [7.00], desc: "Schinken, Käse, Eisbergsalat, Gurke, Tomate" },
            { id: "b3", name: "Hawaii Baguette", prices: [7.00], desc: "Schinken, Ananas, Käse, Eisbergsalat" },
            { id: "b4", name: "Spezial Baguette", prices: [8.50], desc: "Salami, Schinken, Käse, Eisbergsalat, Gurke, Tomate" }
        ]
    },
    menus: {
        title: "Spar-Menüs",
        sizes: [{id: "std", label: "Menü", priceIndex: 0}],
        items: [
            { id: "m1", name: "Menü 1", prices: [25.00], desc: "1x Riesenrad 50cm Pizza (Wahl 1-17), 1x Großer Salat, 1L Getränk" },
            { id: "m2", name: "Menü 2", prices: [24.00], desc: "2x Pizza 32cm (Wahl 1-17), 1x Großer Salat, 1L Getränk" },
            { id: "m3", name: "Menü 3", prices: [24.00], desc: "2x Nudelgericht (außer Special), 1x Großer Salat, 1L Getränk" },
            { id: "m4", name: "Menü 4", prices: [24.00], desc: "1x Pizza 32cm (1-17), 1x Nudelgericht (außer Special), 1x Großer Salat, 1L Getränk" },
            { id: "m5", name: "Menü 5", prices: [17.00], desc: "1x Pizza 32cm ODER Nudelgericht, 1x kleiner Salat, 1L Getränk oder 0,5L Bier" }
        ]
    },
    drinks: {
        title: "Getränke",
        sizes: [{id: "std", label: "Flasche", priceIndex: 0}],
        items: [
            { id: "d1", name: "Coca Cola", prices: [2.50], pricesLarge: [3.50], hasLarge: true, desc: "Wahlweise als Dose (0,33L) oder Flasche (1,0L)" },
            { id: "d2", name: "Fanta", prices: [2.50], pricesLarge: [3.50], hasLarge: true, desc: "Wahlweise als Dose (0,33L) oder Flasche (1,0L)" },
            { id: "d3", name: "Sprite", prices: [2.50], pricesLarge: [3.50], hasLarge: true, desc: "Wahlweise als Dose (0,33L) oder Flasche (1,0L)" },
            { id: "d4", name: "MezzoMix", prices: [2.50], pricesLarge: [3.50], hasLarge: true, desc: "Wahlweise als Dose (0,33L) oder Flasche (1,0L)" },
            { id: "d5", name: "Fuze Tea", prices: [3.00], desc: "0,4L Flasche" },
            { id: "d6", name: "Zirndorfer Bier", prices: [3.00], desc: "0,5L Helles Bier" },
            { id: "d7", name: "Beck's Pils", prices: [3.00], desc: "0,5L Flasche" },
            { id: "d8", name: "Beck's Lemon", prices: [3.00], desc: "0,33L Flasche" },
            { id: "d9", name: "Lambrusco", prices: [8.00], desc: "0,7L Flasche" },
            { id: "d10", name: "Rotwein / Weißwein", prices: [7.00], desc: "0,7L Flasche", options: ["Rotwein", "Weißwein"] },
            { id: "d11", name: "Italienische Qualitätsweine", prices: [9.00], desc: "0,7L Flasche", options: ["Chianti", "Merlot", "Montepulciano", "Bardolino"] }
        ]
    }
};

db.serialize(() => {
    db.run(`CREATE TABLE categories (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        data_json TEXT
    )`);

    db.run(`CREATE TABLE items (
        id TEXT PRIMARY KEY,
        category_id TEXT,
        name TEXT,
        description TEXT,
        data_json TEXT,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    )`);

    db.run(`CREATE TABLE prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id TEXT,
        size_index INTEGER,
        price REAL,
        price_large REAL,
        FOREIGN KEY(item_id) REFERENCES items(id)
    )`);

    for (const [catKey, catData] of Object.entries(MENU_DATA)) {
        const catJson = JSON.stringify({
            sizes: catData.sizes,
            extraPriceMap: catData.extraPriceMap,
            options: catData.options,
            extras: catData.extras
        });

        db.run(`INSERT INTO categories (id, title, description, data_json) VALUES (?, ?, ?, ?)`, 
            [catKey, catData.title, catData.description || "", catJson]);

        for (const item of catData.items) {
            const itemJson = JSON.stringify({
                noFam: item.noFam,
                onlySmall: item.onlySmall,
                hasLarge: item.hasLarge,
                isSpecial: item.isSpecial,
                noOptions: item.noOptions,
                options: item.options
            });

            db.run(`INSERT INTO items (id, category_id, name, description, data_json) VALUES (?, ?, ?, ?, ?)`,
                [item.id, catKey, item.name, item.desc || "", itemJson]);
            
            if (item.prices) {
                item.prices.forEach((price, index) => {
                    db.run(`INSERT INTO prices (item_id, size_index, price, price_large) VALUES (?, ?, ?, ?)`,
                        [item.id, index, price, item.pricesLarge ? item.pricesLarge[0] : null]);
                });
            }
        }
    }
    
    console.log("Database initialized successfully.");
});

db.close();
