window.updateDesktopCart = function() {
    const container = document.getElementById('desktop-cart-items');
    const totalEl = document.getElementById('desktop-cart-total');
    if (!container || !totalEl) return;

    const cartTotal = window.state.cart.reduce((sum, item) => sum + item.selectedPrice, 0);
    totalEl.textContent = `${cartTotal.toFixed(2)}€`;

    if (window.state.cart.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-400 py-8"><p class="mt-2 text-sm">Noch leer...</p></div>`;
        container.innerHTML += `
             <div class="mt-6 pt-4 border-t border-gray-200 space-y-3 opacity-50 pointer-events-none">
                <h4 class="font-bold text-gray-700 text-sm flex items-center gap-2">${window.ICONS.mapPin.replace('width="16"', 'width="14"')} Lieferdaten</h4>
                <input type="text" placeholder="Name *" class="w-full border border-gray-300 p-2 rounded text-sm bg-gray-100">
             </div>
        `;
        return;
    }

    let html = window.state.cart.map(item => `
        <div class="bg-gray-50 p-3 rounded-lg border-l-4 border-pizza-red relative group hover:bg-white hover:shadow-sm transition-all">
            <button onclick="removeFromCart('${item.uniqueId}')" class="absolute top-2 right-2 text-gray-300 hover:text-pizza-red transition-colors opacity-0 group-hover:opacity-100">${window.ICONS.trash.replace('width="16"', 'width="14"')}</button>
            <h4 class="font-bold text-sm text-gray-800 pr-6">${item.name}</h4>
            <p class="text-xs text-gray-500">${item.selectedSize}</p>
            ${item.selectedOptions.length > 0 ? `<p class="text-xs text-gray-500 mt-1">+ ${item.selectedOptions.join(", ")}</p>` : ''}
            <p class="text-pizza-red font-bold text-sm mt-1 text-right">${item.selectedPrice.toFixed(2)}€</p>
        </div>
    `).join('');

    html += `
        <div class="mt-6 pt-4 border-t border-gray-200 space-y-3">
            <h4 class="font-bold text-gray-700 text-sm flex items-center gap-2">${window.ICONS.mapPin.replace('width="16"', 'width="14"')} Lieferdaten</h4>
            <input type="text" id="desktop-name" placeholder="Name *" value="${window.state.customerInfo.name}" oninput="updateGlobalState('name', this.value)" class="w-full border border-gray-300 p-2 rounded text-sm focus:border-pizza-red outline-none transition-colors ${window.state.missingFields.name ? 'border-red-500 bg-red-50' : ''}">
            <textarea id="desktop-address" placeholder="Adresse *" oninput="updateGlobalState('address', this.value)" class="w-full border border-gray-300 p-2 rounded text-sm h-16 outline-none transition-colors ${window.state.missingFields.address ? 'border-red-500 bg-red-50' : ''}">${window.state.customerInfo.address}</textarea>
            <input type="text" id="desktop-notes" placeholder="Anmerkung" value="${window.state.customerInfo.notes}" oninput="updateGlobalState('notes', this.value)" class="w-full border border-gray-300 p-2 rounded text-sm focus:border-pizza-red outline-none transition-colors">
        </div>
    `;
    container.innerHTML = html;
};

