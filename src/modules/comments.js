const baseURL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/";

const setComment = async (id, appID) => {
  const connect = await fetch(`${baseURL}${appID}/comments/`, {
    method: "POST",
    body: JSON.stringify({ item_id: id }),
    headers: { "Content-type": "application/JSON" },
  });
  const response = await connect.text();
  return response;
};
