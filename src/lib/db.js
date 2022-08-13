import mongoose from "mongoose";

const db = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.puoglhs.mongodb.net/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.error(err);
  }
};

export default db;

//
