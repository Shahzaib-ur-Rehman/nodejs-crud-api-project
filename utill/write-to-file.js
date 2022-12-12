const path= require('path');
const fs = require('fs')
module.exports = (data) =>{
    try {
        fs.writeFileSync(path.join(__dirname,'..',"data","movies.json"),JSON.stringify(data),'utf8');
    } catch (error) {
        console.log(error)
    }
}