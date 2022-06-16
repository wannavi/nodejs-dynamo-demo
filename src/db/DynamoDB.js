import AWS, { Credentials } from "aws-sdk";

export default class DynamoDB {
  /**
   * @param {string} region
   * @param {Credentials} credentials
   */
  constructor(region, credentials) {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient({
      region,
      credentials,
    });
  }

  /**
   * @param {*} data
   */
  async putItem(data) {
    await this.dynamoDB.put(data).promise();
  }

  async getItem(data) {
    const response = await this.dynamoDB.get(data).promise();
    return response.Item;
  }
}
