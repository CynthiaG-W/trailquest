/* saved trails */

const SAVED_TRAILS_KEY = "trailquest_saved_trails";

export function getSavedTrails() {
  const saved = localStorage.getItem(
    SAVED_TRAILS_KEY
  );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function isTrailSaved(trailId) {
  const savedTrails = getSavedTrails();

  return savedTrails.some(
    (trail) =>
      String(trail.id) === String(trailId)
  );
}

export function toggleSavedTrail(trail) {
  const savedTrails = getSavedTrails();

  const alreadySaved = savedTrails.some(
    (item) =>
      String(item.id) === String(trail.id)
  );

  if (alreadySaved) {
    const updatedTrails = savedTrails.filter(
      (item) =>
        String(item.id) !== String(trail.id)
    );

    localStorage.setItem(
      SAVED_TRAILS_KEY,
      JSON.stringify(updatedTrails)
    );

    return false;
  }

  const updatedTrails = [
    ...savedTrails,
    trail,
  ];

  localStorage.setItem(
    SAVED_TRAILS_KEY,
    JSON.stringify(updatedTrails)
  );

  return true;
}


/* saved events */

const SAVED_EVENTS_KEY = "trailquest_saved_events";

export function getSavedEvents() {
  const saved = localStorage.getItem(
    SAVED_EVENTS_KEY
  );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function isEventSaved(eventId) {
  const savedEvents = getSavedEvents();

  return savedEvents.some(
    (event) =>
      String(event.id) === String(eventId)
  );
}

export function toggleSavedEvent(event) {
  const savedEvents = getSavedEvents();

  const alreadySaved = savedEvents.some(
    (item) =>
      String(item.id) === String(event.id)
  );

  if (alreadySaved) {
    const updatedEvents = savedEvents.filter(
      (item) =>
        String(item.id) !== String(event.id)
    );

    localStorage.setItem(
      SAVED_EVENTS_KEY,
      JSON.stringify(updatedEvents)
    );

    return false;
  }

  const updatedEvents = [
    ...savedEvents,
    event,
  ];

  localStorage.setItem(
    SAVED_EVENTS_KEY,
    JSON.stringify(updatedEvents)
  );

  return true;
}


/* explored trails */

const EXPLORED_TRAILS_KEY =
  "trailquest_explored_trails";

export function getExploredTrails() {
  const explored = localStorage.getItem(
    EXPLORED_TRAILS_KEY
  );

  if (!explored) {
    return [];
  }

  try {
    return JSON.parse(explored);
  } catch {
    return [];
  }
}

export function isTrailExplored(trailId) {
  const exploredTrails =
    getExploredTrails();

  return exploredTrails.some(
    (trail) =>
      String(trail.id) === String(trailId)
  );
}

export function toggleExploredTrail(trail) {
  const exploredTrails =
    getExploredTrails();

  const alreadyExplored =
    exploredTrails.some(
      (item) =>
        String(item.id) === String(trail.id)
    );

  if (alreadyExplored) {
    const updatedTrails =
      exploredTrails.filter(
        (item) =>
          String(item.id) !== String(trail.id)
      );

    localStorage.setItem(
      EXPLORED_TRAILS_KEY,
      JSON.stringify(updatedTrails)
    );

    return false;
  }

  const updatedTrails = [
    ...exploredTrails,
    trail,
  ];

  localStorage.setItem(
    EXPLORED_TRAILS_KEY,
    JSON.stringify(updatedTrails)
  );

  return true;
}