const apiKey = 'zmmW3cBfAyPh0fqBsG3t9ISwkndGYDtwhj5I0kUC'

const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log("working", responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  const parks = responseJson.map(function(park) {
    return `<li><h3>${park.fullName}</h3></li>
    <li>${park.description}<li>
    <li><a href="${park.url}">${park.url}</a></li>`;
  });
  console.log('it works', parks);
  $('#results-list').append(parks) 
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=5) {
  const params = {
    parkCode: query,
    limit: maxResults,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);