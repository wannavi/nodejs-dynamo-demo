import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

export const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET,
  },
});

export const addItem = async (data) => {
  const params = {
    TableName: "test",
    Item: {
      PK: "user_1234",
      SK: "profile",
      name: "Gary",
      address: "1234 FakeStreet",
    },
  };

  await dynamoDB.put(params).promise();
};
