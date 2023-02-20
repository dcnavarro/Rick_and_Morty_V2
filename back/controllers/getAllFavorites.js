const {Favorite} = require ('../src/app.js/DB_connection');

const getAllFavorites = async () =>{
    try{
        const allFavorites = await Favorite.findAll();
        if(!allFavorites) throw new Error('No hay favoritos')
        return allFavorites;
    }catch(error){
        return {error: error.message}
    };
};

module.exports = getAllFavorites;