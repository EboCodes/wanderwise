// Main Application Controller for WanderWise

let activeRegionFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderDestinationsGrid();
    renderTravelTipsList();
    updateSavedBadgeCount();
    setupBudgetCalcWidget();

    // Mobile menu toggle
    const burger = document.getElementById('nav-burger');
    const drawer = document.getElementById('nav-drawer');
    if (burger && drawer) {
        burger.addEventListener('click', () => {
            drawer.classList.toggle('hidden');
        });
    }

    // Favorites event listener
    window.addEventListener('savedTripsUpdated', () => {
        if (document.getElementById('page-saved') && !document.getElementById('page-saved').classList.contains('hidden')) {
            renderSavedTripsView();
        }
        renderDestinationsGrid();
    });
}

// Navigation & View Switching
function showPage(pageId, param = null) {
    const pages = ['home', 'details', 'saved', 'planner', 'about'];
    pages.forEach(p => {
        const el = document.getElementById(`page-${p}`);
        if (el) el.classList.add('hidden');
    });

    const target = document.getElementById(`page-${pageId}`);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (pageId === 'saved') {
        renderSavedTripsView();
    } else if (pageId === 'home') {
        renderDestinationsGrid();
    }

    document.getElementById('nav-drawer')?.classList.add('hidden');
}

// Region Filter Switcher (All / USA / Europe)
function filterRegion(region) {
    activeRegionFilter = region;

    const tabs = document.querySelectorAll('.region-tab');
    tabs.forEach(tab => {
        if (tab.dataset.region === region) {
            tab.classList.add('bg-slate-900', 'text-white', 'shadow-md');
            tab.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        } else {
            tab.classList.remove('bg-slate-900', 'text-white', 'shadow-md');
            tab.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        }
    });

    renderDestinationsGrid();
}

// Render Destinations Grid
function renderDestinationsGrid() {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    let items = DESTINATIONS;
    if (activeRegionFilter !== 'all') {
        items = items.filter(d => d.region === activeRegionFilter);
    }

    grid.innerHTML = items.map(dest => createDestinationCardHTML(dest)).join('');
}

function createDestinationCardHTML(dest) {
    const saved = isTripSaved(dest.id);
    return `
        <div class="dest-card bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
                <div class="dest-card-img-wrap h-56 w-full cursor-pointer bg-slate-900" onclick="openItineraryModal('${dest.id}')">
                    <img src="${dest.image}" 
                         onerror="this.onerror=null; this.src='https://placehold.co/800x600/0b132b/ffffff?text=${encodeURIComponent(dest.name)}';" 
                         alt="${dest.name}" 
                         class="w-full h-full object-cover">
                    
                    <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        ${dest.country}
                    </span>

                    <button onclick="event.stopPropagation(); toggleSaveTrip('${dest.id}');" 
                            class="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition">
                        <i class="${saved ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-base"></i>
                    </button>
                </div>

                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 onclick="openItineraryModal('${dest.id}')" class="text-xl font-bold text-slate-900 hover:text-terracotta transition cursor-pointer">
                            ${dest.name}
                        </h3>
                        <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                            <i class="fa-solid fa-star text-amber-500 mr-1"></i> ${dest.rating}
                        </span>
                    </div>

                    <p class="text-xs font-semibold text-terracotta mb-3">${dest.tagline}</p>
                    <p class="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">${dest.description}</p>

                    <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-700 flex justify-between items-center mb-2">
                        <span>Best Time: <strong class="text-slate-900">${dest.bestTime}</strong></span>
                        <span>Est: <strong class="text-slate-900">$${dest.avgBudgetPerDay}/day</strong></span>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <button onclick="openItineraryModal('${dest.id}')" class="text-xs font-bold text-slate-900 hover:text-terracotta transition flex items-center">
                    Generate Itinerary <i class="fa-solid fa-arrow-right ml-1.5 text-terracotta"></i>
                </button>
            </div>
        </div>
    `;
}

// Render Travel Tips List
function renderTravelTipsList() {
    const list = document.getElementById('travel-tips-list');
    if (!list) return;

    list.innerHTML = TRAVEL_TIPS.map(tip => `
        <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
            <span class="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                ${tip.id}
            </span>
            <div>
                <h4 class="text-sm font-bold text-slate-900">${tip.title}</h4>
                <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${tip.tip}</p>
            </div>
        </div>
    `).join('');
}

