'use strict';
/**
 * 1. User must be able to search for parks in one or more states
 * 2. User must be able to set the max num of results, with a default of 10
 * 3. The search must trigger a call to NPS's API
 * 4. The parks in the given state must be displayed on the page
 * AND include at least: full name, description, website URL
 * 5. User must be able to make multiple searches and see only the results for the current search
 * 6. Stretch goal: add park's address to the results
 */

// Remember to pass api key like: 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE'
// Base URL: https://developer.nps.gov/api/v1
// /Park accepts queries - stateCode => a comma delimited list of 2 character state codes(array [string]), limit => number of results to return per request. Default is 50 (integer), q => term to search on, 

// API key, normally don't publish this
const apiKey = 'qWKDafaU2ia5S8an2zSq6TCkRK9dgVcZztRpbMLk';
// Base url before params
const searchURL = 'https://developer.nps.gov/api/v1/parks';

// Format query parameters so they can be added to the searchURL
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

// Display results
function displayResults(responseJson) {
  $('#js-results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#js-results-list').append(
      // html for list
      `<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>Location: ${responseJson.data[i].states}</p>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">Visit This Park's Website!</a>
      </li>
      <div class="line"></div>`
    );
  }
  $('#js-results').removeClass('hidden');
}

// Get parks
function getParks(searchState, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: [searchState],
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log('About to fetch', params, url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

// Listen for form submision
function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const searchState = $('.js-state-submit').val().replace(' ', '');
    const maxResults = $('.js-max-results').val();
    //console.log('Heard the form, sending to getParks with ', searchState, maxResults);
    getParks(searchState, maxResults);
  });
}

// Load listener when page is ready
$(watchForm);
