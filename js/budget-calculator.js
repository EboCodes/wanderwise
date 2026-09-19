// Travel Budget Calculator Module for WanderWise

function calculateTravelBudgetBreakdown({ destinationId, durationDays = 5, travelersCount = 1, style = "midrange" }) {
    const destination = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
    const duration = parseInt(durationDays, 10);
    const travelers = parseInt(travelersCount, 10);

    let styleMultiplier = 1.0;
    if (style === "budget") styleMultiplier = 0.6;
    else if (style === "luxury") styleMultiplier = 2.2;

    const basePerPersonPerDay = destination.avgBudgetPerDay * styleMultiplier;
    const totalTripCost = basePerPersonPerDay * duration * travelers;

    const accommodationCost = Math.round(totalTripCost * 0.45);
    const foodCost = Math.round(totalTripCost * 0.30);
    const transportCost = Math.round(totalTripCost * 0.15);
    const activitiesCost = Math.round(totalTripCost * 0.10);

    return {
        destinationName: destination.name,
        durationDays: duration,
        travelersCount: travelers,
        style: style,
        perPersonPerDay: Math.round(basePerPersonPerDay),
        totalTripCost: Math.round(totalTripCost),
        breakdown: {
            accommodation: accommodationCost,
            food: foodCost,
            transport: transportCost,
            activities: activitiesCost
        }
    };
}

function formatTravelCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount);
}