// Render Saved Trips Page
function renderSavedTripsView() {
    const savedIds = getSavedTrips();
    const savedDest = DESTINATIONS.filter(d => savedIds.includes(d.id));

    const grid = document.getElementById('saved-grid');
    const emptyState = document.getElementById('saved-empty');

    if (!grid) return;

    if (savedDest.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
        grid.innerHTML = savedDest.map(dest => createDestinationCardHTML(dest)).join('');
    }
}

// Itinerary Generator Modal Handler
function openItineraryModal(destId = null) {
    const dest = DESTINATIONS.find(d => d.id === destId) || DESTINATIONS[0];
    const select = document.getElementById('planner-dest-select');
    if (select) select.value = dest.id;

    updateModalItineraryOutput();

    const modal = document.getElementById('itinerary-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeItineraryModal() {
    document.getElementById('itinerary-modal')?.classList.add('hidden');
}

function updateModalItineraryOutput() {
    const destId = document.getElementById('planner-dest-select')?.value || 'paris';
    const duration = document.getElementById('planner-duration-select')?.value || '5';
    const style = document.getElementById('planner-style-select')?.value || 'culture';

    const plan = generateCustomItinerary({
        destinationId: destId,
        durationDays: duration,
        style: style
    });

    const outputContainer = document.getElementById('itinerary-output-container');
    if (!outputContainer) return;

    outputContainer.innerHTML = `
        <div class="space-y-6">
            <div class="relative h-52 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src="${plan.destination.image}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                    <p class="text-2xl font-bold">${plan.destination.name}, ${plan.destination.country}</p>
                    <p class="text-xs text-amber-300 font-semibold">${plan.durationDays}-Day Custom Itinerary &bull; Est. Budget: ${formatTravelCurrency(plan.estimatedTotalCost)}</p>
                </div>
            </div>

            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-amber-700 mb-4">Day-by-Day Timeline</h4>
                <div class="space-y-4 pl-6 border-l-2 border-amber-200">
                    ${plan.daysPlan.map(day => `
                        <div class="timeline-dot bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                            <h5 class="text-sm font-bold text-slate-900">${day.title}</h5>
                            <p class="text-xs text-slate-600 mt-1 leading-relaxed">${day.description}</p>
                            <p class="text-[11px] font-semibold text-amber-700 mt-2"><i class="fa-solid fa-utensils mr-1"></i> ${day.suggestedMeal}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Budget Calculator Widget Setup
function setupBudgetCalcWidget() {
    const destSelect = document.getElementById('calc-dest-select');
    if (destSelect) {
        destSelect.innerHTML = DESTINATIONS.map(d => `<option value="${d.id}">${d.name} (${d.country})</option>`).join('');
    }

    updateBudgetCalcOutput();
}

function updateBudgetCalcOutput() {
    const destId = document.getElementById('calc-dest-select')?.value || 'paris';
    const duration = parseInt(document.getElementById('calc-duration-input')?.value || '5', 10);
    const travelers = parseInt(document.getElementById('calc-travelers-input')?.value || '1', 10);
    const style = document.getElementById('calc-style-select')?.value || 'midrange';

    const calc = calculateTravelBudgetBreakdown({
        destinationId: destId,
        durationDays: duration,
        travelersCount: travelers,
        style: style
    });

    const accEl = document.getElementById('calc-out-acc');
    const foodEl = document.getElementById('calc-out-food');
    const transEl = document.getElementById('calc-out-trans');
    const actEl = document.getElementById('calc-out-act');
    const totalEl = document.getElementById('calc-out-total');

    if (accEl) accEl.textContent = formatTravelCurrency(calc.breakdown.accommodation);
    if (foodEl) foodEl.textContent = formatTravelCurrency(calc.breakdown.food);
    if (transEl) transEl.textContent = formatTravelCurrency(calc.breakdown.transport);
    if (actEl) actEl.textContent = formatTravelCurrency(calc.breakdown.activities);
    if (totalEl) totalEl.textContent = formatTravelCurrency(calc.totalTripCost);
}

// Global Exports
window.showPage = showPage;
window.filterRegion = filterRegion;
window.openItineraryModal = openItineraryModal;
window.closeItineraryModal = closeItineraryModal;
window.updateModalItineraryOutput = updateModalItineraryOutput;
window.updateBudgetCalcOutput = updateBudgetCalcOutput;
