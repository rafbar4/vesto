// Vesto - Główna aplikacja
console.log('Vesto loading...');

let currentOutfit = null;
let currentWeather = null;
let currentOccasion = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    const generateBtn = document.getElementById('generate-btn');
    const aiBtn = document.getElementById('ai-btn');
    const miastoInput = document.getElementById('miasto');
    const okazjaSelect = document.getElementById('okazja');

    console.log('Elements:', {
        generateBtn: !!generateBtn,
        aiBtn: !!aiBtn,
        miasto: !!miastoInput,
        okazja: !!okazjaSelect
    });

    // Główne generowanie
    generateBtn.addEventListener('click', async () => {
        console.log('Generate clicked!');
        
        const miasto = miastoInput.value.trim();
        const okazja = okazjaSelect.value;

        if (!miasto) {
            showMessage('Podaj miasto', 'error');
            return;
        }

        if (!okazja) {
            showMessage('Wybierz okazję', 'error');
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = 'GENERUJĘ...';
        showMessage('Analizuję pogodę...', 'loading');
        
        try {
            const weather = await fetchWeather(miasto);
            console.log('Weather:', weather);
            
            displayWeather(weather, miasto);
            
            currentWeather = weather;
            currentOccasion = okazja;
            
            const outfit = selectOutfit(okazja, weather.temperatura);
            console.log('Outfit:', outfit);
            
            currentOutfit = outfit;
            
            displayOutfit(outfit);
            showMessage('Zestawienie wygenerowane!', 'success');
            
            // POKAŻ SEKCJĘ AI
            document.getElementById('ai-section').style.display = 'block';
            document.getElementById('ai-results').style.display = 'none';
            
        } catch (error) {
            console.error('Error:', error);
            showMessage(`Błąd: ${error.message}`, 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'GENERUJ ZESTAWIENIE';
        }
    });

    // Generowanie AI
    aiBtn.addEventListener('click', async () => {
        console.log('AI clicked!');
        
        if (!currentOutfit || !currentWeather) {
            showMessage('Najpierw wygeneruj główne zestawienie', 'error');
            return;
        }

        aiBtn.disabled = true;
        aiBtn.innerHTML = '<span class="ai-icon">⏳</span> GENERUJĘ...';
        
        try {
            const alternatives = await vestoAI.generateAlternatives(
                currentOutfit,
                currentWeather.temperatura,
                currentOccasion
            );
            
            console.log('AI alternatives:', alternatives);
            displayAlternatives(alternatives);
            aiBtn.innerHTML = '<span class="ai-icon">✨</span> REGENERUJ ALTERNATYWY';
            
        } catch (error) {
            console.error('AI Error:', error);
            showMessage(`Błąd AI: ${error.message}`, 'error');
        } finally {
            aiBtn.disabled = false;
        }
    });

    // Enter key
    miastoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateBtn.click();
    });

    console.log('Vesto initialized!');
});

// Pobieranie pogody
async function fetchWeather(miasto) {
    const url = `${CONFIG.WEATHER_API_URL}?q=${miasto}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=pl`;
    console.log('Fetching weather:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Nie znaleziono miasta');
    }
    
    const data = await response.json();
    return {
        temperatura: Math.round(data.main.temp),
        opis: data.weather[0].description
    };
}

