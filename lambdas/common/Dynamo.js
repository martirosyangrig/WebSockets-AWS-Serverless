const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(
                `There was an error fetching the data for ID od ${ID} from ${TableName}`
            );
        }

        console.log(data);

        return data.Item;
    },
    async write(data, TableName) {
        if (!data.ID) {
            throw Error("No ID in data");
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(
                `There was an error inserting for ID of ${data.ID} in table ${TableName}`
            );
        }

        return data;
    },

    async delete(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const res = await documentClient.delete(params).promise();

        if (!res) {
            throw Error(
                `There was an error deleting for ID of ${ID} in table ${TableName}`
            );
        }

        return res;
    },
};

module.exports = Dynamo;
