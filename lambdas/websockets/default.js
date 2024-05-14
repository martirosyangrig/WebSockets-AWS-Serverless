const Responses = require("../common/API_Responses");

module.exports.handler = async (event) => {
    console.log(event, "event");

    return Responses._200({ message: "default" });
};
