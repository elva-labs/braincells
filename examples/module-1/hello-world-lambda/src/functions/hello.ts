export const handler = async () => {
  console.log('I running on the server');

  return {
    statusCode: 200,
    body: JSON.stringify({ hello: 'world' }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
