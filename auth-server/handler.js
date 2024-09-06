exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v4.0! Your function executed successfully!',
    }),
  };
};

exports.getAuthURL = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      authURL: 'https://app.serverless.com/shadesi/apps',
    }),
  };
};
