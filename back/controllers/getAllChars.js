const {Character} = require ('../src/app.js/models/Character');

const getAllChars = async ()=>{
    try{
        const allCharacters = await Character.findAll();
        return allCharacters;
    }catch(error){
        return {error: error.message};
    }
}

module.exports = getAllChars;