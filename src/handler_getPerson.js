"use strict";
const swapi = require("swapi-node");
const AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient();

async function getDataFromSwapi(personId) {
  try {
    var data = await swapi.getPerson(personId);
    var params = {
      TableName: "Personas",
      Item: {
        id: personId,
        nombre: data.name,
        altura: data.height,
        masa: data.mass,
        color_pelo: data.hair_color,
        color_piel: data.skin_color,
        color_ojo: data.eye_color,
        anio_nacimiento: data.birth_year,
        genero: data.gender,
        mundo_natal: data.homeworld,
        peliculas: data.films,
        especies: data.species,
        vehiculos: data.vehicles,
        naves_estelares: data.starships,
        creado: data.created,
        editado: data.edited,
        url: data.url,
      },
    };
    return params;
  } catch (error) {
    return null;
  }
}

async function getPersonFromSwapi(personId) {
  try {
    var params = await getDataFromSwapi(personId);

    if (params != null) {
      var result = await documentClient.put(params).promise();

      if (result) return params.Item;
      else return null;
    } else return null;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
}

async function getDataFromDynamo(userId) {
  var params = {
    TableName: "Personas",
    Key: {
      id: userId,
    },
  };

  var data = await documentClient.get(params).promise();

  return data;
}

module.exports.getPerson = async (event) => {
  var id = parseInt(event.pathParameters.id);

  person = await getDataFromDynamo(id);

  if (Object.entries(person).length === 0) {
    var person = await getPersonFromSwapi(id);

    if (person != null) {
      return {
        statusCode: 200,
        body: JSON.stringify(person, null, 2),
      };
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ detalle: "Persona no encontrada." }, null, 2),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(person.Item, null, 2),
  };
};
