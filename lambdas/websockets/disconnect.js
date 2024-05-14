const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

module.exports.handler = async (event) => {
    console.log(event, "event");

    const connectionID = event.requestContext.connectionId;

    await Dynamo.delete(connectionID, tableName);

    return Responses._200({ message: "disconnected" });
};
