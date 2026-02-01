# 📸 Nazwy plików zdjęć - Instrukcja

## Struktura folderów

```
images/
├── gora-m/         (góra - męskie)
├── dol-m/          (dół - męskie)
├── buty-m/         (buty - męskie)
└── okrycie-m/      (okrycie - męskie)
```

## 🔵 GÓRA (images/gora-m/)

Twoje pliki powinny nazywać się dokładnie:

1. `t-shirt-vneck.png` - T-shirt z dekoltem V
2. `t-shirt-crewneck.png` - T-shirt z dekoltem okrągłym
3. `polo-m.png` - Polo
4. `sweter.png` - Sweter
5. `koszula-biznesowa-m.png` - Koszula biznesowa
6. `koszula-flanelowa.png` - Koszula flanelowa
7. `longsleeve.png` - Longsleeve
8. `bluza-kaptur.png` - Bluza z kapturem

## 🟢 DÓŁ (images/dol-m/)

1. `jeansy-regular.png` - Jeansy Regular Fit
2. `jeansy-slim.png` - Jeansy Slim Fit
3. `chinosy.png` - Chinos
4. `dresy.png` - Dresy
5. `spodnie-garnitur-m.png` - Spodnie garniturowe
6. `szorty-sport.png` - Szorty sportowe
7. `szorty-jeans-m.png` - Szorty jeansowe

## 🟡 BUTY (images/buty-m/)

1. `trampki.png` - Trampki
2. `buty-sportowe.png` - Buty sportowe
3. `polbuty-m.png` - Półbuty męskie
4. `sztyblety.png` - Sztyblety

## 🔴 OKRYCIE (images/okrycie-m/)

1. `kurtka-jeans.png` - Kurtka jeansowa
2. `kurtka-puchowa.png` - Kurtka puchowa
3. `kurtka-skora.png` - Kurtka skórzana
4. `marynarka-m.png` - Marynarka
5. `plaszcz-m.png` - Płaszcz

---

## 🔄 Jak dopasować nazwy do Twoich plików?

### Opcja A: Zmień nazwy swoich plików (ZALECANE)

Otwórz folder z obrazkami i zmień nazwy zgodnie z powyższą listą.

**Przykład:**
- Twój plik: `bluza-kaptur.png` ✅ (już OK!)
- Twój plik: `Bluza-Kaptur.PNG` ❌ → zmień na `bluza-kaptur.png`
- Twój plik: `koszula biznesowa m.png` ❌ → zmień na `koszula-biznesowa-m.png`

### Opcja B: Zmień nazwy w pliku clothes-data.js

Otwórz `js/clothes-data.js` i znajdź sekcję z danym ubraniem, np.:

```javascript
{
    id: 1,
    name: 'T-shirt z dekoltem V',
    category: 'gora',
    image: 'images/gora-m/t-shirt-vneck.png',  // ← ZMIEŃ TUTAJ
    tags: ['casual', 'sport'],
    warmth: 1
}
```

Zmień `t-shirt-vneck.png` na nazwę swojego pliku.

---

## ⚠️ WAŻNE ZASADY

### 1. Wielkość liter ma znaczenie!
- ✅ `trampki.png`
- ❌ `Trampki.png`
- ❌ `TRAMPKI.PNG`

### 2. Używaj myślników, nie spacji
- ✅ `kurtka-jeans.png`
- ❌ `kurtka jeans.png`
- ❌ `kurtka_jeans.png`

### 3. Format plików
- ✅ `.png` (najlepszy)
- ✅ `.jpg` lub `.jpeg` (też OK)
- ❌ `.gif`, `.bmp`, `.webp` (nie zalecane)

### 4. Rozmiar plików
- Maksymalnie 500KB na zdjęcie
- Rekomendowana rozdzielczość: 300x400px do 800x1000px

---

## 🛠️ Szybka metoda zmiany nazw (Windows)

