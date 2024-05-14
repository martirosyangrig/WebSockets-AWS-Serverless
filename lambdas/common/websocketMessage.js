const AWS = require("aws-sdk");

const create = (domainName, stage) => {
    const endpoint = `${domainName}/${stage}`;
    return new AWS.ApiGatewayManagementApi({
        apiVersion: "2018-11-29",
        endpoint,
    });
};

const send = async ({ domainName, stage, connectionID, message }) => {
    const ws = create(domainName, stage);

    const postparams = {
        ConnectionId: connectionID,
        Data: message,
    };

    await ws.postToConnection(postparams).promise();
};

module.exports = { send };