window.renderCart = function() {
     const cartTotal = window.state.cart.reduce((sum, item) => sum + item.selectedPrice, 0);
     let content = `
        <div class="fixed inset-0 z-[60] bg-gray-100 max-w-lg mx-auto flex flex-col h-full animate-fade-in">
            <div class="bg-white p-4 shadow-md flex justify-between items-center border-b border-gray-200">
                <h2 class="text-xl font-bold flex items-center gap-2 text-pizza-red">${window.ICONS.shoppingCart} Dein Warenkorb</h2>
                <button onclick="window.state.isCartOpen=false; document.getElementById('modal-layer').innerHTML='';" class="p-2 text-gray-500 hover:text-pizza-red transition-colors">${window.ICONS.x}</button>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
    `;

    if (window.state.cart.length === 0) {
        content += `<div class="text-center text-gray-500 mt-10"><p class="mt-4">Der Warenkorb ist leer.</p><button onclick="window.state.isCartOpen=false; document.getElementById('modal-layer').innerHTML='';" class="mt-4 text-pizza-red underline font-semibold">Zur Speisekarte</button></div>`;
    } else {
        window.state.cart.forEach(item => {
             content += `
                <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-pizza-red relative">
                    <button onclick="removeFromCart('${item.uniqueId}')" class="absolute top-2 right-2 text-gray-300 hover:text-pizza-red transition-colors p-2">${window.ICONS.trash}</button>
                    <h4 class="font-bold pr-6 text-gray-800">${item.name}</h4>
                    <p class="text-sm text-gray-600">${item.selectedSize}</p>
                    ${item.selectedOptions.length > 0 ? `<p class="text-xs text-gray-500">+ ${item.selectedOptions.join(" | ")}</p>` : ''}
                    <p class="text-pizza-red font-bold mt-1 text-right">${item.selectedPrice.toFixed(2)}€</p>
                </div>`;
        });
        
        content += `
             <div class="bg-white p-4 rounded-lg shadow-sm mt-6 border border-gray-100">
                <h3 class="font-bold text-gray-700 mb-3 flex items-center gap-2">${window.ICONS.mapPin} Lieferdaten</h3>
                <div class="space-y-3">
                    <input type="text" id="mobile-name" placeholder="Name *" value="${window.state.customerInfo.name}" oninput="updateGlobalState('name', this.value)" class="w-full border p-2 rounded outline-none border-gray-300 focus:border-pizza-red ${window.state.missingFields.name ? 'border-red-500 bg-red-50' : ''}">
                    <textarea id="mobile-address" placeholder="Adresse *" oninput="updateGlobalState('address', this.value)" class="w-full border p-2 rounded outline-none h-20 border-gray-300 focus:border-pizza-red ${window.state.missingFields.address ? 'border-red-500 bg-red-50' : ''}">${window.state.customerInfo.address}</textarea>
                    <input type="text" id="mobile-notes" placeholder="Anmerkung" value="${window.state.customerInfo.notes}" oninput="updateGlobalState('notes', this.value)" class="w-full border p-2 rounded border-gray-300 focus:border-pizza-red">
                </div>
             </div>
        `;
    }
    
    if (window.state.cart.length > 0) {
         content += `</div><div class="bg-white p-4 border-t border-gray-200 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]"><div class="flex justify-between text-xl font-bold mb-4 text-gray-800"><span>Gesamt:</span><span class="text-pizza-red">${cartTotal.toFixed(2)}€</span></div><p class="text-[10px] text-gray-500 mb-3 text-center leading-tight">Kein Online-Shop: Bestellung wird per WhatsApp gesendet. Bezahlung bar bei Übergabe.</p><button onclick="handleCheckout()" type="button" class="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-green-600 transition flex items-center justify-center gap-3 active:scale-95">${window.ICONS.whatsapp}<span class="text-lg">Bestellung per WhatsApp</span></button></div>`;
    } else {
        content += `</div>`;
    }
    
    content += `</div>`;
    document.getElementById('modal-layer').innerHTML = content;
};

window.openCart = function() {
    window.state.isCartOpen = true;
    document.body.classList.add('modal-open');
    window.renderCart();
};

window.closeCartModal = function() {
    window.state.isCartOpen = false;
    document.body.classList.remove('modal-open');
    document.getElementById('modal-layer').innerHTML = '';
}

