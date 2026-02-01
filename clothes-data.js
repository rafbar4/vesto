// Baza danych ubrań - Stylar
// Nazwy plików zgodne ze zdjęciami użytkownika

const CLOTHES_DATABASE = {
    gora: [
        {
            id: 1,
            name: 'T-shirt z dekoltem V',
            category: 'gora',
            image: 'images/gora-m/t-shirt-vneck.png',
            tags: ['casual', 'sport'],
            warmth: 1
        },
        {
            id: 2,
            name: 'T-shirt z dekoltem okrągłym',
            category: 'gora',
            image: 'images/gora-m/t-shirt-crewneck.png',
            tags: ['casual', 'sport'],
            warmth: 1
        },
        {
            id: 3,
            name: 'Polo',
            category: 'gora',
            image: 'images/gora-m/polo-m.png',
            tags: ['casual', 'work'],
            warmth: 2
        },
        {
            id: 4,
            name: 'Sweter',
            category: 'gora',
            image: 'images/gora-m/sweter.png',
            tags: ['casual', 'work', 'formal'],
            warmth: 4
        },
        {
            id: 5,
            name: 'Koszula biznesowa',
            category: 'gora',
            image: 'images/gora-m/koszula-biznesowa-m.png',
            tags: ['formal', 'work'],
            warmth: 2
        },
        {
            id: 6,
            name: 'Koszula flanelowa',
            category: 'gora',
            image: 'images/gora-m/koszula-flanelowa.png',
            tags: ['casual'],
            warmth: 3
        },
        {
            id: 7,
            name: 'Longsleeve',
            category: 'gora',
            image: 'images/gora-m/longsleeve.png',
            tags: ['casual', 'sport'],
            warmth: 2
        },
        {
            id: 8,
            name: 'Bluza z kapturem',
            category: 'gora',
            image: 'images/gora-m/bluza-kaptur.png',
            tags: ['casual', 'sport'],
            warmth: 3
        }
    ],
    
    dol: [
        {
            id: 11,
            name: 'Jeansy Regular Fit',
            category: 'dol',
            image: 'images/dol-m/jeansy-regular.png',
            tags: ['casual'],
            warmth: 2
        },
        {
            id: 12,
            name: 'Jeansy Slim Fit',
            category: 'dol',
            image: 'images/dol-m/jeansy-slim.png',
            tags: ['casual', 'party'],
            warmth: 2
        },
        {
            id: 13,
            name: 'Chinos',
            category: 'dol',
            image: 'images/dol-m/chinosy.png',
            tags: ['casual', 'work'],
            warmth: 2
        },
        {
            id: 14,
            name: 'Dresy',
            category: 'dol',
            image: 'images/dol-m/dresy.png',
            tags: ['sport', 'casual'],
            warmth: 2
        },
        {
            id: 15,
            name: 'Spodnie garniturowe',
            category: 'dol',
            image: 'images/dol-m/spodnie-garnitur-m.png',
            tags: ['formal', 'work'],
            warmth: 2
        },
        {
            id: 16,
            name: 'Szorty sportowe',
            category: 'dol',
            image: 'images/dol-m/szorty-sport.png',
            tags: ['sport', 'casual'],
            warmth: 1
        },
        {
            id: 17,
            name: 'Szorty jeansowe',
            category: 'dol',
            image: 'images/dol-m/szorty-jeans-m.png',
            tags: ['casual'],
            warmth: 1
        }
    ],
    
    buty: [
        {
            id: 21,
            name: 'Trampki',
            category: 'buty',
            image: 'images/buty-m/trampki.png',
            tags: ['casual', 'sport'],
            warmth: 1
        },
        {
            id: 22,
            name: 'Buty sportowe',
            category: 'buty',
            image: 'images/buty-m/buty-sportowe.png',
            tags: ['sport', 'casual'],
            warmth: 1
        },
        {
            id: 23,
            name: 'Półbuty męskie',
            category: 'buty',
            image: 'images/buty-m/polbuty-m.png',
            tags: ['casual', 'work'],
            warmth: 2
        },
        {
            id: 24,
            name: 'Sztyblety',
            category: 'buty',
            image: 'images/buty-m/sztyblety.png',
            tags: ['casual', 'party'],
            warmth: 3
        }
    ],
    
    okrycie: [
        {
            id: 31,
            name: 'Kurtka jeansowa',
            category: 'okrycie',
            image: 'images/okrycie-m/kurtka-jeans.png',
            tags: ['casual'],
            warmth: 2
        },
        {
            id: 32,
            name: 'Kurtka puchowa',
            category: 'okrycie',
            image: 'images/okrycie-m/kurtka-puchowa.png',
            tags: ['casual', 'sport'],
            warmth: 5
        },
        {
            id: 33,
            name: 'Kurtka skórzana',
            category: 'okrycie',
            image: 'images/okrycie-m/kurtka-skora.png',
            tags: ['casual', 'party'],
            warmth: 3
        },
        {
            id: 34,
            name: 'Marynarka',
            category: 'okrycie',
            image: 'images/okrycie-m/marynarka-m.png',
            tags: ['formal', 'work'],
            warmth: 2
        },
        {
            id: 35,
            name: 'Płaszcz',
            category: 'okrycie',
            image: 'images/okrycie-m/plaszcz-m.png',
            tags: ['formal', 'work'],
            warmth: 4
        }
    ]
};

// Funkcja pomocnicza do pobrania wszystkich ubrań
function getAllClothes() {
    return [
        ...CLOTHES_DATABASE.gora,
        ...CLOTHES_DATABASE.dol,
        ...CLOTHES_DATABASE.buty,
        ...CLOTHES_DATABASE.okrycie
    ];
}

// Funkcja do filtrowania po okazji
function getByOccasion(occasion) {
    return getAllClothes().filter(item => item.tags.includes(occasion));
}

// Funkcja do filtrowania po kategorii
function getByCategory(category) {
    return CLOTHES_DATABASE[category] || [];
}

// Funkcja do filtrowania po temperaturze
function getByWarmth(minWarmth, maxWarmth = 5) {
    return getAllClothes().filter(item => 
        item.warmth >= minWarmth && item.warmth <= maxWarmth
    );
}

// Eksport dla użycia w innych plikach (opcjonalnie)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CLOTHES_DATABASE,
        getAllClothes,
        getByOccasion,
        getByCategory,
        getByWarmth
    };
}
