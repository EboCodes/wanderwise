// WanderWise Master Travel Dataset

const DESTINATIONS = [
    {
        id: "paris",
        name: "Paris",
        region: "europe",
        country: "France",
        tagline: "The City of Light, Art & Culinary Mastery",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80",
        rating: 4.9,
        bestTime: "April - June & Sept - Nov",
        avgBudgetPerDay: 165, // USD mid-range
        description: "Explore world-class museums, historic boulevards, iconic architecture, and vibrant bistro culture along the Seine.",
        highlights: ["Louvre & Musée d'Orsay", "Eiffel Tower Sunset", "Montmartre & Sacré-Cœur", "Le Marais Bakery Trail"],
        itineraries: {
            day1: "Arrival, check-in at Le Marais, walk along the Seine, evening Eiffel Tower lights.",
            day2: "Morning at the Louvre, lunch in Tuileries Garden, afternoon exploring Saint-Germain-des-Prés.",
            day3: "Day trip to Versailles Palace & Gardens, evening dinner cruise along the Seine.",
            day5: "Montmartre artist quarter, Sacré-Cœur panorama, wine tasting in Latin Quarter.",
            day7: "Musée d'Orsay, shopping along Champs-Élysées, farewell dinner at a classic French bistro."
        }
    },
    {
        id: "grand-canyon",
        name: "Grand Canyon National Park",
        region: "usa",
        country: "United States (Arizona)",
        tagline: "One of the Seven Natural Wonders of the World",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=900&q=80",
        rating: 4.95,
        bestTime: "March - May & Sept - Nov",
        avgBudgetPerDay: 140,
        description: "Immerse yourself in 277 miles of dramatic red rock gorges, epic rim hikes, and unforgettable stargazing.",
        highlights: ["South Rim Trail", "Bright Angel Hike", "Mather Point Sunrise", "Desert View Watchtower"],
        itineraries: {
            day1: "Arrive at Grand Canyon Village, watch sunset at Mather Point, stargazing along South Rim.",
            day2: "Early morning hike along Bright Angel Trail down to 1.5-Mile Resthouse, afternoon Rim Trail stroll.",
            day3: "Drive the Desert View Watchtower scenic route, explore Tusayan ruins, helicopter canyon tour.",
            day5: "Hike South Kaibab Trail to Ooh Aah Point, picnic at Hermit's Rest, evening campfire talk.",
            day7: "Day excursion to Horseshoe Bend and Antelope Canyon in nearby Page, Arizona."
        }
    },
    {
        id: "rome",
        name: "Rome",
        region: "europe",
        country: "Italy",
        tagline: "The Eternal City of Ancient Empires & Gelato",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80",
        rating: 4.88,
        bestTime: "October - April",
        avgBudgetPerDay: 155,
        description: "Walk through millennia of history, from the Colosseum and Roman Forum to Trastevere's cobblestone trattorias.",
        highlights: ["Colosseum & Forum", "Vatican Museums & Sistine Chapel", "Trevi Fountain", "Trastevere Food Tour"],
        itineraries: {
            day1: "Arrive in Rome, walk past Trevi Fountain & Pantheon, evening pasta dinner in Piazza Navona.",
            day2: "Guided morning tour of Colosseum, Palatine Hill & Roman Forum, afternoon gelato in Monti.",
            day3: "Vatican City tour (St. Peter's Basilica & Sistine Chapel), sunset views from Janiculum Hill.",
            day5: "Exploring Borghese Gallery & Gardens, evening food and wine tasting tour in Trastevere.",
            day7: "Day trip to the ancient ruins of Pompeii & Mount Vesuvius."
        }
    },
    {
        id: "nyc",
        name: "New York City",
        region: "usa",
        country: "United States (New York)",
        tagline: "The Global Capital of Culture, Theater & Energy",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80",
        rating: 4.85,
        bestTime: "September - November & April - May",
        avgBudgetPerDay: 210,
        description: "Experience the non-stop energy of NYC, from Broadway theaters and Central Park to Soho shopping and skyline view decks.",
        highlights: ["Central Park Walk", "Broadway Show", "High Line & Hudson Yards", "Brooklyn Bridge Sunset"],
        itineraries: {
            day1: "Arrive in Manhattan, check-in, walk through Times Square, dinner in Hell's Kitchen.",
            day2: "Morning in Central Park & Met Museum, afternoon stroll down 5th Avenue, evening Broadway show.",
            day3: "Walk across Brooklyn Bridge to DUMBO, High Line park walk, sunset at SUMMIT One Vanderbilt.",
            day5: "Statue of Liberty & Ellis Island ferry, 9/11 Memorial, dinner & jazz club in Greenwich Village.",
            day7: "Soho shopping, Chelsea Market food hall tour, Empire State Building night observation deck."
        }
    },
    {
        id: "amalfi",
        name: "Amalfi Coast",
        region: "europe",
        country: "Italy",
        tagline: "Cliffside Villages, Azure Waters & Limoncello",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=80",
        rating: 4.92,
        bestTime: "May - June & September",
        avgBudgetPerDay: 190,
        description: "Dramatic coastal cliffs, pastel-colored villages, lemon groves, and Mediterranean boat excursions.",
        highlights: ["Positano Cliff Village", "Path of the Gods Hike", "Capri Island Boat Excursion", "Ravello Gardens"],
        itineraries: {
            day1: "Arrive in Positano, explore cliffside streets, seaside seafood dinner.",
            day2: "Full-day boat trip around Capri Island, visit Blue Grotto & Faraglioni Rocks.",
            day3: "Hike the legendary Path of the Gods (Sentiero degli Dei) from Bomerano to Nocelle.",
            day5: "Visit Amalfi town cathedral, explore Villa Rufolo and Villa Cimbrone in Ravello.",
            day7: "Day tour to Sorrento & lemon grove limoncello tasting workshop."
        }
    },
    {
        id: "yellowstone",
        name: "Yellowstone National Park",
        region: "usa",
        country: "United States (Wyoming)",
        tagline: "Geysers, Wildlife Sanctuaries & Alpine Wilderness",
        image: "https://images.unsplash.com/photo-1541079998400-58e2e38020f8?w=900&q=80",
        rating: 4.94,
        bestTime: "June - September",
        avgBudgetPerDay: 145,
        description: "America's first national park featuring geothermal geysers, thermal hot springs, bison herds, and pristine wilderness.",
        highlights: ["Old Faithful Geyser", "Grand Prismatic Spring", "Lamar Valley Wildlife Safari", "Grand Canyon of Yellowstone"],
        itineraries: {
            day1: "Enter Yellowstone via West Entrance, watch Old Faithful eruption, explore Upper Geyser Basin.",
            day2: "Marvel at Grand Prismatic Spring thermal boardwalk, drive to Norris Geyser Basin.",
            day3: "Early morning wildlife safari in Lamar Valley (bison, wolves, elk), hike Mount Washburn.",
            day5: "View Lower Falls at Grand Canyon of the Yellowstone, boat tour on Yellowstone Lake.",
            day7: "Day trip south to Grand Teton National Park and Jackson Hole."
        }
    }
];

const TRAVEL_TIPS = [
    {
        id: 1,
        title: "Book Rail Passes in Europe 3+ Weeks Out",
        category: "Transportation",
        tip: "Advance high-speed train fares (Eurostar, Trenitalia, TGV) can be 60-70% cheaper than walk-up station prices."
    },
    {
        id: 2,
        title: "US National Parks: Arrive Before 8:00 AM",
        category: "Sightseeing",
        tip: "Beat crowd congestion, secure trailhead parking, and catch active wildlife in early morning hours."
    },
    {
        id: 3,
        title: "Keep Digital & Printed Offline Maps",
        category: "Safety",
        tip: "Cell coverage in canyon parks and remote European villages can drop; download Google Maps or Maps.me offline packs."
    }
];
