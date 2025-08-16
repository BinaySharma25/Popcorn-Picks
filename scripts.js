const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-conatiner');
const inputBox = document.querySelector('.inputBox');


const getMovieInfo = async (movie) => {
    try{
    const response = await fetch(url);

        if(!response.ok){
            throw new Error("Movie not found or API error");
        }

    const data = await response.json();

    showMovieData(data);
    }
   catch(error){
        showErrorMessage("An error occurred while fetching movie details. Please try again later.");
   }
}

//Function to show data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
    // used destructuring assignment to extract properties from data object 
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

   const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>IMDb Rating: &#11088;</strong> ${imdbRating}</p>`;
    
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `
    <p><strong>Released Date: </strong>${Released}</p>
    <p><strong>Duration: </strong>${Runtime}</p>
    <p><strong>Cast: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>`;

    //creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}">`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}
//function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}
//Function to handle the from submission
const handleFormSubmit = (e) => {
     e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information...")
        getMovieInfo(movieName);
    }else{
       showErrorMessage("Enter movie name to get movie details.");
    }
}
// Adding event listener to search form
searchForm.addEventListener('submit', handleFormSubmit);

// Trigger search when Enter is pressed in input
inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchForm.dispatchEvent(new Event('submit'));
    }
});


// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('nav').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelector('.movie-conatiner').classList.toggle('dark-mode');
    darkModeToggle.textContent = 
        document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';

});
