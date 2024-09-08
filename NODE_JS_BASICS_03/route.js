const fs = require("fs");

const requestHandler = (req, res) => {
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head/>");
    res.write(
      "<body><h1><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url == "/message" && req.method == "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log(chunck);
      body.push(chunck);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = "302";
    res.setHeader("location", "/");
    return res.end();
  }

  //   if (req.url == "/message" && req.method == "POST") {
  //     res.setHeader("Content-Type", "text/html");
  //     res.write("<html>");
  //     res.write("<head><title>Display Message</title><head/>");
  //     res.write("<body><h1>Message Page</h1></body>");
  //     res.write("</html>");
  //     return res.end();
  //   }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head/>");
  res.write("<body><h1>Hello from node js server </h1></body>");
  res.write("</html>");
  res.end();
};

//module.exports = requestHandler;
module.exports = {
  handler: requestHandler,
  text: "500",
};
