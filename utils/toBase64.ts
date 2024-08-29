export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') { // Ensure result is a string
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file as Data URL'));
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};












// // Convert a file to base64 string
// export const toBase64 = (file: File) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();

//     fileReader.readAsDataURL(file);

//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };

//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };