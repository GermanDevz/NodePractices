 class Search{
    
    
    constructor(){
        this.history = [];

    }

     async  getCity( city = ''){
        console.log(`searching...${city}`);
        this.history.push(city);
        return []

    }
    
    async getHistory(){
        console.log(`historial: \n`)
        this.history.forEach((element, index) => {
        console.log(`${index+1} ${element}`);
        });   
       
    }
    


}



module.exports = Search;