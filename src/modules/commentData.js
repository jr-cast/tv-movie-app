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

export default commentData; const commentsData = async () => {
  const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zggEBXzpFcQqjDxvMhMz';
  const connect = await fetch(
    `${baseURL}/comments?item_id=commentBtn0`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
  const response = await connect.json();
  console.log(response.length);
  if (connect.status === 200) {
    commentTitle.innerHTML += `(${response.length})`;
    for (let i = 0; i < response.length; i += 1) {
      const entry = document.createElement('p');
      entry.innerHTML = `${response[i].creation_date}---> ${response[i].username}:  ${response[i].comment}`;
      commentsWrapper.appendChild(entry);
    }
  }
};