/* Salt & Sugar — frontend ordering demo. No payments or server submissions. */
(() => {
    'use strict';
    const KEY = 'salt-sugar-cart-v1';
    const T = value => window.SaltLanguage?.t(value) || value;
    const display = value => T(value);
    const euro = n => new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(n);
    // Κάθε προϊόν έχει δική του λίστα προαιρετικών extras (τιμές demo).
    // Οι περιγραφές και οι βασικές τιμές παραμένουν αυτές του αρχικού menu.html.
    const extraPrices = {
        'Extra τυρί': 0.8, 'Φέτα': 0.9, 'Extra cheddar': 1,
        'Μπέικον': 1.5, 'Κοτόπουλο': 1.8, 'Κοτομπουκιές': 1.8,
        'Μανιτάρια': 0.8, 'Καραμελωμένα κρεμμύδια': 0.8,
        'Extra σως': 0.5, 'Jalapeños': 0.6, 'Extra μπιφτέκι': 3,
        'Extra πραλίνα': 1, 'Μπισκότο': 0.6, 'Μπανάνα': 0.8,
        'Φράουλες': 1.2, 'Παγωτό': 1.5, 'Σαντιγί': 0.7,
        'Oreo': 0.7, 'Lotus μπισκότο': 0.7, 'Φουντούκι': 0.7,
        'Extra καραμέλα': 0.8, 'Extra σοκολάτα': 0.8,
        'Cheddar sauce': 1, 'Τριμμένη παρμεζάνα': 0.9
    };
    // Ρητές επιλογές ανά προϊόν, όχι κοινή λίστα για όλη την κατηγορία.
    const extrasByProduct = {
        'Yellow Crunch': ['Extra τυρί', 'Μπέικον', 'Extra σως'],
        'Village Hero': ['Extra τυρί', 'Φέτα', 'Μανιτάρια'],
        'Philly Smokehouse': ['Μπέικον', 'Μανιτάρια', 'Extra σως'],
        'Sweet & Smokey Deluxe': ['Extra τυρί', 'Κοτομπουκιές', 'Extra σως'],
        'Pink Smokey': ['Extra τυρί', 'Κοτόπουλο', 'Extra σως'],
        'Night Rider': ['Extra τυρί', 'Μανιτάρια', 'Jalapeños'],
        'Texas Heat': ['Extra cheddar', 'Jalapeños', 'Extra σως'],
        'Nutella Dream': ['Extra πραλίνα', 'Μπισκότο', 'Παγωτό'],
        'Banoffee Crepe': ['Extra καραμέλα', 'Extra σοκολάτα', 'Παγωτό'],
        'Choco Lover': ['Extra σοκολάτα', 'Μπανάνα', 'Παγωτό'],
        'Ferrero Crush': ['Extra πραλίνα', 'Φράουλες', 'Παγωτό'],
        'Lotus Madness': ['Lotus μπισκότο', 'Μπανάνα', 'Παγωτό'],
        'Kinder Attack': ['Extra πραλίνα', 'Oreo', 'Παγωτό'],
        'Salted Caramel Deluxe': ['Extra καραμέλα', 'Φουντούκι', 'Παγωτό'],
        'Blacksmith Burger': ['Extra cheddar', 'Extra μπιφτέκι', 'Καραμελωμένα κρεμμύδια'],
        'Atomic Smash': ['Μπέικον', 'Jalapeños', 'Extra σως'],
        'Greek Yard': ['Φέτα', 'Μπέικον', 'Extra σως'],
        'Truffle Royale': ['Μανιτάρια', 'Τριμμένη παρμεζάνα', 'Extra μπιφτέκι'],
        'Crispy Clucker': ['Extra cheddar', 'Μπέικον', 'Extra σως'],
        'Smokey Club': ['Extra cheddar', 'Μπέικον', 'Extra σως'],
        'Chicken Caesar Roll': ['Τριμμένη παρμεζάνα', 'Μπέικον', 'Extra σως'],
        'BBQ Melt': ['Extra cheddar', 'Μπέικον', 'Καραμελωμένα κρεμμύδια'],
        'Mediterranean Veggie': ['Φέτα', 'Μανιτάρια', 'Extra σως'],
        'Crunchy Chicken': ['Extra cheddar', 'Μπέικον', 'Extra σως'],
        'Crunchy Fries': ['Cheddar sauce', 'Μπέικον', 'Extra σως'],
        'Loaded Fries': ['Cheddar sauce', 'Μπέικον', 'Jalapeños'],
        'Bites Box': ['Extra σως', 'Cheddar sauce'],
        'Cheesy Garlic Bread': ['Extra τυρί', 'Μπέικον', 'Extra σως'],
        'Νερό 500ml': [], 'Νερό 1500ml': [],
        'Coca-Cola / Zero 330ml': [], 'Λουξ Πορτοκαλάδα / Λεμονάδα 330ml': [],
        'Μπύρα Lager 330ml': [], 'Μπύρα Weiss 330ml': [],
        'Energy Drink 500ml': []
    };
    const productCatalog = {"Yellow Crunch": {"description": "Τυρί, κοτομπουκιές, πατάτες, κίτρινη σως.", "category": "Αλμυρές Κρέπες"}, "Village Hero": {"description": "Τυρί, χωριάτικο λουκάνικο, φέτα, πιπεριά, ντομάτα, ρίγανη.", "category": "Αλμυρές Κρέπες"}, "Philly Smokehouse": {"description": "Philadelphia, κοτομπουκιές, μπέικον, ντομάτα, BBQ.", "category": "Αλμυρές Κρέπες"}, "Sweet & Smokey Deluxe": {"description": "Τυρί, κοτομπουκιές, μπέικον, μανιτάρια, καραμελωμένα κρεμμύδια, μουστάρδα, BBQ.", "category": "Αλμυρές Κρέπες"}, "Pink Smokey": {"description": "Τυρί, μπέικον, μανιτάρια, sticks, ροζ σως.", "category": "Αλμυρές Κρέπες"}, "Night Rider": {"description": "Τυρί, μπέικον, καραμελωμένο κρεμμύδι, chili mayo.", "category": "Αλμυρές Κρέπες"}, "Texas Heat": {"description": "Cheddar, κοτόπουλο, BBQ, jalapeños, μπέικον.", "category": "Αλμυρές Κρέπες"}, "Nutella Dream": {"description": "Nutella, μπανάνα, φράουλα, άχνη.", "category": "Γλυκιές Κρέπες"}, "Banoffee Crepe": {"description": "Καραμέλα, μπανάνα, μπισκότο, σαντιγί.", "category": "Γλυκιές Κρέπες"}, "Choco Lover": {"description": "Λευκή & μαύρη σοκολάτα, Oreo.", "category": "Γλυκιές Κρέπες"}, "Ferrero Crush": {"description": "Nutella, Ferrero Rocher, φουντούκι.", "category": "Γλυκιές Κρέπες"}, "Lotus Madness": {"description": "Lotus spread, μπισκότο, λευκή σοκολάτα.", "category": "Γλυκιές Κρέπες"}, "Kinder Attack": {"description": "Πραλίνα, Kinder Bueno, λευκή σοκολάτα.", "category": "Γλυκιές Κρέπες"}, "Salted Caramel Deluxe": {"description": "Αλατισμένη καραμέλα, σοκολάτα, καραμελωμένα αμύγδαλα.", "category": "Γλυκιές Κρέπες"}, "Blacksmith Burger": {"description": "100% Black Angus 150g, κρεμμύδι, cheddar, μπέικον, BBQ, brioche.", "category": "Burgers"}, "Atomic Smash": {"description": "Διπλό smash burger, διπλό cheddar, πίκλες, onion-mustard blend.", "category": "Burgers"}, "Greek Yard": {"description": "Μπιφτέκι μοσχαρίσιο, φέτα, λαχανικά, tzatziki mayo.", "category": "Burgers"}, "Truffle Royale": {"description": "Black Angus, μανιτάρια, παρμεζάνα, truffle mayo.", "category": "Burgers"}, "Crispy Clucker": {"description": "Τραγανό κοτόπουλο, cheddar, πίκλες, honey mustard mayo.", "category": "Burgers"}, "Smokey Club": {"description": "Γαλοπούλα καπνιστή, μπέικον, cheddar, μαρούλι, mustard-mayo.", "category": "Sandwiches"}, "Chicken Caesar Roll": {"description": "Κοτόπουλο, μαρούλι, παρμεζάνα, caesar sauce.", "category": "Sandwiches"}, "BBQ Melt": {"description": "Χοιρινό λεπτοκομμένο, cheddar, κρεμμύδι, BBQ.", "category": "Sandwiches"}, "Mediterranean Veggie": {"description": "Φέτα, ντομάτα, ελιά, αγγούρι, ρίγανη.", "category": "Sandwiches"}, "Crunchy Chicken": {"description": "Τραγανό κοτόπουλο, iceberg, πίκλες, honey-mustard.", "category": "Sandwiches"}, "Crunchy Fries": {"description": "Κλασικές τηγανητές πατάτες.", "category": "Sides"}, "Loaded Fries": {"description": "Πατάτες με cheddar sauce, μπέικον.", "category": "Sides"}, "Bites Box": {"description": "Κοτομπουκιές crispy με σως επιλογής.", "category": "Sides"}, "Cheesy Garlic Bread": {"description": "Ψωμάκι με βούτυρο σκόρδου & mozzarella.", "category": "Sides"}, "Νερό 500ml": {"description": "", "category": "Drinks"}, "Νερό 1500ml": {"description": "", "category": "Drinks"}, "Coca-Cola / Zero 330ml": {"description": "", "category": "Drinks"}, "Λουξ Πορτοκαλάδα / Λεμονάδα 330ml": {"description": "", "category": "Drinks"}, "Μπύρα Lager 330ml": {"description": "", "category": "Drinks"}, "Μπύρα Weiss 330ml": {"description": "", "category": "Drinks"}, "Energy Drink 500ml": {"description": "", "category": "Drinks"}};
    const load = () => { try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : []; } catch { return []; } };
    const save = cart => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { alert('Δεν ήταν δυνατή η αποθήκευση του καλαθιού.'); } };
    const cartCount = () => load().reduce((sum, x) => sum + x.quantity, 0);
    const updateNav = () => {
        document.querySelectorAll('.navbar a[href="order.html"]').forEach(a => {
            a.textContent = `${T("Παράγγειλε Τώρα")} (${cartCount()})`;
        });
    };
    const make = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };
    const ingredientsOf = description => description.replace(/[.。]$/, '').split(',').map(x => x.trim()).filter(Boolean);
    const products = [...document.querySelectorAll('.menu-item[data-category]')].map((card, index) => ({
        id: `item-${index + 1}`,
        name: card.querySelector('h3').textContent.trim(),
        description: card.querySelector('p')?.textContent.trim() || '',
        base: Number(card.querySelector('.price').textContent.replace(/[^\d.,]/g, '').replace(',', '.')),
        category: card.dataset.category,
        card
    }));
    const modal = document.getElementById('product-modal');
    let selected = null, quantity = 1, removed = [], chosenExtras = [], previousFocus = null, editingIndex = null;
    const total = () => selected ? (selected.base + chosenExtras.reduce((s, e) => s + e.price, 0)) * quantity : 0;
    const updateModal = () => {
        document.getElementById('product-quantity').textContent = quantity;
        document.getElementById('confirm-add').textContent = `${editingIndex === null ? T('Προσθήκη') : T('Αποθήκευση')} · ${euro(total())}`;
    };
    const addOptions = (container, title, help, choices, isExtra) => {
        container.replaceChildren();
        if (!choices.length) return;
        const section = make('section', 'option-section');
        section.append(make('h3', '', T(title)), make('p', 'option-help', T(help)));
        choices.forEach((option, i) => {
            const name = isExtra ? option[0] : option;
            const row = make('div', 'option-row');
            const label = make('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isExtra ? chosenExtras.some(e => e.name === name) : !removed.includes(name);
            checkbox.id = `${isExtra ? 'extra' : 'ingredient'}-${i}`;
            checkbox.addEventListener('change', () => {
                if (isExtra) {
                    chosenExtras = checkbox.checked ? [...chosenExtras, { name, price: option[1] }] : chosenExtras.filter(e => e.name !== name);
                } else {
                    removed = checkbox.checked ? removed.filter(x => x !== name) : [...removed, name];
                }
                updateModal();
            });
            label.append(checkbox, make('span', '', T(name)));
            row.append(label);
            if (isExtra) row.append(make('span', 'option-price', `+${euro(option[1])}`));
            section.append(row);
        });
        container.append(section);
    };
    const closeModal = () => {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = '';
        previousFocus?.focus();
    };
    const openModal = product => {
        selected = product; quantity = 1; removed = []; chosenExtras = []; editingIndex = null;
        previousFocus = document.activeElement;
        document.getElementById('modal-product-title').textContent = T(product.name);
        document.getElementById('modal-product-description').textContent = `${product.description ? T(product.description) + " · " : ""}${euro(product.base)}`;
        const note = document.getElementById('product-note');
        const noteLabel = document.querySelector('label[for="product-note"]');
        const examples = {
            'Burgers': 'π.χ. καλοψημένο μπιφτέκι',
            'Sandwiches': 'π.χ. καλά ζεσταμένο',
            'Αλμυρές Κρέπες': 'π.χ. καλά ψημένη κρέπα',
            'Γλυκιές Κρέπες': 'π.χ. λίγη πραλίνα',
            'Sides': 'π.χ. τη σως ξεχωριστά',
            'Drinks': 'π.χ. χωρίς πάγο ή με πάγο ξεχωριστά'
        };
        // Το σχόλιο παραμένει διαθέσιμο σε ΟΛΑ τα προϊόντα, και στα ποτά.
        note.hidden = false;
        noteLabel.hidden = false;
        note.value = '';
        note.placeholder = T(examples[product.category] || 'Πρόσθεσε οδηγίες για το προϊόν');
        const ingredients = product.category === 'Drinks' ? [] : ingredientsOf(product.description);
        addOptions(document.getElementById('modal-ingredients'), 'Υλικά', 'Αποεπίλεξε όσα δεν θέλεις. Η τιμή δεν αλλάζει.', ingredients, false);
        addOptions(document.getElementById('modal-extras'), 'Πρόσθετα υλικά', 'Προαιρετικές προσθήκες με επιπλέον χρέωση (τιμές demo).', (extrasByProduct[product.name] || []).map(name => [name, extraPrices[name]]), true);
        updateModal();
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-close').focus();
    };
    const editCartItem = index => {
        const item = load()[index];
        if (!item || !modal) return;
        const info = productCatalog[item.name] || {};
        openModal({ ...item, description: info.description || '', category: info.category || item.category });
        editingIndex = index;
        quantity = item.quantity;
        removed = [...(item.removed || [])];
        chosenExtras = (item.extras || []).map(e => ({...e}));
        document.getElementById('product-note').value = item.note || '';
        const ingredients = ingredientsOf(info.description || '');
        addOptions(document.getElementById('modal-ingredients'), 'Υλικά', 'Αποεπίλεξε όσα δεν θέλεις. Η τιμή δεν αλλάζει.', item.category === 'Drinks' ? [] : ingredients, false);
        addOptions(document.getElementById('modal-extras'), 'Πρόσθετα υλικά', 'Προαιρετικές προσθήκες με επιπλέον χρέωση (τιμές demo).', (extrasByProduct[item.name] || []).map(name => [name, extraPrices[name]]), true);
        updateModal();
    };
    let toastTimeout;
    const toast = message => {
        const el = document.getElementById('cart-toast');
        if (!el) return;
        el.textContent = message;
        el.classList.add('visible');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => el.classList.remove('visible'), 2500);
    };
    if (modal) {
        products.forEach(product => product.card.querySelector('.add-to-cart-btn')?.addEventListener('click', () => openModal(product)));
        modal.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', closeModal));
        document.addEventListener('keydown', e => {
            if (modal.hidden) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'Tab') {
                const focusables = [...modal.querySelectorAll('button:not([disabled]), input, textarea')];
                const first = focusables[0], last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
        document.getElementById('quantity-minus').addEventListener('click', () => { quantity = Math.max(1, quantity - 1); updateModal(); });
        document.getElementById('quantity-plus').addEventListener('click', () => { quantity = Math.min(99, quantity + 1); updateModal(); });
        document.getElementById('confirm-add').addEventListener('click', () => {
            const cart = load();
            const note = document.getElementById('product-note').value.trim();
            const item = { id: selected.id, name: selected.name, base: selected.base, category: selected.category, removed: [...removed], extras: [...chosenExtras], note, quantity };
            const signature = x => JSON.stringify([x.id, [...x.removed].sort(), [...x.extras].map(e => e.name).sort(), x.note]);
            if (editingIndex !== null) {
                cart[editingIndex] = item;
            } else {
                const existing = cart.find(x => signature(x) === signature(item));
                if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
                else cart.push(item);
            }
            const edited = editingIndex !== null;
            save(cart); updateNav(); closeModal(); renderCart(); toast(edited ? T('Οι αλλαγές αποθηκεύτηκαν') : `${quantity} × ${T(selected.name)} ${T('προστέθηκε στο καλάθι')}`);
        });
    }
    const cartItems = document.getElementById('cart-items');
    const renderCart = () => {
        if (!cartItems) return;
        const cart = load();
        cartItems.replaceChildren();
        const count = cart.reduce((s, x) => s + x.quantity, 0);
        document.getElementById('cart-item-count').textContent = `(${count})`;
        document.getElementById('cart-empty').hidden = cart.length > 0;
        cartItems.hidden = cart.length === 0;
        const subtotal = cart.reduce((s, x) => s + (x.base + x.extras.reduce((t, e) => t + e.price, 0)) * x.quantity, 0);
        document.getElementById('cart-subtotal').textContent = euro(subtotal);
        document.getElementById('cart-total').textContent = euro(subtotal);
        document.getElementById('clear-cart').hidden = cart.length === 0;
        const checkoutButton = document.getElementById('demo-checkout');
        if (checkoutButton) checkoutButton.disabled = cart.length === 0;
        cart.forEach((item, index) => {
            const unit = item.base + item.extras.reduce((s, e) => s + e.price, 0);
            const entry = make('article', 'cart-entry');
            const top = make('div', 'cart-entry-top');
            top.append(make('h3', '', T(item.name)), make('strong', '', euro(unit * item.quantity)));
            entry.append(top);
            if (item.removed.length) entry.append(make('p', 'cart-entry-detail', `${T('Χωρίς:')} ${item.removed.map(T).join(', ')}`));
            if (item.extras.length) entry.append(make('p', 'cart-entry-detail', `Extras: ${item.extras.map(e => `${T(e.name)} (+${euro(e.price)})`).join(', ')}`));
            if (item.note) entry.append(make('p', 'cart-entry-detail', `${T('Σχόλιο:')} ${item.note}`));
            const actions = make('div', 'cart-entry-actions');
            const qty = make('div', 'quantity-control');
            const minus = make('button', '', '−'); minus.type = 'button'; minus.setAttribute('aria-label', `Μείωση ${item.name}`);
            const plus = make('button', '', '+'); plus.type = 'button'; plus.setAttribute('aria-label', `Αύξηση ${item.name}`);
            const change = delta => { const updated = load(); updated[index].quantity += delta; if (updated[index].quantity < 1) updated.splice(index, 1); save(updated); renderCart(); updateNav(); };
            minus.addEventListener('click', () => change(-1)); plus.addEventListener('click', () => { if (item.quantity < 99) change(1); });
            qty.append(minus, make('span', '', String(item.quantity)), plus);
            const remove = make('button', '', T('Αφαίρεση')); remove.type = 'button';
            remove.addEventListener('click', () => { const updated = load(); updated.splice(index, 1); save(updated); renderCart(); updateNav(); });
            const edit = make('button', 'cart-edit-btn', T('Επεξεργασία')); edit.type = 'button';
            edit.addEventListener('click', () => editCartItem(index));
            actions.append(qty, edit, remove); entry.append(actions); cartItems.append(entry);
        });
    };
    document.getElementById('clear-cart')?.addEventListener('click', () => {
        if (confirm(T('Θέλεις να αδειάσεις το καλάθι;'))) { save([]); renderCart(); updateNav(); }
    });
    const checkout = document.getElementById('demo-checkout');
    checkout?.addEventListener('click', () => {
        const cart = load();
        if (!cart.length) return;
        const totalAmount = cart.reduce((sum, item) => sum + (item.base + item.extras.reduce((n, e) => n + e.price, 0)) * item.quantity, 0);
        if (!confirm(window.SaltLanguage?.get() === 'en' ? `Confirm demo order for ${euro(totalAmount)}?\nNo payment or order submission will take place.` : `Επιβεβαίωση demo παραγγελίας ${euro(totalAmount)};\nΔεν θα γίνει πληρωμή ή αποστολή.`)) return;
        const confirmation = document.getElementById('checkout-confirmation');
        confirmation.hidden = false;
        confirmation.textContent = window.SaltLanguage?.get() === 'en' ? `Demo order complete! Total: ${euro(totalAmount)}. No payment or order submission took place.` : `Η δοκιμαστική παραγγελία ολοκληρώθηκε! Σύνολο: ${euro(totalAmount)}. Δεν πραγματοποιήθηκε πληρωμή ή αποστολή.`;
        save([]); renderCart(); updateNav();
        confirmation.scrollIntoView({behavior:'smooth',block:'center'});
    });
    document.addEventListener('salt-language-change', () => { updateNav(); renderCart(); if (selected && modal && !modal.hidden) { document.getElementById('modal-product-title').textContent = T(selected.name); document.getElementById('modal-product-description').textContent = `${selected.description ? T(selected.description) + ' · ' : ''}${euro(selected.base)}`; document.getElementById('product-note').placeholder = T(({Burgers:'π.χ. καλοψημένο μπιφτέκι',Sandwiches:'π.χ. καλά ζεσταμένο','Αλμυρές Κρέπες':'π.χ. καλά ψημένη κρέπα','Γλυκιές Κρέπες':'π.χ. λίγη πραλίνα',Sides:'π.χ. τη σως ξεχωριστά',Drinks:'π.χ. χωρίς πάγο ή με πάγο ξεχωριστά'})[selected.category] || 'Πρόσθεσε οδηγίες για το προϊόν'); addOptions(document.getElementById('modal-ingredients'), 'Υλικά', 'Αποεπίλεξε όσα δεν θέλεις. Η τιμή δεν αλλάζει.', selected.category === 'Drinks' ? [] : ingredientsOf(selected.description || ''), false); addOptions(document.getElementById('modal-extras'), 'Πρόσθετα υλικά', 'Προαιρετικές προσθήκες με επιπλέον χρέωση (τιμές demo).', (extrasByProduct[selected.name] || []).map(name => [name,extraPrices[name]]), true); updateModal(); } });
    updateNav(); renderCart();
})();
