import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../mock-data'; // Ensure this contains mock data as expected
import userEvent from '@testing-library/user-event';

const feature = loadFeature('../features/filterEventsByCity.feature');

defineFeature(feature, test => {
  // Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    let AppComponent;

    given('user hasn’t searched for any city', () => {
      // No need to set any state, as the default will be no city selected
    });

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the list of upcoming events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0); // Ensure some events are displayed
      });
    });
  });

  // Scenario 2: User should see a list of suggestions when they search for a city
  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    let AppComponent;
    let CitySearchDOM;

    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
      await user.type(citySearchInput, "Berlin");
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', async () => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
      expect(suggestionListItems).toHaveLength(2); // Ensure correct number of suggestions
    });
  });

  // Scenario 3: User can select a city from the suggested list
  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    let AppComponent;
    let AppDOM; 
    let CitySearchDOM;
    let citySearchInput;

    given('user was typing “Berlin” in the city textbox', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
      await user.type(citySearchInput, "Berlin");
    });

    let suggestionListItems;
    and('the list of suggested cities is showing', () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
      expect(suggestionListItems).toHaveLength(2); // Ensure suggestions are visible
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
      const user = userEvent.setup();
      await user.click(suggestionListItems[0]); // Click the first suggestion
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      expect(citySearchInput.value).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const allEvents = await getEvents();

      // Filtering the list of all events down to events located in Berlin, Germany
      const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value);
      expect(EventListItems).toHaveLength(berlinEvents.length);
    });
  });
});
