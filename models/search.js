require('colors')
require('dotenv').config();
const query = 'search/movie'
const url = 'https://api.themoviedb.org/3/search/movie';
const axios = require('axios');
 
 
 class Search{
    
    
    constructor(){
        this.history = [];
    }

    
     static getMovies = async(movieName='',lenguage='en-USA')=>{
        const movies =  await axios.create({
            baseURL: `${url}`,
            responseType:'json',
            params:  {
                'api_key': process.env.TMDB_KEY,
                'query':movieName,
                'lenguage':lenguage,
               
        }
        }).get();
        
        return movies;
     }

     static getId = async (id)=>{
        const movie = await axios.create({
        baseURL: `https://api.themoviedb.org/3/movie/${id}`,
        responseType:'json',
        params:  {
                'api_key': process.env.TMDB_KEY,
             }
        }).get();
        return movie;
     }

     getMovieWithId = async (id)=>{
        let result;
        const movie = await Search.getId(id);
        if(movie.status === 200){
            if(movie.data.result === []) result = null;
            else{
                console.log(movie);
                result = {
                    title:       movie.data.title,
                    date:        movie.data.release_date,
                    description: movie.data.overview,
                    adult:       movie.data.adult,
                    budget:      movie.data.budget,
                    genres:      movie.data.genres.map(gen =>gen.name),
                    popularity:  movie.data.popularity

                }

            }
           
        }
        else result = null;

        return result
     };
      
     getMovieList = async(movieName='',lenguage='en-USA')=>{
        const moviesList =[];
        const movies =await  Search.getMovies(movieName);
        if(movies.status === 200 ){
           movies.data.results.forEach(movie=>{
               moviesList.push({
                   title: movie.title,
                   id:movie.id,
                   date: movie.release_date
               });
           });
        this.history.push(`${movieName.gray} -> ${(moviesList.length+"").green} results`);
       }
       return moviesList;
    }


    
    getHistory = async ()=>{
        console.log(`historial: \n`)
        this.history.forEach((element, index) => {
        console.log(`${index+1} ${element}`);
        });   
    }
    


}



module.exports = Search;


