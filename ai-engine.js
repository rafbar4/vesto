// AI Engine - Inteligentne generowanie alternatywnych kombinacji

class VestoAI {
    constructor() {
        this.initialized = false;
    }

    // Generuje 3 alternatywne kombinacje używając Anthropic API
    async generateAlternatives(currentOutfit, temperature, occasion) {
        console.log('AI: Generowanie alternatyw...', { currentOutfit, temperature, occasion });

        try {
            const prompt = this.buildPrompt(currentOutfit, temperature, occasion);
            
            // Wywołanie Anthropic API
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [{
                        role: 'user',
                        content: prompt
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('AI API error');
            }

            const data = await response.json();
            const aiResponse = data.content[0].text;
            
            // Parse odpowiedzi AI
            return this.parseAIResponse(aiResponse);

        } catch (error) {
            console.error('AI Error:', error);
            // Fallback - użyj algorytmu lokalnego
            return this.generateLocalAlternatives(currentOutfit, temperature, occasion);
        }
    }

    buildPrompt(currentOutfit, temperature, occasion) {
        const currentItems = Object.entries(currentOutfit)
            .filter(([_, item]) => item)
            .map(([cat, item]) => `${cat}: ${item.name}`)
            .join(', ');

        return `Jesteś ekspertem od mody. Obecna kombinacja ubrań to: ${currentItems}.
Temperatura: ${temperature}°C, Okazja: ${occasion}.

Dostępne ubrania:
${JSON.stringify(CLOTHES_DATABASE, null, 2)}

Wygeneruj 3 alternatywne kombinacje, które:
1. Są stylistycznie spójne
2. Pasują do temperatury i okazji
3. Są różnorodne (różne style)

Odpowiedz TYLKO w formacie JSON:
[
  {
    "style": "nazwa stylu (np. Smart Casual, Elegant, Sporty)",
    "confidence": 95,
    "outfit": {
      "gora": id_ubrania,
      "dol": id_ubrania,
      "buty": id_ubrania,
      "okrycie": id_ubrania_lub_null
    },
    "reason": "Krótkie wyjaśnienie (1-2 zdania)"
  }
]`;
    }

    parseAIResponse(response) {
        try {
            // Usuń markdown backticks jeśli istnieją
            const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const alternatives = JSON.parse(cleaned);
            
            // Konwertuj ID na obiekty ubrań
            return alternatives.map(alt => ({
                ...alt,
                outfit: this.resolveOutfitIds(alt.outfit)
            }));
        } catch (error) {
            console.error('Parse error:', error);
            return [];
        }
    }

    resolveOutfitIds(outfitIds) {
        const resolved = {};
        const allClothes = getAllClothes();
        
        for (const [category, id] of Object.entries(outfitIds)) {
            if (id) {
                resolved[category] = allClothes.find(item => item.id === id) || null;
            } else {
                resolved[category] = null;
            }
        }
        
        return resolved;
    }

    // Lokalny algorytm jako fallback (bez AI)
    generateLocalAlternatives(currentOutfit, temperature, occasion) {
        console.log('Using local algorithm as fallback');
        
        const alternatives = [];
        const allClothes = getByOccasion(occasion);
        
        if (allClothes.length === 0) {
            return [];
        }

        // Generuj 3 różne kombinacje
        for (let i = 0; i < 3; i++) {
            const outfit = this.generateRandomOutfit(allClothes, temperature, i);
            
            alternatives.push({
                style: this.getStyleName(i),
                confidence: 75 + Math.floor(Math.random() * 15),
                outfit: outfit,
                reason: this.generateReason(outfit, temperature, occasion)
            });
        }

        return alternatives;
    }

    generateRandomOutfit(clothes, temperature, seed) {
        const outfit = {
            gora: null,
            dol: null,
            buty: null,
            okrycie: null
        };

        // Filtruj po kategorii
        const gory = clothes.filter(item => item.category === 'gora');
        const doly = clothes.filter(item => item.category === 'dol');
        const buty = clothes.filter(item => item.category === 'buty');
        const okrycia = clothes.filter(item => item.category === 'okrycie');

        // Wybierz losowe elementy (z seede dla różnorodności)
        if (gory.length > 0) outfit.gora = gory[(seed * 3) % gory.length];
        if (doly.length > 0) outfit.dol = doly[(seed * 5) % doly.length];
        if (buty.length > 0) outfit.buty = buty[(seed * 7) % buty.length];
        
        if (temperature < 18 && okrycia.length > 0) {
            outfit.okrycie = okrycia[(seed * 11) % okrycia.length];
        }

        return outfit;
    }

    getStyleName(index) {
        const styles = ['Smart Casual', 'Urban Chic', 'Classic Style'];
        return styles[index % styles.length];
    }

    generateReason(outfit, temperature, occasion) {
        const reasons = [
            `Świetna kombinacja na ${occasion}. Komfortowa i stylowa w ${temperature}°C.`,
            `Alternatywna propozycja dopasowana do pogody i okazji.`,
            `Elegancka opcja idealnie pasująca do temperatury ${temperature}°C.`
        ];
        return reasons[Math.floor(Math.random() * reasons.length)];
    }
}

// Singleton instance
const vestoAI = new VestoAI();
