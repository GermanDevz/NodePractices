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
            console.log(`fin del programa \n`);
        case 1:
            let city = await leerInput();
            await search.getCity(city)
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