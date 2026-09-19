// Wishlist & Saved Trips Manager for WanderWise

const SAVED_TRIPS_KEY = 'wanderwise_saved_trips';

function getSavedTrips() {
    try {
        const stored = localStorage.getItem(SAVED_TRIPS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading saved trips", e);
        return [];
    }
}

function isTripSaved(destId) {
    const list = getSavedTrips();
    return list.includes(destId);
}

function toggleSaveTrip(destId) {
    let list = getSavedTrips();
    if (list.includes(destId)) {
        list = list.filter(id => id !== destId);
    } else {
        list.push(destId);
    }

    try {
        localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(list));
    } catch (e) {
        console.error("Error saving trip", e);
    }

    updateSavedBadgeCount();
    window.dispatchEvent(new CustomEvent('savedTripsUpdated', { detail: { list, destId } }));
    return list.includes(destId);
}

function updateSavedBadgeCount() {
    const count = getSavedTrips().length;
    const badges = document.querySelectorAll('.saved-trips-badge');
    badges.forEach(b => {
        b.textContent = count;
        if (count > 0) b.classList.remove('hidden');
        else b.classList.add('hidden');
    });
}
