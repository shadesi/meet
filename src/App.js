// src/App.js

import React, { useState, useEffect } from 'react';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import { getEvents } from './api';

const App = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentNOE, setCurrentNOE] = useState(32); // Default to 32
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    const fetchedEvents = await getEvents(currentCity, currentNOE); // Adjust API call to accept currentNOE
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); // Add currentNOE to dependencies

  return (
    <div className="App">
      <h1>Event Finder</h1>
      <CitySearch setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
};

export default App;
