const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const klaviyoPk = import.meta.env.KLAVIYO_PK;

  // create profile config
  const createProfileUrl = "https://a.klaviyo.com/api/profiles/";
  const createProfileOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      revision: "2022-10-17",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${klaviyoPk}`,
    },
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email: `${event.queryStringParameters.emailAddress}`,
        },
      },
    }),
  };

  try {
    const response = await fetch(createProfileUrl, createProfileOptions);
    const data = await response.json();
    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: error,
    };
  }
};
