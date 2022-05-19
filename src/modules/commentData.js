const commentData = async () => {
  const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zggEBXzpFcQqjDxvMhMz';
  const connect = await fetch(
    `${baseURL}/comments?item_id=commentBtn0`,
    {
      method: 'GET',
    },
  );
  const response = await connect.json();
  return response.length;
};

export default commentData; 