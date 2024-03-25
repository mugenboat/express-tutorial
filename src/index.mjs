import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "boat", displayName: "B" },
  { id: 2, username: "boo", displayName: "Bo" },
  { id: 3, username: "bua", displayName: "Ba" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (!filter && !value) return res.send(mockUsers);

  if (filter && value)
    return res.send(mockUsers.filter(user => user[filter].includes(value)));
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params.id);
  const parseId = parseInt(req.params.id);
  console.log(parseId);
  if (isNaN(parseId)) return res.status(400).send({ msg: "Bad Request" });
  const findUser = mockUsers.find(user => user.id === parseId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

//post
app.post("/api/users", (req, res) => {
  const body = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

//put
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex(user => user.id === parseId);

  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers[findUserIndex] = { id: parseId, ...body };
  return res.sendStatus(200);
});

//patch
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex(user => user.id === parseId);

  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

//delete
app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex(user => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex);
  return res.sendStatus(200);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 1, name: "box", price: 200 }]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
