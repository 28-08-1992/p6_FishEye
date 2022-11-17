export default function LightboxFactory(mediaArray) {
  
    const mediaList = mediaArray;
  
    let currentIndex = 0;
  
    function next() {
      currentIndex = (currentIndex + 1) % (mediaList.length - 2);
    }
  
    function prev() {
      currentIndex -= 1;
      if (currentIndex == -1) currentIndex = mediaList.length - 1;
    }
  
    function setIndex(index) {
      currentIndex = index;
    }
  
    function getDOM() {
      const dialog = document.createElement("dialog");
      dialog.setAttribute("aria-label", "image close up view");
      const div = document.createElement("div");
      div.classList.add("dialog-content");
  
      const mediaDOM = getMediaContentDOM();
      
      const closeBtn = document.createElement("a");
      closeBtn.setAttribute("role", "button");
      closeBtn.setAttribute("aria-label", "Close dialog");
      closeBtn.setAttribute("href", "");
      closeBtn.classList.add("fas", "fa-times");
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
      });
  
      const prevBtn = document.createElement("a");
      prevBtn.classList.add("fas", "fa-angle-left");
      prevBtn.setAttribute("href", "");
      prevBtn.setAttribute("role", "link");
      prevBtn.setAttribute("aria-label", "Previous image");
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
      });
      
      const nextBtn = document.createElement("a");
      nextBtn.classList.add("fas", "fa-angle-right");
      nextBtn.setAttribute("href", "");
      nextBtn.setAttribute("role", "link");
      nextBtn.setAttribute("aria-label", "Next image");
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
      
      });
  
      div.appendChild(mediaDOM);
      div.appendChild(closeBtn);
      div.appendChild(nextBtn);
      div.appendChild(prevBtn);
      dialog.appendChild(div);
  
      return dialog;
    }

  
     function getMediaContentDOM() {
      
      const mediaDOM = mediaList[currentIndex].getMediaDOM();
      
      const h2 = document.createElement("h2");
      h2.textContent = mediaList[currentIndex].title;
      mediaDOM.appendChild(h2);
      return mediaDOM;
    }
    
  
    return { next, prev, getDOM, getMediaContentDOM, setIndex };
  }