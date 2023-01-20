const maPromesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("toto");
  }, 300);
});

export const call = async () => {
  try {
    const response = await maPromesse;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
