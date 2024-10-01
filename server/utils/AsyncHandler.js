import fs from "fs";

const appendInfo = async (uri = "/favicon", error = "Success") => {
  let date = new Date();
  fs.appendFile(
    "./log.txt",
    `Date : ${date}\t Requested URI : ${uri}\n${error}\n<=================================================================================>\n`,
    (err) => {
      if (err) {
        console.error("Error appending to file:", err);
      }
    }
  );
};

const AsyncHandler = (fn) => async (req, res, next) => {
  try {
    // await appendInfo(req?.originalUrl);
    await fn(req, res, next);
  } catch (error) {
    // await appendInfo(req?.originalUrl, error);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default AsyncHandler;
