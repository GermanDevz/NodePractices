const {menu, pause} = require('./utils/inquirer')




const main = async()=>{
    let opt


   do{

    opt = await menu();
    console.log(opt);
    await pause();


   }
   while( opt !== 0);
  console.log('termino el programa')
}


main()