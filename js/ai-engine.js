// Vesto AI Engine — Frontend Safe Version

class VestoAI {

    async generateAlternatives(currentOutfit, temperature, occasion) {

        console.log("AI generating (local engine)");

        return this.generateLocalAlternatives(currentOutfit, temperature, occasion);

    }

    generateLocalAlternatives(currentOutfit, temperature, occasion) {

        const allClothes = getByOccasion(occasion);

        if (allClothes.length === 0) {
            return [];
        }

        const results = [];

        for (let i = 0; i < 3; i++) {

            const outfit = this.generateOutfit(allClothes, temperature, i);

            results.push({
                style: this.getStyle(i),
                confidence: 80 + Math.floor(Math.random() * 15),
                outfit,
                reason: this.getReason(temperature, occasion)
            });
        }

        return results;
    }

    generateOutfit(clothes, temperature, seed) {

        const pick = (arr, mult) =>
            arr.length ? arr[(seed * mult) % arr.length] : null;

        const tops = clothes.filter(c => c.category === 'gora');
        const bottoms = clothes.filter(c => c.category === 'dol');
        const shoes = clothes.filter(c => c.category === 'buty');
        const jackets = clothes.filter(c => c.category === 'okrycie');

        return {
            gora: pick(tops, 3),
            dol: pick(bottoms, 5),
            buty: pick(shoes, 7),
            okrycie: temperature < 18 ? pick(jackets, 11) : null
        };
    }

    getStyle(i) {
        return ['Smart Casual', 'Street Style', 'Classic Look'][i];
    }

    getReason(temp, occasion) {

        return `Styl dopasowany do ${occasion} oraz temperatury ${temp}°C. Komfort i estetyka zachowane.`;
    }
}

const vestoAI = new VestoAI();
