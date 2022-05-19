const detailsDVD = (movieList) => {
  const movies = document.getElementsByClassName('movie-wrapper');
  for (let i = 0; i < movies.length; i += 1) {
    movies[i].addEventListener('click', () => {
      const details = document.getElementById('details');
      const innerdetails = document.getElementById('inner-details');
      details.classList.remove('hidden');
      const innerWrapper = document.createElement('div');
      innerWrapper.classList.add('innerWrap');
      const innerWrapDetails = document.createElement('div');
      innerWrapDetails.classList.add('innerWrapDetails');
      const img = document.createElement('img');
      img.src = document.getElementById(`img_${i + 1}`).src;
      const duration = document.createElement('p');
      duration.innerHTML = `Duration: ${movieList[i].runtime} minutes`;
      duration.classList.add('summary');
      const rating = document.createElement('p');
      rating.classList.add('summary');
      rating.innerHTML = `Rating: ${movieList[i].rating.average}`;
      const summary = document.createElement('p');
      summary.classList.add('summary');
      summary.innerHTML = movieList[i].summary;
      const website = document.createElement('a');
      website.classList.add('summary');
      website.innerHTML = 'Visit the official website';
      website.href = movieList[i].officialSite;
      const closeBtn = document.getElementById('closeBtn');
      const commentSection = document.createElement('div');
      commentSection.classList.add('commentSection');
      const commentsTitle = document.createElement('h3');
      commentsTitle.style.fontSize = '1.25em';
      commentsTitle.innerHTML = 'Leave a comment!';
      const inputName = document.createElement('input');
      inputName.placeholder = 'Your name here';
      const inputComment = document.createElement('input');
      inputComment.placeholder = 'Your insights';
      const commentBtn = document.createElement('button');
      commentBtn.id = `commentBtn${i}`;
      commentBtn.innerHTML = 'Comment';
      const commentsWrapper = document.createElement('div');
      commentsWrapper.classList.add('commentsWrapper');
      const commentTitle = document.createElement('h2');
      commentTitle.innerHTML = 'Comments';
      const commentsData = async () => {
        const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zggEBXzpFcQqjDxvMhMz';
        const connect = await fetch(
          `${baseURL}/comments?item_id=commentBtn${i}`,
          {
            method: 'GET',
          },
        );
        const response = await connect.json();
        if (connect.status === 200) {
          commentTitle.innerHTML += `(${response.length})`;
          for (let i = 0; i < response.length; i += 1) {
            const entry = document.createElement('p');
            entry.innerHTML = `${response[i].creation_date}---> ${response[i].username}:  ${response[i].comment}`;
            commentsWrapper.appendChild(entry);
          }
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
      innerWrapDetails.appendChild(commentsWrapper);
      commentsWrapper.appendChild(commentSection);
      commentSection.appendChild(commentsTitle);
      commentsWrapper.appendChild(commentTitle);
      commentSection.appendChild(inputName);
      commentSection.appendChild(inputComment);
      commentSection.appendChild(commentBtn);
      closeBtn.addEventListener('click', () => {
        details.classList.add('hidden');
        innerWrapper.remove();
        commentSection.remove();
      });
      commentBtn.addEventListener('click', async () => {
        if (!inputName.value || !inputComment.value) {
          alert('Not empty values allowed, please add your name and comment!');
        } else {
          const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zggEBXzpFcQqjDxvMhMz';
          const connect = await fetch(`${baseURL}/comments/`, {
            method: 'POST',
            body: JSON.stringify({
              item_id: commentBtn.id,
              username: inputName.value,
              comment: inputComment.value,
            }),
            headers: { 'Content-type': 'application/JSON' },
          });
          await connect.text();
          window.location.reload();
        }
      });
    });
  }
};

export default detailsDVD;
