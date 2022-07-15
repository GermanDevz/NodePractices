require('colors')


require('dotenv').config();
const query = 'search/movie'

//const api_key ='bbb7be99b28cbabeb49a1afc50e9416e'
 
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

      
     getMovieList = async(movieName='',lenguage='en-USA')=>{
        const moviesList =[];
        const movies =await  Search.getMovies(movieName);
        if(movies.status === 200 ){
            movies.data.results.forEach(movie=>{
                moviesList.push({
                    title: movie.title,
                    id:movie.id,
                    overview:movie.overview
                })
            })
        }
       this.history.push(`${movieName.gray} -> ${(moviesList.length+"").green} results`);
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


