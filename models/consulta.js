import { MongoClient, ServerApiVersion } from "mongodb";

const URI = 'mongodb+srv://root:<db_password>@cluster0.1ymo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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