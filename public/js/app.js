// --- 1. DATEN & KONFIGURATION ---
window.RESTAURANT_NUMBER = "499116007779"; // Deine WhatsApp Nummer
window.GEMINI_API_KEY = ""; // API Key hier einfügen falls vorhanden
window.GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

window.OPENING_HOURS = {
    1: { open: "16:30", close: "22:00" }, 2: { open: null, close: null }, 3: { open: "16:30", close: "22:00" },
    4: { open: "16:30", close: "22:00" }, 5: { open: "16:30", close: "22:00" }, 6: { open: "16:30", close: "22:00" },
    0: { open: "15:00", close: "21:00" }
};

window.EXTRA_INGREDIENTS = [
    "Frische Tomaten", "Frische Champignons", "Austernpilze", "Brokkoli", "Zucchini", "Aubergine", "Frische Paprika", 
    "Peperoni", "Blattspinat", "Mais", "Artischocken", "Oliven", "Rucola", "Kidneybohnen", "Jalapenos", "Zwiebeln", 
    "Knoblauch", "Chili", "Basilikum", "Ananas", "Gekochtes Ei", "Mozzarella", "Gorgonzola", "Parmesan", "Fetakäse", 
    "Salami", "Scharfe Salami", "Schinken", "Räucherspeck", "Hackfleisch vom Rind", "Sucuk", 
    "Gewürztes Putenfleisch", "Thunfisch", "Sardellen", "Meeresfrüchte", "Shrimps"
];

// MENU_DATA wird jetzt über die API geladen
window.MENU_DATA = {};

// --- 2. GLOBAL STATE ---
window.state = {
    cart: [],
    activeCategory: 'pizzas',
    selectedItem: null,
    isCartOpen: false,
    customerInfo: { name: "", address: "", notes: "" },
    missingFields: { name: false, address: false },
    geminiSuggestion: null, 
    suggestionLoading: false
};

// --- 3. ICONS ---
window.ICONS = {
    pizza: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 8 8 10z"/><path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/><path d="M16.5 9.5l-3-3"/><path d="M7.5 9.5l3-3"/></svg>',
    mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    shoppingCart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.67 12.83a2 2 0 0 0 2 1.62h9.72a2 2 0 0 0 2-1.62l1.63-8.83H6.5"/></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M15 6V4c0-1-1-2-2-2h-2c-1 0-2 1-2 2v2"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    sparkle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 2.1c.5.8 1.1 1.5 1.8 2.1"/><path d="M12 21.66c1.7 0 3.4-.5 5-1.5 1.7-1 3-2.6 3.9-4.4 1-1.8 1.4-3.8 1.1-5.8-.3-2-1.2-3.8-2.6-5.2-1.4-1.4-3.2-2.3-5.2-2.6-2-.3-4 .1-5.8 1.1-1.8.9-3.4 2.2-4.4 3.9-1 1.7-1.5 3.5-1.5 5.2 0 1.7.5 3.4 1.5 5.1"/><path d="M16 11l2 2"/><path d="M11 16l2 2"/><path d="M14 8l2 2"/></svg>'
};

// App Initialization
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        
        // Da die JSON-Schlüssel (pizzas, pasta etc.) eventuell durch die DB unsortiert zurückkommen können,
        // und die Frontend-Logik Arrays (prices) erwartet: Wir stellen sicher, dass null-Werte im Array sauber behandelt werden
        window.MENU_DATA = data;
        
        window.renderApp();
    } catch (e) {
        console.error("Fehler beim Laden der Menü-Daten:", e);
        document.getElementById('app-container').innerHTML = `<div class="p-10 text-center text-red-500 font-bold">Fehler beim Laden der Daten vom Server.</div>`;
    }
});

// Helper Functions
window.getIsOpen = function() {
    const now = new Date();
    const dateString = now.toLocaleString('en-US', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
    const [dayStr, timeStr] = dateString.split(', ')[0].split(' ');
    const dayMap = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 0 };
    let day = now.getDay();
    try { if (dayMap[dayStr] !== undefined) day = dayMap[dayStr]; } catch (e) {}
    const [hours, minutes] = timeStr.split(':').map(Number);
    const timeVal = hours * 60 + minutes;
    const schedule = window.OPENING_HOURS[day];
    if (!schedule || !schedule.open) return false;
    const [openH, openM] = schedule.open.split(':').map(Number);
    const [closeH, closeM] = schedule.close.split(':').map(Number);
    const openVal = openH * 60 + openM;
    const closeVal = closeH * 60 + closeM;
    return timeVal >= openVal && timeVal <= closeVal;
};

window.getSuggestionPrompt = function(cartItems) {
    const itemNames = cartItems.map(item => item.name).join(', ');
    const total = cartItems.reduce((sum, item) => sum + item.selectedPrice, 0).toFixed(2);
    return `Analyze the following order from a German/Italian pizzeria: ${itemNames} (Total: ${total}€). Suggest one short complementary item.`;
};

window.fetchGeminiSuggestion = async function(cartItems) {
    if (window.state.suggestionLoading || cartItems.length === 0) return;
    window.state.suggestionLoading = true;
    window.state.geminiSuggestion = null;
    window.renderApp();

    const userQuery = window.getSuggestionPrompt(cartItems);
    const payload = { contents: [{ parts: [{ text: userQuery }] }] };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${window.GEMINI_MODEL}:generateContent?key=${window.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            window.state.geminiSuggestion = result.candidates[0].content.parts[0].text;
        }
    } catch (e) {
        console.error(e);
    }
    window.state.suggestionLoading = false;
    if(window.state.isCartOpen) window.renderCart();
    window.updateDesktopCart();
};
