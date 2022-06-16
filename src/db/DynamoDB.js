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
    try {
      await this.dynamoDB.put(data).promise();
    } catch (error) {
      console.error(error);
    }
  }
}
