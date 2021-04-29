"use strict";
const AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.addPerson = async (event) => {
  try {
    var bodycustom = JSON.parse(event.body);
    var params = {
      TableName: "Personas",
      Item: bodycustom,
    };

    var result = await documentClient.put(params).promise();

    if (result) {
      return {
        statusCode: 200,
        body: JSON.stringify({ detalle: "OK" }, null, 2),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify(
          { detalle: "No se pudo registrar la persona" },
          null,
          2
        ),
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
