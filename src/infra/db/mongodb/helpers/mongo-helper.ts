import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  mongoClient: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.mongoClient = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.mongoClient.close()
  },

  getCollection (name: string): Collection {
    return this.mongoClient.db().collection(name)
  }
}
