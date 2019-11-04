import imageSource from './src/img/kick_cut.png';
import videoSource from './src/video/kickboxer_cut_out.webm';

onmessage = async (evt) => {
    try {
      const canvas = evt.data;
      const ctx = canvas.getContext('2d');
      if(!ctx) {
        postMessage('unsupported browser');
        return;
      }
      const imgblob = await fetch(imageSource)
        .then(r => r.blob());
      const img = await createImageBitmap(imgblob);
      ctx.drawImage(img, 0,0, canvas.width, canvas.height);
   }
   catch(e) {
    postMessage('unsupported browser');
    throw e;
    }
  };