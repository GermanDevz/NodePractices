const {menu, pause, leerInput, listData} = require('./utils/inquirer')
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

            try {
                let movieName = await leerInput('Movie');
            
            const movieList = await search.getMovieList(movieName)
            console.clear();
           
            console.log("================================================================================================\n")
            console.log(`\nResults found: ${movieList.length}\n`)
           const movieId =  await listData(movieList);

           //
            console.log("================================================================================================\n");
            await  pause();
            if(movieList.length !== 0){
                console.clear();
                const info = await search.getMovieWithId(movieId);
                 if(info){
                     console.clear();
                     console.log(`Title: ${info.title.bold}
                     Date: ${info.date.blue}
                     Popularity: ${(info.popularity+"").yellow} 
                     Budge: ${("$"+info.budget).green}
                     Sipnosis: 
                     ${info.description.bold}`.bgGray)
                     
                 }
                 else{
                     console.log('Error: Movie without details\n');
                 }
                 await pause();

            }
                
            } catch (error) {
                
                await pause();
                console.log('critical error \n');
                
            }

            
           
            

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