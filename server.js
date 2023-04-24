///implement post topologysort req,and using get send it to url localhost:5000,and using neo4jd3 show it on web

const express = require("express");
const cors = require("cors");
const jsonData = require("./data/jsonData");

var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/add-json", (req, res) => {
  const tempJsonData = jsonData;

  console.log("REQUEST BODY >>> ");
  console.log(req.body);

  const { taskArr, relationshipArr } = req.body;

  if (!taskArr) return res.status(400).send({ status: "failed", message: "Tasks required!" });
  if (!relationshipArr) return res.status(400).send({ status: "failed", message: "Relationships required!" });

  tempJsonData.results[0].data[0].graph.nodes = taskArr;
  tempJsonData.results[0].data[0].graph.relationships = relationshipArr;

  localStorage.setItem("myFirstKey", JSON.stringify(tempJsonData));

  res.json({ status: "success", message: "Json added" });
});

app.get("/get-json", (req, res) => {
  const data = JSON.parse(localStorage.getItem("myFirstKey"));
  res.json(data);
});

//topology sort req-post and fetch it through get method

app.post("/add-json-topology", (req, res) => {
  const tempJsonData = jsonData;

  console.log("REQUEST BODY >>> ");
  console.log(req.body);
  //taskArrTopo consist of name and hours,
  // relationshipArrTopo user given relation,
  // resultTopo
  // resultRelationTopo consist of sigle edged relation,
  const { taskArrTopo, relationshipArrTopo, resultTopo, resultRelationTopo, taskTitle } = req.body;

  if (!taskArrTopo) return res.status(400).send({ status: "failed", message: "Tasks required!" });
  if (!relationshipArrTopo) return res.status(400).send({ status: "failed", message: "Relationships required!" });

  tempJsonData.results[0].data[0].graph.nodes = resultTopo;
  tempJsonData.results[0].data[0].graph.relationships = resultRelationTopo;

  localStorage.setItem("myTopology", JSON.stringify(tempJsonData));

  res.json({ status: "success", message: "Topo-Json added" });
});

app.get("/get-json-topology", (req, res) => {
  const data = JSON.parse(localStorage.getItem("myTopology"));
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000 || http://localhost:5000"));