window.selectSize = function(idx) {
    window.state.selectedItem.selectedSizeIdx = idx;
    const buttons = document.querySelectorAll('.size-button');
    buttons.forEach((btn, i) => {
        if (i === idx) btn.className = "size-button transition-all duration-200 w-full flex justify-between items-center p-3.5 rounded-xl text-left border-pizza-red bg-pizza-red text-white shadow-md transform scale-[1.02]";
        else btn.className = "size-button transition-all duration-200 w-full flex justify-between items-center p-3.5 rounded-xl text-left border-gray-200 text-gray-600 hover:bg-gray-50";
    });
    const { category, effectiveSizes } = window.state.selectedItem;
    if (document.getElementById('ing-price-label') && (category.title === "Pizza" || category.title === "De Luxe Kreationen")) {
        const extraPriceMap = category.extraPriceMap;
        let sizeKey = 0;
        if (effectiveSizes[idx].id === '32cm') sizeKey = 1;
        if (effectiveSizes[idx].id === '50cm') sizeKey = 2;
        document.getElementById('ing-price-label').textContent = `+${(extraPriceMap[sizeKey]||0).toFixed(2)}€ / Zutat`;
    }
    document.querySelectorAll('.extra-price-display').forEach(span => {
        const small = parseFloat(span.getAttribute('data-small'));
        const large = parseFloat(span.getAttribute('data-large'));
        const isLargeExtra = (category.title === "Pizza" || category.title === "De Luxe Kreationen") ? idx === 2 : idx > 0;
        span.textContent = (isLargeExtra ? large : small).toFixed(2);
    });
    window.updateModalPrice();
};

window.selectChoice = function(val, idx, total) { 
    window.state.selectedItem.selectedChoice = val; 
    if (idx !== undefined && total !== undefined) {
        for(let i=0; i<total; i++) {
            const lbl = document.getElementById(`choice-label-${i}`);
            if(lbl) {
                if (i === idx) lbl.className = "flex items-center space-x-3 p-3 border border-pizza-red bg-red-50 rounded-lg cursor-pointer transition-colors";
                else lbl.className = "flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors";
            }
        }
    }
};

window.selectPasta = function(name) {
    window.state.selectedItem.selectedChoice = name;
    const safeId = name.replace(/\s+/g, '');
    document.querySelectorAll('.pasta-button').forEach(btn => {
        if (btn.id === `pasta-btn-${safeId}`) btn.className = "pasta-button flex-1 py-3 text-sm rounded-lg border transition-all bg-pizza-red text-white font-bold shadow-md";
        else btn.className = "pasta-button flex-1 py-3 text-sm rounded-lg border transition-all border-gray-200 text-gray-600 font-medium hover:bg-gray-50";
    });
};

window.toggleExtra = function(name, pSmall, pLarge, checked) {
    const idx = window.state.selectedItem.selectedSizeIdx || 0;
    if (checked) {
        window.state.selectedItem.selectedOptions = window.state.selectedItem.selectedOptions.filter(o => !o.startsWith(name));
        const { category } = window.state.selectedItem;
        const isLargeExtra = (category.title === "Pizza" || category.title === "De Luxe Kreationen") ? idx === 2 : idx > 0;
        const price = isLargeExtra ? pLarge : pSmall;
        window.state.selectedItem.selectedOptions.push(`${name} (+${price.toFixed(2)}€)`);
    } else window.state.selectedItem.selectedOptions = window.state.selectedItem.selectedOptions.filter(o => !o.startsWith(name));
    window.updateModalPrice();
};

window.toggleIngredient = function(name, checked) {
    if (checked) window.state.selectedItem.selectedOptions.push(name); 
    else window.state.selectedItem.selectedOptions = window.state.selectedItem.selectedOptions.filter(o => o !== name);
    window.updateModalPrice();
};

