// Global Constants
const apiKey = "6893req95Aj3boJhu1mllYB2TQ7Lz4vD"
const GIPHY_API_BASE_URL = `http://api.giphy.com/v1/gifs/search`
const limit = 15
const rating = 'g'

let pageNum = 0
let offset = 0

const search_form = document.getElementById("search-form")
const search_input = document.getElementById("search-input")
const submit_btn = document.getElementById("search-button")
const dis_results = document.getElementById("display")
const more_btn = document.getElementById("load-more")

/**
 * 
 * Update the DOM to display results from the Giphy API query.
 * 
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
  // YOUR CODE HERE
  display.innerHTML = ''
  results.data.forEach((element) => {
    let gif = document.createElement('img');
    gif.src = element.images.original.url
    display.innerHTML +=`<img src="${gif.src}" alt="image">`
  })

}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  // YOUR CODE HERE
  const res = await fetch (`${GIPHY_API_BASE_URL}?q=${searchTerm}&limit=${limit}&offset=${offset}&api_key=${apiKey}`)
  const data = await res.json()
  console.log (data)
  displayResults(data)
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  event.preventDefault() // stops from from refreshing
  console.log(search_input.value)
  getGiphyApiResults(search_input.value)
  more_btn?.classList?.remove?.("hidden")
}

// searchForm.addEventListener("submit", handleFormSubmit)

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  // YOUR CODE HERE
  offset += 15
  let res = document.getElementById('search-input');
  let data = await getGiphyApiResults(res.value)
  displayResults(data)
}

window.onload = function () {
  // YOUR CODE HERE
  // Add any event handlers here
 
 submit_btn.addEventListener("click", handleFormSubmit)
 more_btn.addEventListerner("click", handleShowMore)
}
