// // const characters = require('./utils/data');
// const getCharById = require('./controllers/getCharById');
// const getCharDetail = require('./controllers/getCharDetail');

// const http = require('http');

// http.createServer((req, res)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // if(req.url.includes('rickandmorty/character')){
//     //     let id = req.url.split('/').at(-1);

//     //     let characterFilter = characters.find( char => char.id === Number(id));

//     //     res
//     //     .writeHead(200,{"Content-type":"application/json"})
//     //     .end(JSON.stringify(characterFilter));
//     // }
//    let id = req.url.split('/').at(-1);
   
//     if(req.url.includes('onsearch')){
//         getCharById(res, id )
//     }

//     if(req.url.includes('detail')){
//         getCharDetail(res,id)
//     }

// }).listen(3001, 'localhost')

const express = require ('express');
const app = express ();
const axios = require ('axios');
const cors = require ('cors');
const getAllChars = require ('../controllers/getAllChars');
const postFav = require ('../controllers/postFav');
const getAllFavorites = require ('../controllers/getAllFavorites');
const deleteFavoriteById = require ('../controllers/deleteFavoriteById');


app.use(cors());
app.use(express.json());

app.get('rickandmorty/allCharacters', async (req, res) =>{
    try{
        const allCharacters = await getAllChars();
        res.status(200).json(allCharacters)
    }catch(error){
        res.status(404).send('404 Not Found')
    }
})

app.get('/rickandmorty/character/:id', async (req,res) =>{
        try{
        const {id} = req.params;

        const response = await axios(`https://rickandmortyapi.com/api/character/${id}`);
        const data = response.data;
        
        const infoCharacter = {
            id: data.id,
            name: data.name,
            species: data.species,
            gender: data.gender,
            image: data.image
        }

        res.status(200).json(infoCharacter); 

    }catch(error){

        res.status(404).send(error.message);

    }
})

app.get('/rickandmorty/detail/:detailId', async (req, res) =>{
    const {detailId} = req.params;
    try{
        const response = (await axios(`https://rickandmortyapi.com/api/character/${detailId}`)).data;

        const infoCharacterDetail = {
            name: response.name,
            status: response.status,
            species: response.species,
            gender: response.gender,
            origin: response.origin.name,
            image: response.image,
        }

        res.status(200).json(infoCharacterDetail);

    }catch(error){
        res.status(404).send(error.message);
    }
})


app.get('/rickandmorty/fav', async (req, res) =>{
    try{
        const allFavorites = await getAllFavorites();
        if (allFavorites.error) throw new Error (allFavorites.error)
        return res.status(200).json(allFavorites);
    }catch(error){
        res.status(404).send(error.message);
    }
})

app.post('/rickandmorty/fav', async (req, res)=>{
    try{
        const characterFav = await postFav(req.body);
        res.status(200).json(characterFav);
        if(characterFav.error) throw new Error(characterFav.error);
    }catch(error){
         return res.status(404).send(error.message);
    }
})

app.delete('/rickandmorty/fav/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const deleteFavorite = await deleteFavoriteById(parseInt(id));

        if (deleteFavorite.error) throw new Error (deleteFavorite.error)
        return res.status(200).send(deleteFavorite);
    }catch{
        return res.status(404).send(error.message);
    };
});

module.exports = app;