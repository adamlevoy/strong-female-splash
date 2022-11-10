const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const klaviyoPk = process.env.KLAVIYO_PK;

  // add profile to list config
  const listId = process.env.LIST_ID;
  const addProfileToListUrl = `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`;
  const addProfileToListOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      revision: "2022-10-17",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${klaviyoPk}`,
    },
    body: JSON.stringify({
      data: [
        { type: "profile", id: `${event.queryStringParameters.profileId}` },
      ],
    }),
  };

  try {
    // then add profile to list
    const response = await fetch(addProfileToListUrl, addProfileToListOptions);
    return {
      statusCode: 202,
      body: `Success, profile ${event.queryStringParameters.profileId} added to list ${listId}`,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: error,
    };
  }
};
