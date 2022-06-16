import dotenv from "dotenv";
import DynamoDB from "./db/dynamoDB";

dotenv.config();

const credentials = {
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRET,
};

const dynamoDB = new DynamoDB("ap-northeast-2", credentials);

async function lecture2_is_one_to_one() {
  const batchDataset = [
    {
      TableName: "test",
      Item: {
        PK: "user#1234",
        SK: "profile",
        name: "Gary",
        address: "1234 FakeStreet",
      },
    },
    {
      TableName: "test",
      Item: {
        PK: "user#1235",
        SK: "profile",
        name: "Chan",
        address: "1235 FakeStreet",
      },
    },
    {
      TableName: "test",
      Item: {
        PK: "user#1235",
        SK: "task#1",
        description: "Plan meeting",
      },
    },
    {
      TableName: "test",
      Item: {
        PK: "user#1235",
        SK: "task#3",
        description: "Play LOL",
      },
    },
  ];

  // PUT
  await Promise.all(batchDataset.map((data) => dynamoDB.putItem(data)));

  // GET
  const item = await dynamoDB.getItem({
    TableName: "test",
    Key: {
      PK: "user#1234",
      SK: "profile",
    },
  });
  console.log(item);
}

async function lecture3_is_one_to_many() {
  const params = {
    TableName: "test",
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": "user#1235",
      ":sk": "task",
    },
  };

  const items = await dynamoDB.queryItem(params);
  console.log(items);
}

async function lecture4_is_many_to_many() {
  const teamMembers = [
    // Member
    {
      TableName: "test",
      Item: {
        PK: "team#1234",
        SK: "teamMember#1234",
        UserID: "user#1234",
        Role: "supervisor",
      },
    },
    {
      TableName: "test",
      Item: {
        PK: "team#1235",
        SK: "teamMember#1235",
        UserID: "user#1234",
        Role: "supervisor",
      },
    },
    {
      TableName: "test",
      Item: {
        PK: "team#1235",
        SK: "teamMember#1235",
        UserID: "user#1235",
        Role: "supervisor",
      },
    },
    // Team
    {
      TableName: "test",
      Item: {
        PK: "team#1234",
        SK: "meta",
        name: "TEam Blue",
      },
    },
    {
      TableName: "test",
      Item: {
        PK: "team#1235",
        SK: "meta",
        name: "Team Green",
      },
    },
  ];

  await Promise.all(teamMembers.map((data) => dynamoDB.putItem(data)));

  const params = {
    TableName: "test",
    IndexName: "UserID-SK-index",
    KeyConditionExpression: "UserID = :gsi AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":gsi": "user#1234",
      ":sk": "teamMember",
    },
  };
  const items = await dynamoDB.queryItem(params);
  console.log(items);
}

(async () => {
  await lecture4_is_many_to_many();
})();
