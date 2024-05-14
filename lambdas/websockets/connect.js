const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

module.exports.handler = async (event) => {
    try {
        console.log(event, "eventttttttt");

        const connectionID = event.requestContext.connectionId;
        const { domainName, stage } = event.requestContext;

        console.log(connectionID, "connectionID");

        const data = {
            ID: connectionID,
            date: Date.now(),
            messages: [],
            domainName,
            stage,
        };

        await Dynamo.write(data, tableName);

        return Responses._200({ message: "connected" });
    } catch (error) {
        console.log(error, "error");
        return Responses._400({ message: "connect failed" });
    }
};
