# 👔 Vesto - Smart Outfit Selector

Minimalistyczna aplikacja do inteligentnego doboru strojów z wykorzystaniem AI.

## ✨ Funkcje

- 🌤️ **Analiza pogody** - rzeczywiste dane z OpenWeatherMap
- 🎯 **Inteligentny dobór** - algorytm dopasowany do temperatury i okazji
- 🤖 **AI Alternatywy** - Anthropic Claude generuje 3 dodatkowe propozycje
- 🎨 **Minimalistyczny design** - czysty interfejs w kolorach Vesto
- 📱 **Responsywność** - działa na wszystkich urządzeniach

## 🚀 Szybki start

1. **Dodaj zdjęcia** do folderów:
```
images/
├── gora-m/
├── dol-m/
├── buty-m/
└── okrycie-m/
```

2. **Skopiuj logo** do `images/vesto_logo.png`

3. **Wyślij na GitHub**:
```bash
git init
git add .
git commit -m "Vesto - initial commit"
git remote add origin https://github.com/rafbar4/Vesto.git
git push -u origin main
```

4. **Włącz GitHub Pages**:
   - Settings → Pages
   - Branch: main, Folder: / (root)
   - Save

## 🤖 Funkcja AI

Vesto wykorzystuje **Anthropic Claude API** do generowania inteligentnych alternatyw:

- Analizuje obecną kombinację
- Uwzględnia temperaturę i okazję
- Generuje 3 stylistycznie spójne propozycje
- Każda propozycja ma wskaźnik dopasowania (confidence score)

**W GitHub Pages:** AI działa automatycznie bez dodatkowej konfiguracji (wykorzystuje claude.ai context)

**Lokalnie:** Potrzebny klucz API Anthropic (opcjonalnie - działa również algorytm fallback)

## 🎨 Kolory Brand

```css
--primary-black: #2c2c2c
--secondary-gray: #5a5a5a
--light-gray: #e8e8e8
--white: #ffffff
```

## 📁 Struktura

```
vesto/
├── index.html              # Strona główna
├── css/
│   └── style.css          # Minimalistyczne style
├── js/
│   ├── config.js          # Konfiguracja
│   ├── clothes-data.js    # Baza ubrań
│   ├── ai-engine.js       # Silnik AI
│   └── app.js             # Główna logika
└── images/
    ├── vesto_logo.png     # Logo
    ├── gora-m/            # Zdjęcia
    ├── dol-m/
    ├── buty-m/
    └── okrycie-m/
```

## 📝 Nazwy plików

### GÓRA:
- t-shirt-vneck.png
- t-shirt-crewneck.png
- polo-m.png
- sweter.png
- koszula-biznesowa-m.png
- koszula-flanelowa.png
- longsleeve.png
- bluza-kaptur.png

### DÓŁ:
- jeansy-regular.png
- jeansy-slim.png
- chinosy.png
- dresy.png
- spodnie-garnitur-m.png
- szorty-sport.png
- szorty-jeans-m.png

### BUTY:
- trampki.png
- buty-sportowe.png
- polbuty-m.png
- sztyblety.png

### OKRYCIE:
- kurtka-jeans.png
- kurtka-puchowa.png
- kurtka-skora.png
- marynarka-m.png
- plaszcz-m.png

## ⚙️ Konfiguracja

`js/config.js`:
```javascript
const CONFIG = {
    WEATHER_API_KEY: 'twoj_klucz',
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather',
    DEFAULT_CITY: 'Poznań',
    AI_ENABLED: true
};
```

## 🔧 Personalizacja

### Zmiana kolorów
Edytuj zmienne w `css/style.css`:
```css
:root {
    --primary-black: #twoj-kolor;
    --secondary-gray: #twoj-kolor;
}
```

### Dodanie ubrań
Edytuj `js/clothes-data.js`:
```javascript
{
    id: 99,
    name: 'Nazwa',
    category: 'gora',
    image: 'images/gora-m/plik.png',
    tags: ['casual'],
    warmth: 3
}
```

### Wyłączenie AI
W `js/config.js`:
```javascript
AI_ENABLED: false
```

## 🛠️ Technologie

- HTML5, CSS3, JavaScript (Vanilla)
- OpenWeatherMap API (pogoda)
- Anthropic Claude API (AI)
- GitHub Pages (hosting)

## 📱 Testowanie lokalne

```bash
# Python
python -m http.server 8000

# Lub Node.js
npx http-server

# Lub VS Code Live Server
```

## ✅ Checklist

- [ ] Logo w `images/vesto_logo.png`
- [ ] Wszystkie zdjęcia w odpowiednich folderach
- [ ] Nazwy plików poprawne (małe litery)
- [ ] Repozytorium publiczne
- [ ] GitHub Pages włączone

## 🔍 Rozwiązywanie problemów

**AI nie działa?**
- Sprawdź konsolę (F12)
- AI automatycznie przełączy się na algorytm lokalny jeśli API zawiedzie

**Zdjęcia nie działają?**
- Sprawdź nazwy plików (wielkość liter!)
- Upewnij się, że pliki są w odpowiednich folderach

**Pogoda nie działa?**
- Sprawdź klucz API
- Klucz potrzebuje 1-2h na aktywację

---

**Vesto - Inteligentny wybór, każdego dnia** 🎯
