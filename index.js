const apiKey = 'zmmW3cBfAyPh0fqBsG3t9ISwkndGYDtwhj5I0kUC'

const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(query, maxResults=5) {
  const params = {
    parkCode: query,
    limit: maxResults,
    language: "en",
    "api_key" : apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(answerItems, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatAnswerParams(responseJson) {
  const answerItems = Object.keys(responseJson)
   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(responseJson[key])}`);
   console.log(answerItems);
}

function displayResults(answerItems, maxResults) {
  console.log("working");
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < answerItems & i<maxResults ; i++){
    $('#results-list').append(
      `<li><h3>${answerItems.data.fullName}</h3></li>
    <li>${answerItems.data.description}<li>
    <li><a href="${answerItems.data.url}">${answerItems.data.url}</a></li>`
  )};
  console.log('it works');
  
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);