import dotenv from "dotenv";
import DynamoDB from "./db/dynamoDB";

dotenv.config();

const credentials = {
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET,
};

const data = {
  TableName: "test",
  Item: {
    PK: "user#1234",
    SK: "profile",
    name: "Gary",
    address: "1234 FakeStreet",
  },
};

(async function () {
  const dynamoDB = new DynamoDB("ap-northeast-2", credentials);

  // PUT
  await dynamoDB.putItem(data);

  // GET
  const item = await dynamoDB.getItem({
    TableName: "test",
    Key: {
      PK: "user#1234",
      SK: "profile",
    },
  });
  console.log(item);
})();
