const apiKey = 'zmmW3cBfAyPh0fqBsG3t9ISwkndGYDtwhj5I0kUC'

function getParks(query, maxResults=5) {
  const params = {
    stateCode: query,
    limit: maxResults,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  const url = `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);