window.calculatePrice = function() {
    if (!window.state.selectedItem) return 0;
    const { item, category, selectedSizeIdx, selectedOptions, effectiveSizes } = window.state.selectedItem;
    
    if (category.title === "Spar-Menüs") {
        let cost = item.prices[0];
        const pizzaCategory = window.MENU_DATA['pizzas'];
        const pastaCategory = window.MENU_DATA['pasta'];
        
        selectedOptions.forEach(opt => {
            const rawNameMatch = opt.match(/^\[(?:Pizza|Nudeln) \d*\] (.+)$/);
            const rawName = rawNameMatch ? rawNameMatch[1] : opt;

            const pExtra = pizzaCategory.extras?.find(e => e.name === rawName);
            if (pExtra) { cost += pExtra.priceSmall || 0; return; }
            
            const nExtra = pastaCategory.extras?.find(e => e.name === rawName);
            if (nExtra) { cost += nExtra.priceSmall || 0; return; }

            if (window.EXTRA_INGREDIENTS.includes(rawName)) {
                const isPizza = opt.startsWith('[Pizza');
                if (isPizza) {
                    cost += pizzaCategory.extraPriceMap ? pizzaCategory.extraPriceMap[0] : 0.50;
                } else {
                    cost += pastaCategory.extraPriceMap ? pastaCategory.extraPriceMap[0] : 0.50;
                }
            }
        });
        return cost;
    }

    const size = effectiveSizes[selectedSizeIdx];
    let base = 0;
    
    if (category.title === "Fleischgerichte" || category.title === "Baguettes" || category.title === "Getränke") base = size.price || item.prices[0];
    else { const pIdx = size.priceIndex; base = item.prices[pIdx] || item.prices[0]; }

    let extraCost = 0;
    if (category.title === "Pizza" || category.title === "De Luxe Kreationen") {
        const extraPriceMap = category.extraPriceMap || [0.50, 0.50, 1.00];
        let sizeKey = 0;
        if (size.id === '32cm') sizeKey = 1;
        if (size.id === '50cm') sizeKey = 2;
        const ingPrice = extraPriceMap[sizeKey];
        const ingCount = selectedOptions.filter(opt => window.EXTRA_INGREDIENTS.includes(opt)).length;
        extraCost += ingCount * ingPrice;
    }
    
    if (category.extras) {
         category.extras.forEach(extra => {
             if (selectedOptions.some(o => o.startsWith(extra.name))) {
                const isLargeExtra = (category.title === "Pizza" || category.title === "De Luxe Kreationen") ? selectedSizeIdx === 2 : selectedSizeIdx > 0;
                extraCost += (isLargeExtra ? extra.priceLarge : extra.priceSmall);
             }
         });
    }
    return (base || 0) + extraCost;
};

window.updateModalPrice = function() {
    const price = window.calculatePrice();
    const priceSpan = document.getElementById('modal-price');
    if (priceSpan) priceSpan.textContent = `${price.toFixed(2)}€`;
};

