const details = (movieList) => {
  const movies = document.getElementsByClassName("movie-wrapper");
  for (let i = 0; i < movies.length; i++) {
    movies[i].addEventListener("click", () => {
      const details = document.getElementById("details");
      const innerdetails = document.getElementById("inner-details");
      details.classList.remove("hidden");
      const innerWrapper = document.createElement("div");
      innerWrapper.classList.add("innerWrap");
      const innerWrapDetails = document.createElement("div");
      innerWrapDetails.classList.add("innerWrapDetails");
      const img = document.createElement("img");
      img.src = document.getElementById(`img_${i + 1}`).src;
      const duration = document.createElement("p");
      duration.innerHTML = `Duration: ${movieList[i].runtime} minutes`;
      duration.classList.add("summary");
      const rating = document.createElement("p");
      rating.classList.add("summary");
      rating.innerHTML = `Rating: ${movieList[i].rating.average}`;
      const summary = document.createElement("p");
      summary.classList.add("summary");
      summary.innerHTML = movieList[i].summary;
      const website = document.createElement("a");
      website.classList.add("summary");
      website.innerHTML = "Visit the official website";
      website.href = movieList[i].officialSite;
      const closeBtn = document.getElementById("closeBtn");
      const commentSection = document.createElement("div");
      commentSection.classList.add("commentSection");
      const commentsTitle = document.createElement("h2");
      commentsTitle.style.fontSize = "2em";
      commentsTitle.innerHTML = "Leave a comment!";
      const input_name = document.createElement("input");
      input_name.placeholder = "Your name here";
      const input_comment = document.createElement("input");
      input_comment.placeholder = "Your insights";
      input_comment.style.height = "100px";
      input_comment.style.width = "500px;";
      const commentBtn = document.createElement("button");
      commentBtn.id = `commentBtn${i}`;
      commentBtn.innerHTML = "Comment";
      innerWrapper.appendChild(img);
      innerWrapDetails.appendChild(summary);
      innerWrapDetails.appendChild(duration);
      innerWrapDetails.appendChild(rating);
      innerWrapDetails.appendChild(website);
      innerWrapper.appendChild(innerWrapDetails);
      innerdetails.appendChild(innerWrapper);
      innerdetails.appendChild(commentSection);
      commentSection.appendChild(commentsTitle);
      commentSection.appendChild(input_name);
      commentSection.appendChild(input_comment);
      commentSection.appendChild(commentBtn);
      closeBtn.addEventListener("click", () => {
        details.classList.add("hidden");
        innerWrapper.remove();
        commentSection.remove();
      });
      commentBtn.addEventListener("click", async () => {
        const baseURL =
          "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zggEBXzpFcQqjDxvMhMz";
        const connect = await fetch(`${baseURL}/comments/`, {
          method: "POST",
          body: JSON.stringify({
            item_id: commentBtn.id,
            username: input_name.value,
            comment: input_comment.value,
          }),
          headers: { "Content-type": "application/JSON" },
        });
        const response = await connect.text();
      });
    });
  }
};

export default details;
