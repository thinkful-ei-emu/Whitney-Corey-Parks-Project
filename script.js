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

const apiKey = 'qWKDafaU2ia5S8an2zSq6TCkRK9dgVcZztRpbMLk';
const searchURL = '';

// Format query parameters
function formatQueryParams() {}

// Display results
function displayResults() {}

// Get parks
function getParks() {}

// Listen for form submision
function watchForm() {}

// Load listener when page is ready
$(watchForm);
