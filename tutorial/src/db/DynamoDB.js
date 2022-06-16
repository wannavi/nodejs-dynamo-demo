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

  async getItem(params) {
    const response = await this.dynamoDB.get(params).promise();
    return response.Item;
  }

  async queryItem(params) {
    const response = await this.dynamoDB.query(params).promise();
    return response.Items;
  }
}
