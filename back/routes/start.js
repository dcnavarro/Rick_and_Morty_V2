const app = require ('./server');
const {sequelize} = require ('../src/app.js/DB_connection');
const {saveApiData} = require ('../controllers/saveApiData');

sequelize.sync({force:true}).then(()=>{
saveApiData();
console.log('DB connected');
app.listen(3001, ()=>{
    console.log('Server on port 3001');
});
});