window.addToCart = function() {
    const { item, category, selectedSizeIdx, selectedOptions, selectedChoice, selectedSauce, notes, effectiveSizes } = window.state.selectedItem;
    let finalOptions = [];
    
    if (selectedSauce && selectedSauce !== "Tomatensoße") {
        finalOptions.push(`Soße: ${selectedSauce}`);
    }
    
    if (selectedChoice) {
         if (category.title === "Nudelgerichte") finalOptions.push(`Nudelsorte: ${selectedChoice}`);
         else finalOptions.push(selectedChoice);
    }
    
    if (category.title !== "Spar-Menüs") {
        selectedOptions.forEach(optName => {
            if (window.EXTRA_INGREDIENTS.includes(optName)) {
                 let sizeKey = 0; 
                 if (effectiveSizes[selectedSizeIdx].id === '32cm') sizeKey = 1;
                 if (effectiveSizes[selectedSizeIdx].id === '50cm') sizeKey = 2;
                 const price = category.extraPriceMap[sizeKey];
                 finalOptions.push(`${optName} (+${price.toFixed(2)}€)`);
            } else {
                 const matchingExtra = category.extras ? category.extras.find(e => optName.startsWith(e.name)) : null;
                 if (matchingExtra) {
                     const isLargeExtra = (category.title === "Pizza" || category.title === "De Luxe Kreationen") ? selectedSizeIdx === 2 : selectedSizeIdx > 0;
                    const p = isLargeExtra ? matchingExtra.priceLarge : matchingExtra.priceSmall;
                     finalOptions.push(`${matchingExtra.name} (+${p.toFixed(2)}€)`);
                 } else {
                     finalOptions.push(optName);
                 }
             }
        });
    }

    if (category.title === "Spar-Menüs") {
         let missing = false;
         let menuOps = [];
         const selections = window.state.selectedItem.menuSelections;

         if (item.id === 'm1') {
             if (!selections['Pizza 1'] || !selections['Salat'] || !selections['Getränk']) missing = true;
             else { menuOps.push(`Pizza: ${selections['Pizza 1']}`); menuOps.push(`Salat: ${selections['Salat']}`); menuOps.push(`Getränk: ${selections['Getränk']}`); }
         } else if (item.id === 'm2') {
             if (!selections['Pizza 1'] || !selections['Pizza 2'] || !selections['Salat'] || !selections['Getränk']) missing = true;
             else { menuOps.push(`Pizza 1: ${selections['Pizza 1']}`); menuOps.push(`Pizza 2: ${selections['Pizza 2']}`); menuOps.push(`Salat: ${selections['Salat']}`); menuOps.push(`Getränk: ${selections['Getränk']}`); }
         } else if (item.id === 'm3') {
             if (!selections['Nudeln 1'] || !selections['Nudeln 2'] || !selections['Salat'] || !selections['Getränk']) missing = true;
             else { menuOps.push(`Nudeln 1: ${selections['Nudeln 1']}`); menuOps.push(`Nudeln 2: ${selections['Nudeln 2']}`); menuOps.push(`Salat: ${selections['Salat']}`); menuOps.push(`Getränk: ${selections['Getränk']}`); }
         } else if (item.id === 'm4') {
             if (!selections['Pizza 1'] || !selections['Nudeln 2'] || !selections['Salat'] || !selections['Getränk']) missing = true;
             else { menuOps.push(`Pizza: ${selections['Pizza 1']}`); menuOps.push(`Nudeln: ${selections['Nudeln 2']}`); menuOps.push(`Salat: ${selections['Salat']}`); menuOps.push(`Getränk: ${selections['Getränk']}`); }
         } else if (item.id === 'm5') {
             if (!selections['Hauptgericht'] || !selections['Salat'] || !selections['Getränk']) missing = true;
             else { menuOps.push(`Hauptgericht: ${selections['Hauptgericht']}`); menuOps.push(`Salat: ${selections['Salat']}`); menuOps.push(`Getränk: ${selections['Getränk']}`); }
         }
         
         if (missing) { 
             const btn = document.getElementById('add-to-cart-btn');
             const originalText = btn.innerHTML;
             btn.textContent = "Bitte alle Felder ausfüllen!";
             btn.classList.replace('bg-pizza-red', 'bg-yellow-500');
             setTimeout(() => { 
                 btn.innerHTML = originalText; 
                 btn.classList.replace('bg-yellow-500', 'bg-pizza-red'); 
             }, 2000);
             return; 
         }
         
         finalOptions = [...menuOps];
         const pizzaCategory = window.MENU_DATA['pizzas'];
         const pastaCategory = window.MENU_DATA['pasta'];

         window.state.selectedItem.selectedOptions.forEach(opt => {
             const rawNameMatch = opt.match(/^\[(?:Pizza|Nudeln) \d*\] (.+)$/);
             const rawName = rawNameMatch ? rawNameMatch[1] : opt;
             let optPrice = 0;

             const pExtra = pizzaCategory.extras?.find(e => e.name === rawName);
             if (pExtra) optPrice = pExtra.priceSmall || 0;
             else {
                 const nExtra = pastaCategory.extras?.find(e => e.name === rawName);
                 if (nExtra) optPrice = nExtra.priceSmall || 0;
                 else if (window.EXTRA_INGREDIENTS.includes(rawName)) {
                     const isPizza = opt.startsWith('[Pizza');
                     optPrice = isPizza ? (pizzaCategory.extraPriceMap ? pizzaCategory.extraPriceMap[0] : 0.50) : (pastaCategory.extraPriceMap ? pastaCategory.extraPriceMap[0] : 0.50);
                 }
             }
             
             if (optPrice > 0) finalOptions.push(`${opt} (+${optPrice.toFixed(2)}€)`);
             else finalOptions.push(opt);
         });
    }

    const finalPrice = window.calculatePrice();
    const sizeLabel = effectiveSizes ? effectiveSizes[selectedSizeIdx].label : item.id;
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    window.state.cart.push({
        ...item,
        uniqueId: uniqueId,
        selectedSize: sizeLabel,
        selectedPrice: finalPrice,
        selectedOptions: finalOptions,
        userNotes: notes.trim()
    });

    window.closeModal();
    window.updateDesktopCart(); 
    if (window.innerWidth < 1024) {
         const fab = document.getElementById('cart-fab');
         const count = document.getElementById('fab-count');
         const total = document.getElementById('fab-total');
         const cartBadge = document.getElementById('cart-badge');
         
         const tPrice = window.state.cart.reduce((sum, i) => sum + i.selectedPrice, 0);
         
         if(fab && count && total) {
            fab.classList.remove('hidden');
            fab.classList.add('lg:hidden');
            count.textContent = window.state.cart.length;
            total.textContent = tPrice.toFixed(2) + '€';
         }
         if (cartBadge) {
             cartBadge.textContent = window.state.cart.length;
             cartBadge.classList.remove('hidden');
         }
    }
};

