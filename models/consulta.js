import { MongoClient, ServerApiVersion } from "mongodb";

const URI = 'mongodb://localhost:27017'

const client = new MongoClient(URI, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
})

async function connect() {
    try {
      await client.connect();
      const db = client.db('PresupuestoDB');
      return db.collection('ingreso');
    } catch (error) {
      console.error('Error de Conexión', error);
    }
  }

export class ConsultaModel {
    static async getConsulta(){
      const db = await connect()
      return  db.aggregate([
        {
          $addFields: {
            tipo: "ingreso"
          }
        },
        {
          $unionWith: {
            coll: "egreso",
            pipeline: [
              {
                $addFields: {
                  tipo: "egreso"
                }
              }
            ]
          }
        },
        {
          $sort: { fecha: 1 }
        }
      ]).toArray();
    }
}