1. Otwórz folder z plikami
2. Kliknij prawym na plik → "Zmień nazwę" (F2)
3. Wpisz nową nazwę (np. `trampki.png`)
4. Naciśnij Enter

## 🛠️ Szybka metoda zmiany nazw (Mac)

1. Otwórz folder z plikami
2. Kliknij na plik, potem Enter
3. Wpisz nową nazwę
4. Naciśnij Enter

---

## 🔍 Jak sprawdzić, czy nazwy są poprawne?

Po wrzuceniu na GitHub Pages:

1. Otwórz stronę w przeglądarce
2. Naciśnij F12 (narzędzia deweloperskie)
3. Wybierz zakładkę "Console"
4. Sprawdź błędy typu "404 Not Found" - to znaczy, że nazwa pliku jest niepoprawna

---

## 📝 Mapowanie Twoich plików na nazwy w kodzie

### BUTY (ze zrzutu ekranu):

| Twój plik | Nazwa w kodzie |
|-----------|----------------|
| `buty-sportowe.png` | `buty-sportowe.png` ✅ |
| `polbuty-m.png` | `polbuty-m.png` ✅ |
| `sztyblety.png` | `sztyblety.png` ✅ |
| `trampki.png` | `trampki.png` ✅ |

### DÓŁ (ze zrzutu ekranu):

| Twój plik | Nazwa w kodzie |
|-----------|----------------|
| `chinosy.png` | `chinosy.png` ✅ |
| `dresy.png` | `dresy.png` ✅ |
| `jeansy-regular.png` | `jeansy-regular.png` ✅ |
| `jeansy-slim.png` | `jeansy-slim.png` ✅ |
| `spodnie-garnitur-m.png` | `spodnie-garnitur-m.png` ✅ |
| `szorty-jeans-m.png` | `szorty-jeans-m.png` ✅ |
| `szorty-sport.png` | `szorty-sport.png` ✅ |

### GÓRA (ze zrzutu ekranu):

| Twój plik | Nazwa w kodzie |
|-----------|----------------|
| `bluza-kaptur.png` | `bluza-kaptur.png` ✅ |
| `koszula-biznesowa-m.png` | `koszula-biznesowa-m.png` ✅ |
| `koszula-flanelowa.png` | `koszula-flanelowa.png` ✅ |
| `longsleeve.png` | `longsleeve.png` ✅ |
| `polo-m.png` | `polo-m.png` ✅ |
| `sweter.png` | `sweter.png` ✅ |
| `t-shirt-crewneck.png` | `t-shirt-crewneck.png` ✅ |
| `t-shirt-vneck.png` | `t-shirt-vneck.png` ✅ |

### OKRYCIE (ze zrzutu ekranu):

| Twój plik | Nazwa w kodzie |
|-----------|----------------|
| `kurtka-jeans.png` | `kurtka-jeans.png` ✅ |
| `kurtka-puchowa.png` | `kurtka-puchowa.png` ✅ |
| `kurtka-skora.png` | `kurtka-skora.png` ✅ |
| `marynarka-m.png` | `marynarka-m.png` ✅ |
| `plaszcz-m.png` | `plaszcz-m.png` ✅ |

---

## ✅ Wszystkie Twoje pliki są już poprawnie nazwane!

Zgodnie ze zrzutami ekranu, Twoje pliki mają już poprawne nazwy! Wystarczy, że:

1. Skopiujesz je do odpowiednich folderów w projekcie
2. Wrzucisz na GitHub
3. Włączysz GitHub Pages

**I gotowe! 🎉**

---

## 🚨 Jeśli obrazki nie działają

1. **Sprawdź ścieżkę:** Czy pliki są w `images/gora-m/`, a nie w `images/gora/`?
2. **Sprawdź wielkość liter:** `Trampki.PNG` ≠ `trampki.png`
3. **Sprawdź format:** Czy to `.png`, a nie `.PNG`?
4. **Otwórz konsolę (F12):** Sprawdź błędy 404

---

Masz pytania? Sprawdź plik `README.md` lub `GITHUB_PAGES.md`!
