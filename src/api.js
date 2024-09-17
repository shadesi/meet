import mockData from "./mock-data";

/**
 * Extract locations from the events data, removing duplicates.
 * @param {*} events - array of event objects
 * @returns Array of unique locations
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Fetch the list of all events (mocked data)
 * @returns Promise resolving to the array of events
 */
export const getEvents = async () => {
  return mockData;
};
