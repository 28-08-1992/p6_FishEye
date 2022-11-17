import ImageMediaFactory from "./imageMediaDom.js";
import videoMediaFactory from "./videoMediaDom.js";

export default function MediaFactory(data) {
  // Vérifie si l'élément sélectionné est une image ou une vidéo

  let media = {};

  if (data.image) {
    media = ImageMediaFactory(data);
  }
  if (data.video) {
    media = videoMediaFactory(data);
  }
  return media;
}
