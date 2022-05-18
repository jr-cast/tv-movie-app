const baseURL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/";

const setComment = async (id, username, comment, appID) => {
  const connect = await fetch(`${baseURL}${appID}/comments/`, {
    method: "POST",
    body: JSON.stringify({
      item_id: id,
      username: username,
      comment: comment,
    }),
    headers: { "Content-type": "application/JSON" },
  });
  const response = await connect.text();
  return response;
};

// const getComment = async (appID, item_id) => {
//   const connect = await fetch(`${baseURL}${appID}/comments?item_id=${item_id}`);
//   const response = await connect.json();
//   return response;
// };

// const updateComments = (appID) => {
//   getComment(appID).then((response) => {
//     response.forEach((element) => {
//       const container = document.querySelector(`#${element.item_id}`);
//       container.children[1].children[1].children[1].innerHTML = `${element.likes} likes`;
//     });
//   });
// };

export default setComment;
