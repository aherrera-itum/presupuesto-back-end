import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

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
      return db.collection('presupuesto');
    } catch (error) {
      console.error('Error de Conexión', error);
    }
  }

export class PresupuestoModel {
    static async getAll(){
        const db = await connect()
        return db.find({}).toArray()
    }

    static async getById({ id }){
        const db = await connect()    
        return db.findOne( { _id: ObjectId.createFromHexString(id)}  )
    }

    static async create( { input }){
        const db = await connect()
        const { insertedId } = await db.insertOne(input)
        return {
            ...input
        }
    }
    static async update( { id, input} ){
        const db = await connect()
        const updateEntity = await db.findOneAndUpdate(
            { _id: ObjectId.createFromHexString(id)},
            { $set: input},
            { returnDocument: 'after'}
        )
        if (!updateEntity) return false
        return updateEntity
    }

    static async delete({ id }) {
        const db = await connect();
        const {deletedCount} = await db.deleteOne({ '_id': ObjectId.createFromHexString(id) });
        return deletedCount;
    }
}
