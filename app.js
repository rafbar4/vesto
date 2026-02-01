// Główna logika aplikacji Stylar

// Elementy DOM
const miastoInput = document.getElementById('miasto');
const okazjaSelect = document.getElementById('okazja');
const messageDiv = document.getElementById('message');
const weatherDiv = document.getElementById('weather-info');
const resultsDiv = document.getElementById('outfit-results');

// Funkcja główna - dobieranie stroju
async function dobierzStroj() {
    const miasto = miastoInput.value.trim();
    const okazja = okazjaSelect.value;

    // Walidacja
    if (!miasto) {
        showMessage('Proszę podać miasto!', 'error');
        miastoInput.focus();
        return;
    }

    if (!okazja) {
        showMessage('Proszę wybrać okazję!', 'error');
        okazjaSelect.focus();
        return;
    }

    // Wyczyść poprzednie wyniki
    resultsDiv.innerHTML = '';
    weatherDiv.innerHTML = '';
    showMessage('Pobieram pogodę i dobieram strój...', 'loading');

    try {
        // 1. Pobierz pogodę
        const pogoda = await pobierzPogode(miasto);
        
        // 2. Wyświetl informacje o pogodzie
        wyswietlPogode(pogoda, miasto);
        
        // 3. Dobierz ubrania
        const outfit = dobierzUbrania(okazja, pogoda.temperatura);
        
        // 4. Wyświetl propozycję
        wyswietlPropozycje(outfit);
        
        showMessage('Oto moja propozycja! 🎉', 'success');

    } catch (error) {
        showMessage(`Błąd: ${error.message}`, 'error');
        console.error('Błąd aplikacji:', error);
    }
}

// Pobieranie pogody z API
async function pobierzPogode(miasto) {
    const url = `${CONFIG.WEATHER_API_URL}?q=${miasto}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=pl`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Nie znaleziono miasta. Sprawdź nazwę i spróbuj ponownie.');
            } else {
                throw new Error('Błąd podczas pobierania pogody. Spróbuj ponownie później.');
            }
        }
        
        const data = await response.json();
        
        return {
            temperatura: Math.round(data.main.temp),
            opis: data.weather[0].description,
            ikona: data.weather[0].icon,
            warunki: data.weather[0].main // Rain, Snow, Clear, etc.
        };
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Błąd połączenia z internetem. Sprawdź połączenie.');
        }
        throw error;
    }
}

// Logika dobierania ubrań
function dobierzUbrania(okazja, temperatura) {
    const outfit = {
        gora: null,
        dol: null,
        buty: null,
        okrycie: null
    };

    // Filtruj ubrania według okazji
    let ubrania = getByOccasion(okazja);
    
    // Jeśli nic nie pasuje do okazji, użyj wszystkich
    if (ubrania.length === 0) {
        console.log('Brak ubrań dla okazji, używam wszystkich');
        ubrania = getAllClothes();
    }

    // Dobierz górę
    const gory = ubrania.filter(item => item.category === 'gora');
    if (gory.length > 0) {
        // Jeśli zimno (<15°C), wybierz cieplejsze
        if (temperatura < 15) {
            const cieplsze = gory.filter(item => item.warmth >= 3);
            outfit.gora = cieplsze.length > 0 ? losuj(cieplsze) : losuj(gory);
        } else if (temperatura > 25) {
            // Jeśli gorąco (>25°C), wybierz lżejsze
            const lzejsze = gory.filter(item => item.warmth <= 2);
            outfit.gora = lzejsze.length > 0 ? losuj(lzejsze) : losuj(gory);
        } else {
            outfit.gora = losuj(gory);
        }
    }

    // Dobierz dół
    const doly = ubrania.filter(item => item.category === 'dol');
    if (doly.length > 0) {
        // Jeśli gorąco (>25°C), preferuj szorty
        if (temperatura > 25) {
            const lekkie = doly.filter(item => item.warmth === 1);
            outfit.dol = lekkie.length > 0 ? losuj(lekkie) : losuj(doly);
        } else {
            outfit.dol = losuj(doly);
        }
    }

    // Dobierz buty
    const buty = ubrania.filter(item => item.category === 'buty');
    if (buty.length > 0) {
        // Jeśli zimno, preferuj cieplejsze buty
        if (temperatura < 10) {
            const cieplsze = buty.filter(item => item.warmth >= 2);
            outfit.buty = cieplsze.length > 0 ? losuj(cieplsze) : losuj(buty);
        } else {
            outfit.buty = losuj(buty);
        }
    }

    // Dobierz okrycie (tylko jeśli temperatura < 18°C)
    if (temperatura < 18) {
        const okrycia = ubrania.filter(item => item.category === 'okrycie');
        if (okrycia.length > 0) {
            // Im zimniej, tym cieplejsze okrycie
            if (temperatura < 5) {
                // Bardzo zimno - kurtka puchowa lub płaszcz
                const najcieplejsze = okrycia.filter(item => item.warmth >= 4);
                outfit.okrycie = najcieplejsze.length > 0 ? losuj(najcieplejsze) : losuj(okrycia);
            } else if (temperatura < 12) {
                // Zimno - cieplejsze okrycia
                const cieplsze = okrycia.filter(item => item.warmth >= 3);
                outfit.okrycie = cieplsze.length > 0 ? losuj(cieplsze) : losuj(okrycia);
            } else {
                // Chłodno - lżejsze okrycia
                const lzejsze = okrycia.filter(item => item.warmth <= 3);
                outfit.okrycie = lzejsze.length > 0 ? losuj(lzejsze) : losuj(okrycia);
            }
        }
    }

    return outfit;
}

