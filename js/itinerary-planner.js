// Interactive Custom Itinerary Planner Engine for WanderWise

function generateCustomItinerary({ destinationId, durationDays = 5, style = "culture" }) {
    const destination = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
    const duration = parseInt(durationDays, 10);

    // Style multipliers for budget adjustment
    let styleMultiplier = 1.0;
    if (style === "budget") styleMultiplier = 0.65;
    else if (style === "adventure") styleMultiplier = 0.9;
    else if (style === "luxury") styleMultiplier = 1.8;

    const estimatedDailyCost = Math.round(destination.avgBudgetPerDay * styleMultiplier);
    const estimatedTotalCost = estimatedDailyCost * duration;

    // Generate Day Timeline Schedule
    const daysPlan = [];
    const itineraryKeys = Object.keys(destination.itineraries);

    for (let d = 1; d <= duration; d++) {
        let key = `day${d}`;
        let description = destination.itineraries[key];

        if (!description) {
            if (d === 4) description = "Relaxation, local neighborhood exploration, and artisanal market discovery.";
            else if (d === 6) description = "Scenic day trip to surrounding countryside, historic estates, and regional dining.";
            else if (d >= 8) description = "Leisurely morning coffee, souvenir shopping, museum visit, and farewell dinner.";
            else description = "Exploring hidden gems and local culinary hot spots off the main tourist track.";
        }

        daysPlan.push({
            dayNumber: d,
            title: `Day ${d}: ${d === 1 ? 'Arrival & Neighborhood Orientation' : (d === duration ? 'Final Sightseeing & Departure' : 'Exploration & Highlights')}`,
            description: description,
            suggestedMeal: d % 2 === 0 ? "Local Bistro / Trattoria" : "Street Food Market & Cafe",
            estimatedDaySpend: estimatedDailyCost
        });
    }

    return {
        destination: destination,
        durationDays: duration,
        style: style,
        estimatedDailyCost: estimatedDailyCost,
        estimatedTotalCost: estimatedTotalCost,
        daysPlan: daysPlan
    };
}
