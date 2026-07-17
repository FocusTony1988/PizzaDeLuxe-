window.scrollToCategory = function(id) {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 140; 
        window.scrollTo({top: y, behavior: 'smooth'});
        window.state.activeCategory = id;
        document.querySelectorAll('nav button, aside button').forEach(btn => {
            if(btn.textContent === window.MENU_DATA[id].title) {
                btn.className = btn.className.replace('text-gray-600', 'bg-pizza-red text-white shadow-md').replace('hover:bg-gray-100', '');
            } else {
                btn.className = "whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors text-gray-600 hover:bg-gray-100";
                if (btn.parentElement.tagName === "ASIDE") btn.className = "text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100";
            }
        });
    }
};
window.getCategoryBanner = function(key, category) {
    if (key === 'pizzas') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-red-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">🍕</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <div class="absolute top-0 right-0 p-4 opacity-5 text-pizza-red pointer-events-none">
                        ${window.ICONS.pizza.replace('width="24"', 'width="80"').replace('height="24"', 'height="80"')}
                    </div>
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere Pizza <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed relative z-10">Alle unsere Pizzen werden aus Weizenmehl hergestellt sowie mit Käse ₍₇₎ und wahlweise <strong class="text-gray-800">Tomatensoße</strong>, <strong class="text-gray-800">BBQ Soße</strong> ₍ₐ, ₕ, ᵢ₎ oder <strong class="text-gray-800">Sahne Soße</strong> ₍₇₎ belegt.</p>
                    <div class="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 inline-flex items-center gap-2 self-start shadow-sm relative z-10 flex-wrap">
                        <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Extra Zutat:</span> 
                        <span class="text-xs text-pizza-red font-bold bg-red-50 px-2 py-1 rounded border border-red-100">0,50 € <span class="text-[10px] text-red-500 uppercase font-medium">für 26/32cm</span></span> 
                        <span class="text-gray-300 hidden sm:inline">|</span> 
                        <span class="text-xs text-pizza-red font-bold bg-red-50 px-2 py-1 rounded border border-red-100">1,00 € <span class="text-[10px] text-red-500 uppercase font-medium">für 50cm</span></span>
                    </div>
                </div>
            </div>
        `;
    } else if (key === 'creations') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-orange-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">🌟</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <div class="absolute top-0 right-0 p-4 opacity-5 text-pizza-red pointer-events-none">
                        ${window.ICONS.sparkle.replace('width="24"', 'width="80"').replace('height="24"', 'height="80"')}
                    </div>
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere De Luxe Kreationen <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed relative z-10">Spezielle Pizzen für die besten Kunden.<br>Wir haben zugehört und präsentieren euch unsere Sonderkreationen.</p>
                </div>
            </div>
        `;
    } else if (key === 'salads') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-green-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">🥗</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <div class="absolute top-0 right-0 p-4 opacity-5 text-green-600 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4.97 0-9-4.03-9-9 0-2.21.8-4.23 2.12-5.78C6.67 4.38 9.17 3 12 3s5.33 1.38 6.88 3.22C20.2 7.77 21 9.79 21 12c0 4.97-4.03 9-9 9z"/><path d="M12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                    </div>
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere Salate <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed relative z-10">Salate wahlweise mit diesen Dressings:<br><strong class="text-gray-800">Joghurt</strong> ₍₇, ₁₀₎, <strong class="text-gray-800">Balsamico</strong> ₍₁₀, ₁₂₎ oder <strong class="text-gray-800">Essig & Öl</strong> ₍₁₂₎</p>
                    <p class="text-xs text-pizza-red font-bold relative z-10">Alle Dressings sind hausgemacht.</p>
                </div>
            </div>
        `;
    } else if (key === 'baguettes') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-amber-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">🥖</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere Baguettes <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-sm text-gray-600 leading-relaxed relative z-10">Gut belegt und einfach lecker.</p>
                </div>
            </div>
        `;
    } else if (key === 'pasta') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-yellow-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">🍝</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <h3 class="font-extrabold text-pizza-red text-lg uppercase tracking-widest mb-3 relative z-10">Wahlweise Mit:</h3>
                    
                    <div class="grid grid-cols-3 gap-2 mb-4 relative z-10">
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-800 text-sm tracking-wide">SPAGHETTI</span>
                            <span class="text-[10px] text-gray-500 font-bold">I, M, N, 1, 3, 6</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-800 text-sm tracking-wide">RIGATONI</span>
                            <span class="text-[10px] text-gray-500 font-bold">I, M, N, 1, 3, 6</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-800 text-sm tracking-wide">TORTELLINI</span>
                            <span class="text-[10px] text-gray-500 font-bold">I, M, N, 1, 3, 6</span>
                        </div>
                    </div>
                    
                    <div class="bg-red-50 border border-red-100 rounded-lg px-3 py-2 inline-flex items-center gap-2 self-start shadow-sm relative z-10 flex-wrap">
                        <span class="text-xs font-bold text-pizza-red">Nudelgerichte mit Käse überbacken:</span> 
                        <span class="text-xs text-gray-700 font-medium">Klein: <strong class="text-pizza-red">+ 1,00 €</strong></span> 
                        <span class="text-gray-300 hidden sm:inline">|</span> 
                        <span class="text-xs text-gray-700 font-medium">Groß: <strong class="text-pizza-red">+ 2,00 €</strong></span>
                    </div>
                </div>
            </div>
        `;
    } else if (key === 'meat') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-red-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform -rotate-6 hover:rotate-0 transition-transform duration-300 cursor-default">🥩</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere Fleischgerichte <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed relative z-10">Jedes Gericht wird wahlweise mit <strong class="text-gray-800">Pommes</strong> oder <strong class="text-gray-800">Kroketten</strong> zubereitet.</p>
                    <p class="text-xs text-pizza-red font-bold relative z-10">Inkl. kleinem Beilagensalat (außer beim Sandwich).</p>
                </div>
            </div>
        `;
    } else if (key === 'menus') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-yellow-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform rotate-6 hover:rotate-0 transition-transform duration-300 cursor-default">🎁</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere Spar-Menüs <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed relative z-10">Perfekt zusammengestellt für den großen Hunger. Spare beim Bestellen von Pizza, Pasta, Salat und Getränk!</p>
                </div>
            </div>
        `;
    } else if (key === 'drinks') {
        return `
            <div class="mb-6 bg-white border-2 border-pizza-red rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch transform transition-all hover:shadow-lg animate-fade-in">
                <div class="bg-blue-50 sm:w-1/3 flex justify-center items-center relative overflow-hidden min-h-[120px] p-4">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
                    <span class="text-6xl sm:text-7xl drop-shadow-md z-10 relative transform -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">🥤</span>
                </div>
                <div class="p-5 sm:w-2/3 flex flex-col justify-center bg-white relative">
                    <h3 class="font-extrabold text-gray-800 text-lg sm:text-xl uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">Unsere Getränke <span class="text-yellow-400 text-sm sm:text-base tracking-tighter" title="5 Sterne Qualität">★★★★★</span></h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed relative z-10">Erfrischende Softdrinks, regionales Zirndorfer Bier oder eine Flasche Wein als perfekte Begleitung zu deinem Menü.</p>
                </div>
            </div>
        `;
    }
    
    return category.description ? `<p class="text-gray-500 text-sm mb-6 italic flex items-start gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 shadow-sm">${window.ICONS.info.replace('width="16"', 'width="14"')} ${category.description}</p>` : '';
};

window.renderApp = function() {
    const app = document.getElementById('app-container');
    const isOpen = window.getIsOpen();
    
    let html = `
        <header class="bg-pizza-red text-white p-4 sticky top-0 z-40 shadow-md w-full">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <div class="cursor-pointer" onclick="window.scrollTo(0,0)">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 p-1">
                        <img src="/pizzadeluxe_logo_T (2).png" alt="Pizza De Luxe" class="max-w-full max-h-full object-contain" />
                    </div>
                    <p class="text-xs opacity-90 flex items-center gap-1 mt-1 text-white">
                        ${window.ICONS.mapPin.replace('width="16"', 'width="12"').replace('height="16"', 'height="12"').replace('currentColor', '#fff')} Nürnberger Str. 46, Zirndorf
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <a href="https://www.instagram.com/pizza_deluxe_/" target="_blank" class="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-2 rounded-full shadow hover:opacity-90 transition active:scale-95 flex items-center justify-center" title="Folge uns auf Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <button onclick="openCart()" class="lg:hidden relative bg-white text-pizza-red p-2 rounded-full shadow hover:bg-gray-100 transition active:scale-95">
                        ${window.ICONS.shoppingCart.replace('width="24"', 'width="20"').replace('height="24"', 'height="20"')}
                        <span id="cart-badge" class="${window.state.cart.length > 0 ? '' : 'hidden'} absolute -top-1 -right-1 bg-yellow-400 text-pizza-red text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">${window.state.cart.length}</span>
                    </button>
                    <div class="text-right">
                        ${isOpen ? `<span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 border border-green-200">${window.ICONS.clock.replace('width="16"', 'width="12"').replace('height="16"', 'height="12"').replace('currentColor', '#15803d')} <span class="hidden sm:inline">GEÖFFNET</span></span>` : `<span class="bg-pizza-red-light text-pizza-red text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 border border-pizza-red">${window.ICONS.clock.replace('width="16"', 'width="12"').replace('height="16"', 'height="12"').replace('currentColor', '#C62828')} <span class="hidden sm:inline">GESCHLOSSEN</span></span>`}
                    </div>
                </div>
            </div>
        </header>
        
        <nav class="sticky top-[73px] z-30 bg-white border-b shadow-sm">
            <div class="flex w-full overflow-x-auto p-2 space-x-2 scrollbar-hide">
                ${Object.entries(window.MENU_DATA).map(([key, data]) => `
                    <button onclick="scrollToCategory('${key}')" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${window.state.activeCategory === key ? 'bg-pizza-red text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}">${data.title}</button>
                `).join('')}
            </div>
        </nav>

        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-8 lg:p-6">
            <aside class="hidden lg:block lg:w-1/5 sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pr-4 custom-scrollbar">
                <h3 class="text-gray-500 font-bold text-xs uppercase mb-4 tracking-wider">Kategorien</h3>
                <div class="flex flex-col gap-2">
                     ${Object.entries(window.MENU_DATA).map(([key, data]) => `
                        <button onclick="scrollToCategory('${key}')" class="text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${window.state.activeCategory === key ? 'bg-pizza-red text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}">${data.title}</button>
                    `).join('')}
                </div>
            </aside>

            <main class="flex-1 p-4 lg:p-0 pb-20 lg:pb-0">
                <!-- Bestellhinweis Banner -->
                <div class="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 shadow-sm flex items-start gap-3 animate-fade-in">
                    <span class="text-2xl mt-0.5">⚠️</span>
                    <div class="text-xs sm:text-sm">
                        <h4 class="font-bold text-amber-950 mb-0.5">Wichtiger Hinweis zur Bestellung</h4>
                        <p class="leading-relaxed opacity-95">Diese Seite ist kein klassischer Online-Shop. Deine Bestellung wird als Entwurf per <strong>WhatsApp</strong> an uns übermittelt und erst dort bestätigt. Die Bezahlung erfolgt bar bei Übergabe (im Geschäft oder bei Lieferung).</p>
                    </div>
                </div>

                <!-- Instagram Promo Banner -->
                <div class="mb-8 bg-gradient-to-r from-purple-900 via-pink-600 to-red-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="flex items-center gap-4">
                        <span class="text-4xl">📸</span>
                        <div>
                            <h4 class="font-bold text-lg">Folge uns auf Instagram!</h4>
                            <p class="text-xs sm:text-sm opacity-90">Bleibe immer auf dem Laufenden über Angebote und Specials.</p>
                        </div>
                    </div>
                    <a href="https://www.instagram.com/pizza_deluxe_/" target="_blank" class="w-full sm:w-auto text-center bg-white text-pink-600 font-bold px-6 py-2.5 rounded-xl hover:bg-pink-50 transition-colors shadow-md text-sm active:scale-95 whitespace-nowrap">@pizza_deluxe_</a>
                </div>

                <div class="space-y-10">
                    ${Object.entries(window.MENU_DATA).map(([key, category]) => `
                        <div id="${key}" class="scroll-mt-32">
                            <div class="flex items-baseline gap-3 mb-4 border-b pb-2 border-gray-200">
                                <h2 class="text-2xl font-bold text-gray-800">${category.title}</h2>
                            </div>
                            ${window.getCategoryBanner(key, category)}
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${category.items.map(item => `
                                    <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:border-pizza-red group flex flex-col justify-between h-full">
                                        <div>
                                            <div class="flex justify-between items-start mb-2">
                                                <h3 class="font-bold text-gray-800 group-hover:text-pizza-red transition-colors text-lg">${item.name}</h3>
                                                <span class="bg-red-50 text-pizza-red text-sm font-bold px-2 py-1 rounded">${(item.prices && item.prices[0]) ? item.prices[0].toFixed(2) : '0.00'}€</span>
                                            </div>
                                            <p class="text-xs text-gray-500 leading-relaxed mb-4">${item.desc || ''}</p>
                                        </div>
                                        <button onclick="openItemModal('${item.id}', '${key}')" class="w-full bg-gray-50 text-pizza-red font-bold py-2.5 rounded-lg border border-gray-200 hover:bg-pizza-red hover:text-white hover:border-pizza-red transition-all text-sm flex items-center justify-center gap-2 active:scale-95">Wählen</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </main>

            <aside class="hidden lg:block lg:w-1/4 sticky top-32 self-start h-[calc(100vh-8rem)]">
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col max-h-full">
                    <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 class="font-bold text-lg flex items-center gap-2 text-gray-800">${window.ICONS.shoppingCart.replace('width="24"', 'width="20"')} Warenkorb</h2>
                        <span class="bg-pizza-red text-white text-xs px-2 py-0.5 rounded-full font-bold">${window.state.cart.length}</span>
                    </div>
                    <div id="desktop-cart-items" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"></div>
                    <div class="p-4 bg-white border-t border-gray-200">
                        <div class="flex justify-between text-lg font-bold mb-4 text-gray-800"><span>Summe:</span><span class="text-pizza-red" id="desktop-cart-total">0.00€</span></div>
                        <p class="text-[10px] text-gray-500 mb-3 text-center leading-tight">Kein Online-Shop: Bestellung wird per WhatsApp gesendet. Bezahlung bar bei Übergabe.</p>
                        <button onclick="handleCheckout()" class="w-full bg-[#25D366] text-white font-bold py-3 rounded-lg shadow hover:bg-green-600 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5">${window.ICONS.whatsapp} <span>Bestellen</span></button>
                    </div>
                </div>
            </aside>
        </div>
        <footer class="mt-12 bg-gray-900 text-gray-400 py-10 w-full animate-fade-in">
            <div class="max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row justify-between items-start gap-8">
                <div>
                    <h4 class="text-white font-bold mb-2">Pizza De Luxe Zirndorf</h4>
                    <p class="text-sm">Nürnberger Str. 46, 90513 Zirndorf</p>
                    <p class="text-xs text-gray-500 mt-2">© 2026 Pizza De Luxe. Alle Rechte vorbehalten.</p>
                </div>
                <div class="text-sm">
                    <p class="font-bold text-gray-300 mb-1">Social Media</p>
                    <a href="https://www.instagram.com/pizza_deluxe_/" class="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5 justify-center lg:justify-start" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        <span>@pizza_deluxe_</span>
                    </a>
                </div>
                <div class="text-sm">
                    <p class="font-bold text-gray-300 mb-2">Rechtliches</p>
                    <div class="flex flex-col gap-1">
                        <p class="text-gray-400">Nagem Elrai - Einzelunternehmer</p>
                        <div class="mt-2 flex gap-4 justify-center lg:justify-start">
                            <a href="https://www.pizza-deluxe-zirndorf.de/impressum-datenschutz/" class="text-pizza-red hover:text-white transition-colors font-medium underline" target="_blank">Impressum</a>
                            <a href="https://www.pizza-deluxe-zirndorf.de/impressum-datenschutz/" class="text-pizza-red hover:text-white transition-colors font-medium underline" target="_blank">Datenschutzerklärung</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div id="cart-fab" class="${window.state.cart.length > 0 ? 'lg:hidden' : 'hidden'} fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-40 max-w-lg mx-auto shadow-[0_-5px_10px_rgba(0,0,0,0.1)]">
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-gray-700"><span id="fab-count">${window.state.cart.length}</span> Artikel</span>
                <span class="font-bold text-xl text-pizza-red" id="fab-total">${window.state.cart.reduce((sum, i) => sum + i.selectedPrice, 0).toFixed(2)}€</span>
            </div>
            <button onclick="openCart()" class="w-full bg-pizza-red text-white font-bold py-3 rounded-lg shadow-lg hover:bg-pizza-red-dark transition flex justify-center items-center gap-2 active:scale-95">
                <span>Zum Warenkorb</span> ${window.ICONS.shoppingCart.replace('width="24"', 'width="20"')}
            </button>
        </div>

        <div id="cookie-banner" class="hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 sm:p-6 z-[100]">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-600 text-center sm:text-left">
                    Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Weitere Informationen zum Datenschutz finden Sie in unserer <a href="https://www.pizza-deluxe-zirndorf.de/datenschutz" class="text-pizza-red hover:underline font-bold" target="_blank">Datenschutzerklärung</a>.
                </div>
                <button onclick="acceptCookies()" class="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md">Verstanden</button>
            </div>
        </div>
    `;
    app.innerHTML = html;
    window.updateDesktopCart();

    // Check cookies after render
    setTimeout(() => {
        if (!localStorage.getItem('cookieConsent')) {
            document.getElementById('cookie-banner').classList.remove('hidden');
        }
    }, 500);
};

window.acceptCookies = function() {
    localStorage.setItem('cookieConsent', 'true');
    document.getElementById('cookie-banner').classList.add('hidden');
};

window.updateGlobalState = function(field, value) {
    window.state.customerInfo[field] = value;
    const dEl = document.getElementById(`desktop-${field}`);
    const mEl = document.getElementById(`mobile-${field}`);
    if(dEl && document.activeElement !== dEl) dEl.value = value;
    if(mEl && document.activeElement !== mEl) mEl.value = value;
    
    if (value.trim() !== "") {
         window.state.missingFields[field] = false;
         if(dEl) dEl.classList.remove('border-red-500', 'bg-red-50');
         if(mEl) mEl.classList.remove('border-red-500', 'bg-red-50');
    }
};

window.selectPizzaSauce = function(value) {
    window.state.selectedItem.selectedSauce = value;
    document.querySelectorAll('[id^="sauce-label-"]').forEach(lbl => {
        lbl.className = "flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors";
    });
    const selectedId = value === "Tomatensoße" ? "tomato" : (value === "BBQ-Soße" ? "bbq" : (value === "Sahnesoße" ? "cream" : "none"));
    const selectedLbl = document.getElementById(`sauce-label-${selectedId}`);
    if (selectedLbl) {
        selectedLbl.className = "flex items-center space-x-3 p-3 border border-pizza-red bg-red-50 rounded-lg cursor-pointer transition-colors";
    }
};

window.openItemModal = function(itemId, categoryKey) {
    const category = window.MENU_DATA[categoryKey];
    const item = category.items.find(i => i.id === itemId);
    const isPizza = category.title === "Pizza" || category.title === "De Luxe Kreationen";
    const hasSauce = isPizza && item.id !== 'p0';
    const itemOptions = item.options || (category.options && typeof category.options[0] === 'string' ? category.options : null);
    window.state.selectedItem = { 
        item, 
        category, 
        categoryKey, 
        selectedSizeIdx: 0, 
        notes: '', 
        selectedOptions: [], 
        selectedSauce: hasSauce ? "Tomatensoße" : undefined, 
        selectedChoice: (itemOptions && itemOptions.length > 0) ? itemOptions[0] : undefined,
        menuSelections: category.title === "Spar-Menüs" ? {} : undefined 
    };
    
    let sizes = category.sizes || [];
    if (item.noFam) sizes = sizes.filter(s => s.id !== '50cm');
    if (item.onlySmall) sizes = sizes.filter(s => s.id !== '32cm' && s.id !== '50cm');
    const isMeatWithLarge = category.title === "Fleischgerichte" && item.hasLarge;
    const isDrinkWithLarge = category.title === "Getränke" && item.hasLarge;
    if (isMeatWithLarge) sizes = [{ id: "std", label: "Normal", price: item.prices[0] }, { id: "large", label: "Große Portion", price: item.pricesLarge[0] }];
    else if (isDrinkWithLarge) sizes = [{ id: "std", label: "0,33L Dose", price: item.prices[0] }, { id: "large", label: "1,0L Flasche", price: item.pricesLarge[0] }];
    else if (category.title === "Fleischgerichte") sizes = [{ id: "std", label: "Normal", price: item.prices[0] }];
    window.state.selectedItem.effectiveSizes = sizes;

    const showIngredientsList = (category.title === "Pizza" || category.title === "De Luxe Kreationen") && (item.id !== 'p0' && item.id !== 'p0m');
    let content = `<div id="item-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in" onclick="if(event.target.id==='item-modal') closeModal()"><div class="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col"><div class="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100"><h3 class="text-xl font-bold truncate pr-4 text-gray-900">${item.name}</h3><button onclick="closeModal()" class="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">${window.ICONS.x.replace('width="24"', 'width="20"')}</button></div><div class="p-6 pt-4 space-y-6">`;

    if (category.title === "Spar-Menüs") {
        content += renderMenuInputs(item);
    } else {
        content += `<p class="text-gray-500 text-sm leading-relaxed">${item.desc || ''}</p><div class="space-y-2"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wide">Größe</label><div class="grid grid-cols-1 gap-2" id="size-selection">`;
        sizes.forEach((size, idx) => {
            let base = 0;
            if (isMeatWithLarge || category.title === "Fleischgerichte" || category.title === "Baguettes" || category.title === "Getränke") base = size.price || item.prices[0];
            else { const pIdx = size.priceIndex; base = item.prices[pIdx] || item.prices[0]; }
            const isActive = idx === 0;
            const activeClass = isActive ? 'border-pizza-red bg-pizza-red text-white shadow-md transform scale-[1.02]' : 'border-gray-200 text-gray-600 hover:bg-gray-50';
            content += `<button onclick="selectSize(${idx})" id="size-btn-${idx}" class="size-button transition-all duration-200 w-full flex justify-between items-center p-3.5 rounded-xl border text-left ${activeClass}"><span class="font-medium">${size.label}</span><span class="font-bold">${(base || 0).toFixed(2)}€</span></button>`;
        });
        content += `</div></div>`;

        if (hasSauce) {
            content += `
                <div class="space-y-2">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide">Soße (Standard: Tomatensoße)</label>
                    <div class="grid grid-cols-2 gap-2">
                        <label class="flex items-center space-x-3 p-3 border border-pizza-red bg-red-50 rounded-lg cursor-pointer transition-colors" id="sauce-label-tomato">
                            <input type="radio" name="pizza-sauce" value="Tomatensoße" checked onchange="selectPizzaSauce(this.value)" class="text-pizza-red focus:ring-pizza-red w-4 h-4 accent-red-600" />
                            <span class="text-sm font-medium text-gray-700">Tomatensoße</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" id="sauce-label-bbq">
                            <input type="radio" name="pizza-sauce" value="BBQ-Soße" onchange="selectPizzaSauce(this.value)" class="text-pizza-red focus:ring-pizza-red w-4 h-4 accent-red-600" />
                            <span class="text-sm font-medium text-gray-700">BBQ-Soße</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" id="sauce-label-cream">
                            <input type="radio" name="pizza-sauce" value="Sahnesoße" onchange="selectPizzaSauce(this.value)" class="text-pizza-red focus:ring-pizza-red w-4 h-4 accent-red-600" />
                            <span class="text-sm font-medium text-gray-700">Sahnesoße</span>
                        </label>
                        <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" id="sauce-label-none">
                            <input type="radio" name="pizza-sauce" value="Ohne Soße" onchange="selectPizzaSauce(this.value)" class="text-pizza-red focus:ring-pizza-red w-4 h-4 accent-red-600" />
                            <span class="text-sm font-medium text-gray-700">Ohne Soße</span>
                        </label>
                    </div>
                </div>
            `;
        }

        const itemOptions = item.options || (category.options && typeof category.options[0] === 'string' ? category.options : null);
        if (itemOptions && !item.noOptions) {
            content += `<div class="space-y-2"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wide">Auswahl</label><div class="grid grid-cols-2 gap-2">`;
            itemOptions.forEach((opt, oIdx) => { 
                const isActive = window.state.selectedItem.selectedChoice === opt;
                content += `<label class="flex items-center space-x-3 p-3 border ${isActive ? 'border-pizza-red bg-red-50' : 'border-gray-200'} rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" id="choice-label-${oIdx}"><input type="radio" name="choice" value="${opt}" ${isActive ? 'checked' : ''} onchange="selectChoice(this.value, ${oIdx}, ${itemOptions.length})" class="text-pizza-red focus:ring-pizza-red w-4 h-4 accent-red-600" /><span class="text-sm font-medium text-gray-700">${opt}</span></label>`; 
            });
            content += `</div></div>`;
        }
        if (category.options && typeof category.options[0] === 'object') {
            content += `<div class="space-y-2"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wide">Nudelsorte</label><div class="flex gap-2">`;
            category.options.forEach(opt => { 
                const safeId = opt.name.replace(/\s+/g, '');
                content += `<button onclick="selectPasta('${opt.name}')" id="pasta-btn-${safeId}" class="pasta-button flex-1 py-3 text-sm rounded-lg border transition-all border-gray-200 text-gray-600 font-medium hover:bg-gray-50" data-choice="${opt.name}">${opt.name}</button>`; 
            });
            content += `</div></div>`;
        }
        if (category.extras) {
            const applicableExtras = category.extras.filter(extra => !(extra.name === "Käserand" && item.noCheeseCrust));
            if (applicableExtras.length > 0) {
                content += `<div class="p-4 bg-yellow-50 rounded-xl border border-yellow-100"><p class="text-xs text-yellow-800 font-bold uppercase mb-3">Extras</p><div class="space-y-2">`;
                applicableExtras.forEach(extra => { content += `<label class="flex items-center justify-between cursor-pointer group"><span class="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">${extra.name} (+<span class="extra-price-display" data-small="${extra.priceSmall}" data-large="${extra.priceLarge}">${(extra.priceSmall || 0).toFixed(2)}</span>€)</span><input type="checkbox" onchange="toggleExtra('${extra.name}', ${extra.priceSmall}, ${extra.priceLarge}, this.checked)" class="rounded text-pizza-red focus:ring-pizza-red w-5 h-5 border-gray-300 accent-red-600" /></label>`; });
                content += `</div></div>`;
            }
        }
        if (showIngredientsList) {
            let ePrice = category.extraPriceMap[0];
            content += `<div class="space-y-2"><div class="flex justify-between items-center"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wide">Zutaten extra</label><span id="ing-price-label" class="text-[10px] font-bold text-pizza-red bg-red-50 px-2 py-1 rounded-full border border-red-100">+${(ePrice || 0).toFixed(2)}€ / Zutat</span></div><div class="h-48 overflow-y-auto border border-gray-200 rounded-xl p-3 grid grid-cols-1 gap-2 bg-gray-50/50 custom-scrollbar">`;
            window.EXTRA_INGREDIENTS.forEach(ing => { content += `<label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"><input type="checkbox" onchange="toggleIngredient('${ing}', this.checked)" class="rounded text-pizza-red focus:ring-pizza-red w-4 h-4 border-gray-300 accent-red-600" /><span class="text-sm text-gray-700">${ing}</span></label>`; });
            content += `</div></div>`;
        }
    }
    
    const currentPrice = window.calculatePrice();
    content += `<div class="pt-4"><label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Anmerkung</label><input type="text" id="item-notes" oninput="window.state.selectedItem.notes = this.value" class="w-full border border-gray-300 rounded-xl p-3 text-sm focus:border-pizza-red focus:ring-1 focus:ring-pizza-red outline-none transition-shadow" placeholder="z.B. schneiden, knusprig..." /></div></div><div class="sticky bottom-0 bg-white p-4 border-t border-gray-100 shadow-negative"><button id="add-to-cart-btn" onclick="addToCart()" class="w-full bg-pizza-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-pizza-red-dark hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2 active:scale-95"><span>Hinzufügen</span><div class="bg-white/20 px-2 py-0.5 rounded text-sm" id="modal-price">${(currentPrice || 0).toFixed(2)}€</div></button></div></div></div>`;
    document.getElementById('modal-layer').innerHTML = content;
    document.body.classList.add('modal-open');
};

window.closeModal = function() { 
    document.getElementById('modal-layer').innerHTML = ''; 
    window.state.selectedItem = null;
    document.body.classList.remove('modal-open'); 
};
