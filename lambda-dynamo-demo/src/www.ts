import app from "./app";

const port = process.env.PORT || 3000;

app
  .listen(port, () => {
    console.log(`✅ ${port}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
