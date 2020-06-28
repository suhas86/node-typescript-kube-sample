import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";



let mongo: any;

// Start mongo server before start running test
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
// Before each test reset collections
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
// Close connection after completing the testing process
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

