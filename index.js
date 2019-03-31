const apiKey = 'zmmW3cBfAyPh0fqBsG3t9ISwkndGYDtwhj5I0kUC'

const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(query, searchState, maxResults=5) {
  const params = {
    q: query,
    limit: maxResults,
    language: "en",
    stateCode: searchState,
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
    .then(responseJson => {
      displayResults(responseJson.data);
    }) 
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatAnswerParams(responseJson) {
  const answerItems = Object.keys(responseJson)
   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(responseJson[key])}`);
   console.log(answerItems);
}

function displayResults(answerItems) {
  console.log(answerItems);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let index = 0; index < answerItems.length; index++){
    console.log(answerItems[index].description);
    $('#results-list').append(
      `<li><h3>${answerItems[index].fullname}</h3></li>
      <li>${answerItems[index].description}</li>
      <li><a href="${answerItems[index].url}">${answerItems[index].url}</a></li>`
  )};
  console.log('it works');
  
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, searchState, maxResults);
  });
}

$(watchForm);