// creation de articleVideoDOM
export default function videoMediaFactory(data) {
    let { title, video, likes, date } = data;
  

    const mediaLink = `assets/images/${video}`;
     
    function getDOM() {
      const a = document.createElement("a");
      a.setAttribute("href", `#`);
      const article = document.createElement("article");
      const videoMedia = document.createElement("video");
      //videoMedia.setAttribute("controls", "");
      //videoMedia.setAttribute("autoplay", "true");
      const source = document.createElement("source");
      source.setAttribute("src", mediaLink);
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
      i.setAttribute("aria-label", "likes");
      article.appendChild(a);
      a.appendChild(videoMedia);
      videoMedia.appendChild(source);
      article.appendChild(divMediaInfo);
      divMediaInfo.appendChild(h2);
      divMediaInfo.appendChild(p);
      divMediaInfo.appendChild(i);
  
      return article;
    }
    function getMediaDOM(){
      const div = document.createElement("div");
      div.classList.add("media-content");
      const video = document.createElement("video");
     // video.setAttribute("src", mediaLink);
      video.setAttribute("controls", true);
      const source = document.createElement("source");
      source.setAttribute('src', mediaLink);
      video.appendChild(source);
      div.appendChild(video);
    
    
      return div;
    }
    return {title, mediaLink, likes, date, getDOM, getMediaDOM};
}