// Wybór stroju
function selectOutfit(okazja, temperatura) {
    const outfit = { gora: null, dol: null, buty: null, okrycie: null };
    let clothes = getByOccasion(okazja);
    
    if (clothes.length === 0) clothes = getAllClothes();

    const gory = clothes.filter(item => item.category === 'gora');
    if (gory.length > 0) {
        if (temperatura < 15) {
            const warm = gory.filter(item => item.warmth >= 3);
            outfit.gora = warm.length > 0 ? random(warm) : random(gory);
        } else if (temperatura > 25) {
            const light = gory.filter(item => item.warmth <= 2);
            outfit.gora = light.length > 0 ? random(light) : random(gory);
        } else {
            outfit.gora = random(gory);
        }
    }

    const doly = clothes.filter(item => item.category === 'dol');
    if (doly.length > 0) {
        if (temperatura > 25) {
            const light = doly.filter(item => item.warmth === 1);
            outfit.dol = light.length > 0 ? random(light) : random(doly);
        } else {
            outfit.dol = random(doly);
        }
    }

    const buty = clothes.filter(item => item.category === 'buty');
    if (buty.length > 0) outfit.buty = random(buty);

    if (temperatura < 18) {
        const okrycia = clothes.filter(item => item.category === 'okrycie');
        if (okrycia.length > 0) {
            if (temperatura < 5) {
                const warmest = okrycia.filter(item => item.warmth >= 4);
                outfit.okrycie = warmest.length > 0 ? random(warmest) : random(okrycia);
            } else if (temperatura < 12) {
                const warm = okrycia.filter(item => item.warmth >= 3);
                outfit.okrycie = warm.length > 0 ? random(warm) : random(okrycia);
            } else {
                const light = okrycia.filter(item => item.warmth <= 3);
                outfit.okrycie = light.length > 0 ? random(light) : random(okrycia);
            }
        }
    }

    return outfit;
}

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Wyświetlanie pogody
function displayWeather(weather, miasto) {
    const emoji = getWeatherEmoji(weather.temperatura);
    document.getElementById('weather').innerHTML = `
        <div class="weather-card">
            <h3>${emoji} ${miasto}</h3>
            <div class="weather-details">
                <span class="temp">${weather.temperatura}°C</span>
                <span class="desc">${weather.opis}</span>
            </div>
        </div>
    `;
}

function getWeatherEmoji(temp) {
    if (temp < 0) return '❄️';
    if (temp < 10) return '🥶';
    if (temp < 20) return '☁️';
    if (temp < 30) return '☀️';
    return '🔥';
}

// Wyświetlanie stroju
function displayOutfit(outfit) {
    const categories = { 'gora': 'Góra', 'dol': 'Dół', 'okrycie': 'Okrycie', 'buty': 'Buty' };
    let html = '';

    for (const [cat, label] of Object.entries(categories)) {
        const item = outfit[cat];
        if (item) {
            html += `
                <div class="outfit-item">
                    <h4>${label}</h4>
                    <div class="image-container">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22300%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23999%22 text-anchor=%22middle%22%3EBrak zdjęcia%3C/text%3E%3C/svg%3E';">
                    </div>
                    <p class="item-name">${item.name}</p>
                    <div class="item-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="item-warmth">
                        <span class="warmth-label">Ciepło</span>
                        ${'●'.repeat(item.warmth)}${'○'.repeat(5 - item.warmth)}
                    </div>
                </div>
            `;
        }
    }

    document.getElementById('outfit').innerHTML = html;
}

// Wyświetlanie alternatyw AI
function displayAlternatives(alternatives) {
    if (!alternatives || alternatives.length === 0) {
        showMessage('Nie udało się wygenerować alternatyw', 'error');
        return;
    }

    let html = '';
    alternatives.forEach((alt, index) => {
        html += `
            <div class="ai-option">
                <div class="ai-option-header">
                    <h4>Opcja ${index + 1}: ${alt.style}</h4>
                    <div class="ai-confidence">
                        Dopasowanie AI: ${alt.confidence}%
                        <span class="ai-confidence-bar">
                            <span class="ai-confidence-fill" style="width: ${alt.confidence}%"></span>
                        </span>
                    </div>
                    <p style="margin-top: 10px; color: #5a5a5a; font-size: 0.9em;">${alt.reason}</p>
                </div>
                <div class="outfit-grid">
                    ${generateOutfitHTML(alt.outfit)}
                </div>
            </div>
        `;
    });

    const aiResults = document.getElementById('ai-results');
    aiResults.innerHTML = html;
    aiResults.style.display = 'block';
}

function generateOutfitHTML(outfit) {
    const categories = { 'gora': 'Góra', 'dol': 'Dół', 'okrycie': 'Okrycie', 'buty': 'Buty' };
    let html = '';

    for (const [cat, label] of Object.entries(categories)) {
        const item = outfit[cat];
        if (item) {
            html += `
                <div class="outfit-item">
                    <h4>${label}</h4>
                    <div class="image-container">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22300%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2218%22 fill=%22%23999%22 text-anchor=%22middle%22%3EBrak zdjęcia%3C/text%3E%3C/svg%3E';">
                    </div>
                    <p class="item-name">${item.name}</p>
                    <div class="item-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        }
    }

    return html;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

console.log('=== VESTO READY ===');
console.log('Database:', getAllClothes().length, 'items');
