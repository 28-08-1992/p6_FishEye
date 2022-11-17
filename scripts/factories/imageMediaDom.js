//creation DOM article Image


export default function ImageMediaFactory(data) {
  let { title, image, likes, date } = data;
  

  const mediaLink = `assets/images/${image}`;
  
  

  function getDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    a.setAttribute("href", `#`);
    const img = document.createElement("img");
    img.setAttribute("src", mediaLink);
    img.setAttribute("alt", `${title}`);
    const divMediaInfo = document.createElement("div");
    divMediaInfo.setAttribute("class", "media-info");
    const h2 = document.createElement("h2");
    h2.textContent = title;
    const p = document.createElement("p");
    p.setAttribute("class", "likes");
    p.textContent = `${likes}`;
    const i = document.createElement("span");
    i.setAttribute("class", "far fa-heart");
    i.setAttribute("tabindex", "0");
    i.setAttribute("aria-label", "boutton likes");
    article.appendChild(a);
    a.appendChild(img);
    article.appendChild(divMediaInfo);
    divMediaInfo.appendChild(h2);
    divMediaInfo.appendChild(p);
    divMediaInfo.appendChild(i);

    return article;
  }
  function getMediaDOM(){
    const div = document.createElement("div");
    div.classList.add("media-content");
    const img = document.createElement("img");
    img.setAttribute("src", mediaLink);
    img.setAttribute("alt", `${title}`);
    div.appendChild(img);

    return div;
  }
  return { title, mediaLink, likes, date, getDOM, getMediaDOM };
}
