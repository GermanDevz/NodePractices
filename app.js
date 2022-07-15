const {menu, pause, leerInput} = require('./utils/inquirer')
const Search = require('./models/search');



const main = async()=>{

    let opt
    let endComand = false
    const search = new Search()

   do{

    opt = await menu();


    switch(opt){

        case 0:
            endComand = true;
            console.log(`End program \n`);
            break;
        case 1:
            let movieName = await leerInput('Movie');
            
            const movieList = await search.getMovieList(movieName)
            console.clear();
           
            console.log("================================================================================================\n")
            console.log(`\nResults found: ${movieList.length}\n`)
            movieList.forEach(movie => {
                console.log(`
            
                title: ${movie.title.green}
                id: ${(movie.id+"").blue}
                overview: ${movie.overview.gray}
        \n`);
                
            });
           
            console.log("================================================================================================\n");

            await  pause();
            

            break
        case 2:
            search.getHistory(); 
            await pause();   
            break;
    }


   }
   while( !endComand );
  console.log('termino el programa')
}


main()