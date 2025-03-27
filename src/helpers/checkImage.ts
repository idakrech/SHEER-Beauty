const checkIfImageExists = (url: string, callback: (exists: boolean) => void) => {
    const img = new Image()
    img.src = url.replace("http://", "https://")
  
    if (img.complete) {
      callback(true)
    } else {
      img.onload = () => {
        callback(true);
      }
  
      img.onerror = () => {
        callback(false)
      }
    }
  }
  
  export default checkIfImageExists;

  // credits: https://github.com/Kallil-Belmonte/helpers/blob/main/functions/image/checkIfImageExists.ts