window.removeFromCart = function(id) {
    window.state.cart = window.state.cart.filter(i => i.uniqueId !== id);
    window.updateDesktopCart();
    
    const cartBadge = document.getElementById('cart-badge');
    if(cartBadge) {
        cartBadge.textContent = window.state.cart.length;
        if(window.state.cart.length === 0) cartBadge.classList.add('hidden');
    }

    if (window.state.isCartOpen) {
        window.renderCart();
    } else {
         const fab = document.getElementById('cart-fab');
         const count = document.getElementById('fab-count');
         const total = document.getElementById('fab-total');
         if(window.state.cart.length === 0 && fab) fab.classList.add('hidden');
         else if (count && total) {
             count.textContent = window.state.cart.length;
             total.textContent = window.state.cart.reduce((sum, i) => sum + i.selectedPrice, 0).toFixed(2) + '€';
         }
    }
};

window.renderMenuInputs = function(menuItem) {
    if(!window.MENU_DATA.salads) return '';
    const saladOptions = window.MENU_DATA.salads.options.map(o => `<option value="${o}">${o}</option>`).join('');
    const pizzaOptions = window.MENU_DATA.pizzas.items.filter(p => parseInt(p.id.replace('p', '')) <= 17 || p.id === 'p0m').map(p => `<option value="${p.name}">${p.name}</option>`).join('');
    const pastaOptions = window.MENU_DATA.pasta.items.filter(n => !n.isSpecial).map(n => `<option value="${n.name}">${n.name}</option>`).join('');
    let inputsHtml = '';
    
    const selectClass = "w-full border border-gray-300 rounded-lg p-3 mb-3 text-sm bg-gray-50 focus:bg-white focus:border-pizza-red outline-none transition-colors appearance-none";
    
    if (menuItem.id === 'm1') inputsHtml = `<select data-menu-key="pizza" class="${selectClass}"><option value="">Pizza wählen...</option>${pizzaOptions}</select><select data-menu-key="salat" class="${selectClass}"><option value="">Salat-Dressing...</option>${saladOptions}</select><select data-menu-key="getränk" class="${selectClass}"><option value="">Getränk...</option><option>Cola (1L)</option><option>Fanta (1L)</option><option>Sprite (1L)</option><option>MezzoMix (1L)</option></select>`; 
    else if (menuItem.id === 'm2') inputsHtml = `<select data-menu-key="pizza_1" class="${selectClass}"><option value="">1. Pizza wählen...</option>${pizzaOptions}</select><select data-menu-key="pizza_2" class="${selectClass}"><option value="">2. Pizza wählen...</option>${pizzaOptions}</select><select data-menu-key="salat" class="${selectClass}"><option value="">Salat-Dressing...</option>${saladOptions}</select><select data-menu-key="getränk" class="${selectClass}"><option value="">Getränk...</option><option>Cola (1L)</option><option>Fanta (1L)</option><option>Sprite (1L)</option><option>MezzoMix (1L)</option></select>`;
    else if (menuItem.id === 'm3') inputsHtml = `<select data-menu-key="pasta_1" class="${selectClass}"><option value="">1. Nudelgericht wählen...</option>${pastaOptions}</select><select data-menu-key="pasta_2" class="${selectClass}"><option value="">2. Nudelgericht wählen...</option>${pastaOptions}</select><select data-menu-key="salat" class="${selectClass}"><option value="">Salat-Dressing...</option>${saladOptions}</select><select data-menu-key="getränk" class="${selectClass}"><option value="">Getränk...</option><option>Cola (1L)</option><option>Fanta (1L)</option><option>Sprite (1L)</option><option>MezzoMix (1L)</option></select>`;
    else if (menuItem.id === 'm4') inputsHtml = `<select data-menu-key="pizza" class="${selectClass}"><option value="">Pizza wählen...</option>${pizzaOptions}</select><select data-menu-key="pasta" class="${selectClass}"><option value="">Nudelgericht wählen...</option>${pastaOptions}</select><select data-menu-key="salat" class="${selectClass}"><option value="">Salat-Dressing...</option>${saladOptions}</select><select data-menu-key="getränk" class="${selectClass}"><option value="">Getränk...</option><option>Cola (1L)</option><option>Fanta (1L)</option><option>Sprite (1L)</option><option>MezzoMix (1L)</option></select>`;
    else if (menuItem.id === 'm5') inputsHtml = `<div class="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-3"><p class="text-xs font-bold text-blue-800 mb-2 uppercase">Hauptgericht wählen (eines davon)</p><select data-menu-key="pizza_choice" onchange="if(this.value) document.querySelector('[data-menu-key=pasta_choice]').value=''" class="${selectClass} mb-2 bg-white"><option value="">-- Pizza wählen --</option>${pizzaOptions}</select><div class="text-center text-gray-400 text-xs font-bold my-1">- ODER -</div><select data-menu-key="pasta_choice" onchange="if(this.value) document.querySelector('[data-menu-key=pizza_choice]').value=''" class="${selectClass} mb-0 bg-white"><option value="">-- Nudel wählen --</option>${pastaOptions}</select></div><select data-menu-key="salad" class="${selectClass}"><option value="">Kleiner Salat (Dressing)...</option>${saladOptions}</select><select data-menu-key="drink" class="${selectClass}"><option value="">Getränk...</option><option>Cola (1L)</option><option>Fanta (1L)</option><option>Sprite (1L)</option><option>Zirndorfer (0.5L)</option></select>`;
    return `<div id="menu-selector-container">${inputsHtml}</div>`;
}

