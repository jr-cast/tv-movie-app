const detailsBLU = (movieList) => {
  const movies = document.getElementsByClassName("movie-wrapper");
  console.log(movies);
  for (let i = 50; i < movies.length; i++) {
    movies[i].addEventListener("click", () => {
      const details = document.getElementById("details");
      const innerdetails = document.getElementById("inner-details");
      details.classList.remove("hidden");
      const innerWrapper = document.createElement("div");
      innerWrapper.classList.add("innerWrap");
      const innerWrapDetails = document.createElement("div");
      innerWrapDetails.classList.add("innerWrapDetails");
      const img = document.createElement("img");
      img.src = document.getElementById(`img_${i + 4}`).src;
      const duration = document.createElement("p");
      duration.innerHTML = `Duration: ${movieList[i - 50].runtime} minutes`;
      duration.classList.add("summary");
      const rating = document.createElement("p");
      rating.classList.add("summary");
      rating.innerHTML = `Rating: ${movieList[i - 50].rating.average}`;
      const summary = document.createElement("p");
      summary.classList.add("summary");
      summary.innerHTML = movieList[i - 50].summary;
      const website = document.createElement("a");
      website.classList.add("summary");
      website.innerHTML = "Visit the official website";
      website.href = movieList[i - 50].officialSite;
      const closeBtn = document.getElementById("closeBtn");
      const commentSection = document.createElement("div");
      commentSection.classList.add("commentSection");
      const commentsTitle = document.createElement("h3");
      commentsTitle.style.fontSize = "1.25em";
      commentsTitle.innerHTML = "Leave a comment!";
      const input_name = document.createElement("input");
      input_name.placeholder = "Your name here";
      const input_comment = document.createElement("input");
      input_comment.placeholder = "Your insights";
      const commentBtn = document.createElement("button");
      commentBtn.id = `commentBtn${i}`;
      commentBtn.innerHTML = "Comment";
      const commentsWrapper = document.createElement("div");
      commentsWrapper.classList.add("commentsWrapper");
      const commentTitle = document.createElement("h2");
      commentTitle.innerHTML = "Comments";
      const commentsData = async () => {
        const baseURL =
          "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DiufW768skxheMu2XO3y";
        const connect = await fetch(
          `${baseURL}/comments?item_id=commentBtn${i}`,
          {
            method: "GET",
          }
        );
        const response = await connect.json();
        commentTitle.innerHTML += `(${response.length})`;
        for (let i = 0; i < response.length; i++) {
          const entry = document.createElement("p");
          entry.innerHTML = `${response[i].creation_date}---> ${response[i].username}:  ${response[i].comment}`;
          commentsWrapper.appendChild(entry);
        }
      };
      commentsData();
      innerWrapper.appendChild(img);
      innerWrapDetails.appendChild(summary);
      innerWrapDetails.appendChild(duration);
      innerWrapDetails.appendChild(rating);
      innerWrapDetails.appendChild(website);
      innerWrapper.appendChild(innerWrapDetails);
      innerdetails.appendChild(innerWrapper);
      // innerdetails.appendChild(commentSection);
      innerWrapDetails.appendChild(commentsWrapper);
      commentsWrapper.appendChild(commentSection);
      commentSection.appendChild(commentsTitle);
      commentsWrapper.appendChild(commentTitle);
      commentSection.appendChild(input_name);
      commentSection.appendChild(input_comment);
      commentSection.appendChild(commentBtn);
      closeBtn.addEventListener("click", () => {
        details.classList.add("hidden");
        innerWrapper.remove();
        commentSection.remove();
      });

      commentBtn.addEventListener("click", async () => {
        if (!input_name.value || !input_comment.value) {
          alert("Not empty values allowed, please add your name and comment!");
        } else {
          const baseURL =
            "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DiufW768skxheMu2XO3y";
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
          window.location.reload();
        }
      });
    });
  }
};

export default detailsBLU;
