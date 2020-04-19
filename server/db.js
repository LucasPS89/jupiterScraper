const typeorm = require('typeorm');

class Creator{
    constructor(id, name, img, yURL){
        this.id = id;
        this.name = name;
        this.img = img;
        this.yURL = yURL;
    }
}

const EntitySchema = require('typeorm').EntitySchema;


const CreatorSchema = new EntitySchema({
    name: "Creator",
    target: Creator,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name:{
            type: "varchar"
        },
        img:{
            type: "text"
        },
        yURL:{
            type: "text"
        }
    }
})


async function getConnection(){
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        username: "root",
        password: "password",
        database: "setuptourist",
        synchronize: true,
        logging: false,
        entities:[
            CreatorSchema
        ]
    });
}


async function getAllCreators(){
    const connection = await getConnection();
    const creatorRepo = connection.getRepository(Creator);
    const creators  = await creatorRepo.find();
    connection.close();
    return creators;
}

async function insertCreator(name, img, yURL){
    const connection = await getConnection();
    const creator = new Creator();
    creator.name = name;
    creator.img = img;
    creator.yURL = yURL;

    const creatorRepo = connection.getRepository(Creator);

    //Verifica se a URL já existe
    
    //Grava no banco de dados
    const res = await creatorRepo.save(creator);

    const allCreators  = await creatorRepo.find();
    connection.close();
    return allCreators;
}

module.exports = {
    getAllCreators,
    insertCreator
}