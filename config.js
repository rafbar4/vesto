// Konfiguracja API dla Stylar

const CONFIG = {
    // Klucz API OpenWeatherMap
    // Zarejestruj się na: https://openweathermap.org/api
    // Możesz użyć poniższego klucza lub wygenerować własny
    WEATHER_API_KEY: 'd6cb29904d4b6f1870952db287d60a1e',
    
    // URL API OpenWeatherMap
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather',
    
    // Domyślne miasto (opcjonalnie)
    DEFAULT_CITY: 'Poznań',
    
    // Ustawienia aplikacji
    APP_NAME: 'Stylar',
    APP_VERSION: '1.0.0'
};

// Eksport dla kompatybilności
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
