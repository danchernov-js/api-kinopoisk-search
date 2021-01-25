import axios from "axios";

async function search({ term, page }) {
    if (term == null)
        return {
            items: [],
            maxPages: 1
        };

    let movies = [];
    let maxPages = 0;
    let currentPage = 1;

    while(true) {
        if (currentPage == maxPages)
            break;

        var response = getData(currentPage);

        if (response.status !== 200)
            return response.data;

        let pageMovies = response.data.movies.filter(movie => {
            return movie.title.toLowerCase().indexOf(term.toLowerCase()) != -1;
        })

        movies.push(...pageMovies);

        maxPages = response.data.pagination.total_pages;
        currentPage++;
    }

    return {
        items: movies,
        maxPages: maxPages
    };
}

function getData(page) {
    //let url = `https://api.kinopoisk.cloud/movies/all/page/${page}/token/26ae258e5b4382bd838cf3cf79c8a1dc`;
    //let response = (await axios.get(url.toString()));
    //return response;

    return {
        data: {
            movies: [{
                title: "HZ",
                actors: ["1", "2"]
            },{
                title: "HZ2",
                actors: ["3", "4"]
            },{
                title: "HZ3",
                actors: ["4", "5"]
            }],
            pagination: {
                total_pages: 5
            }
        },
        status: 200
    }
}
  
export { search };