window.handleCheckout = function() {
    const isNameMissing = !window.state.customerInfo.name.trim();
    const isAddressMissing = !window.state.customerInfo.address.trim();
    window.state.missingFields = { name: isNameMissing, address: isAddressMissing };

    if (isNameMissing || isAddressMissing) {
        if(window.state.isCartOpen) window.renderCart(); 
        window.updateDesktopCart(); 
        alert("Bitte Name und Adresse für die Lieferung eingeben.");
        return;
    }

    let message = `*Neue Bestellung bei Pizza De Luxe*\n\n`;
    let printOrderDetails = "";
    const cartTotal = window.state.cart.reduce((sum, item) => sum + item.selectedPrice, 0);
    
    window.state.cart.forEach(item => {
        message += `▪️ *${item.name}* (${item.selectedSize})`;
        printOrderDetails += `${item.name.toUpperCase()} (${item.selectedSize}) ... ${item.selectedPrice.toFixed(2)} €`;
        if(item.selectedOptions && item.selectedOptions.length > 0) {
            message += `\n  + ${item.selectedOptions.join(" | ")}`;
            printOrderDetails += `\n   + ${item.selectedOptions.join("\n   + ")}`;
        }
        if(item.userNotes) {
            message += `\n  _Note: ${item.userNotes}_`;
            printOrderDetails += `\n   HINWEIS: ${item.userNotes}`;
        }
        message += `\n  Preis: ${item.selectedPrice.toFixed(2)}€\n\n`;
        printOrderDetails += `\n\n`;
    });

    message += `------------------------\n*Gesamt: ${cartTotal.toFixed(2)}€*\n------------------------\n\n`;
    printOrderDetails += `--------------------------------\nGESAMTPREIS: ${cartTotal.toFixed(2)} €\n--------------------------------`;

    message += `👤 *Kunde:*\n${window.state.customerInfo.name}\n`;
    message += `📍 *Adresse:*\n${window.state.customerInfo.address}\n`;
    if(window.state.customerInfo.notes) message += `📝 *Anmerkung:*\n${window.state.customerInfo.notes}\n`;
    
    const encoded = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${window.RESTAURANT_NUMBER}?text=${encoded}`;
    
    const popupHtml = `
<div id="orderPopup" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; justify-content: center; align-items: center;" class="animate-fade-in">
    <div style="background: white; padding: 30px; border-radius: 8px; max-width: 450px; width: 90%; box-shadow: 0px 4px 15px rgba(0,0,0,0.2); position: relative; font-family: sans-serif;">
        <span onclick="closeOrderPopup()" style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: #aaa;">&times;</span>
        
        <h3 style="margin-top: 0; color: #333; font-size: 1.25rem; font-weight: bold; margin-bottom: 10px;">Bestell-Übersicht</h3>
        <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
            Du wirst gleich zu WhatsApp weitergeleitet, um deine Bestellung direkt an uns zu senden.
        </p>

        <form id="pizzeriaForm" action="https://formsubmit.co/tonyerler@gmail.com" method="POST" target="_blank">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_next" value="${whatsappLink}">
            <input type="hidden" name="_subject" value="NEUE KÜCHEN-BESTELLUNG - ${window.state.customerInfo.name}">
            <input type="hidden" name="_template" value="table">
            
            <input type="hidden" name="Kunde" value="${window.state.customerInfo.name}">
            <input type="hidden" name="Adresse" value="${window.state.customerInfo.address}">
            <input type="hidden" name="Anmerkung" value="${window.state.customerInfo.notes || 'Keine'}">
            <input type="hidden" name="BESTELLUNG" value="
${printOrderDetails}">

            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #eee;">
                <label style="display: flex; align-items: flex-start; cursor: pointer; font-size: 15px; font-weight: bold; margin: 0;">
                    <input type="checkbox" id="printCheckbox" checked style="margin-right: 10px; margin-top: 3px; transform: scale(1.2);">
                    <span style="line-height: 1.4;">Bestellung direkt an die Küche drucken (empfohlen für schnellere Zubereitung)</span>
                </label>
            </div>

            <button type="button" onclick="processOrder()" style="width: 100%; background-color: #25D366; color: white; border: none; padding: 12px; font-size: 16px; font-weight: bold; border-radius: 4px; cursor: pointer; transition: opacity 0.2s;">
                Bestätigen & Weiter zu WhatsApp
            </button>
        </form>
    </div>
</div>`;

    const existingPopup = document.getElementById('orderPopup');
    if (existingPopup) existingPopup.remove();
    document.body.insertAdjacentHTML('beforeend', popupHtml);
};

window.closeOrderPopup = function() {
    const popup = document.getElementById('orderPopup');
    if (popup) popup.remove();
};

window.processOrder = function() {
    var isPrintChecked = document.getElementById('printCheckbox').checked;
    var form = document.getElementById('pizzeriaForm');
    var whatsAppLink = form.querySelector('input[name="_next"]').value;

    if (isPrintChecked) {
        form.submit();
    } else {
        window.open(whatsAppLink, '_blank');
    }
    
    window.closeOrderPopup();
    
    // Reset state after handling submission
    window.state.cart = [];
    window.state.isCartOpen = false;
    window.state.customerInfo = { name: "", address: "", notes: "" };
    window.state.missingFields = { name: false, address: false };
    window.renderApp();
    document.getElementById('modal-layer').innerHTML = '';
};