// Funkcja losująca element z tablicy
function losuj(tablica) {
    if (!tablica || tablica.length === 0) return null;
    return tablica[Math.floor(Math.random() * tablica.length)];
}

// Wyświetlanie pogody
function wyswietlPogode(pogoda, miasto) {
    const emoji = getWeatherEmoji(pogoda.temperatura);
    const tempClass = getTempClass(pogoda.temperatura);
    
    weatherDiv.innerHTML = `
        <div class="weather-card ${tempClass}">
            <h3>${emoji} Pogoda w ${miasto}</h3>
            <div class="weather-details">
                <span class="temp">${pogoda.temperatura}°C</span>
                <span class="desc">${pogoda.opis}</span>
            </div>
        </div>
    `;
}

// Emoji według temperatury
function getWeatherEmoji(temp) {
    if (temp < 0) return '❄️';
    if (temp < 10) return '🥶';
    if (temp < 15) return '🌤️';
    if (temp < 25) return '☀️';
    if (temp < 30) return '🌞';
    return '🔥';
}

// Klasa CSS według temperatury
function getTempClass(temp) {
    if (temp < 0) return 'weather-freezing';
    if (temp < 10) return 'weather-cold';
    if (temp < 20) return 'weather-cool';
    if (temp < 30) return 'weather-warm';
    return 'weather-hot';
}

// Wyświetlanie propozycji stroju
function wyswietlPropozycje(outfit) {
    resultsDiv.innerHTML = '';

    const kategorie = {
        'gora': 'Góra',
        'dol': 'Dół',
        'okrycie': 'Okrycie',
        'buty': 'Buty'
    };

    let licznik = 0;
    
    for (const [kategoria, nazwa] of Object.entries(kategorie)) {
        const item = outfit[kategoria];
        
        if (item) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'outfit-item';
            itemDiv.style.animationDelay = `${licznik * 0.1}s`;
            itemDiv.innerHTML = `
                <h4>${nazwa}</h4>
                <div class="image-container">
                    <img src="${item.image}" 
                         alt="${item.name}" 
                         onerror="this.src='images/placeholder.png'; this.classList.add('placeholder-img');">
                </div>
                <p class="item-name">${item.name}</p>
                <div class="item-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="item-warmth">
                    <span class="warmth-label">Ciepło:</span>
                    ${getWarmthStars(item.warmth)}
                </div>
            `;
            resultsDiv.appendChild(itemDiv);
            licznik++;
        }
    }

    // Jeśli brak okrycia (gdy ciepło), dodaj informację
    if (!outfit.okrycie) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'outfit-item no-jacket-info';
        infoDiv.innerHTML = `
            <h4>☀️</h4>
            <p class="item-name">Bez okrycia</p>
            <p style="color: #666; font-size: 0.9em;">Na dworze jest wystarczająco ciepło!</p>
        `;
        resultsDiv.appendChild(infoDiv);
    }
}

// Gwiazdki według ciepła
function getWarmthStars(warmth) {
    const stars = ['🔵', '🔵', '🔵', '🔵', '🔵'];
    for (let i = 0; i < warmth; i++) {
        stars[i] = '🔴';
    }
    return stars.join('');
}

// Wyświetlanie komunikatów
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

// Obsługa Enter w polu miasta
miastoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        dobierzStroj();
    }
});

// Obsługa Enter w select okazji
okazjaSelect.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        dobierzStroj();
    }
});

// Ustawienie domyślnego miasta
window.addEventListener('load', () => {
    // Ustaw domyślne miasto
    if (CONFIG.DEFAULT_CITY && !miastoInput.value) {
        miastoInput.value = CONFIG.DEFAULT_CITY;
    }
    
    // Komunikat powitalny po krótkim opóźnieniu
    setTimeout(() => {
        showMessage('Witaj w Stylar! Podaj miasto i wybierz okazję, aby otrzymać rekomendację stroju 👔', 'info');
    }, 500);
});

// Debug - wyświetl informacje o załadowanych ubraniach
console.log('=== STYLAR - Załadowane ubrania ===');
console.log('Góra:', CLOTHES_DATABASE.gora.length);
console.log('Dół:', CLOTHES_DATABASE.dol.length);
console.log('Buty:', CLOTHES_DATABASE.buty.length);
console.log('Okrycie:', CLOTHES_DATABASE.okrycie.length);
console.log('Razem:', getAllClothes().length);
console.log('===================================');
