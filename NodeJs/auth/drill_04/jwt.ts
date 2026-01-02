const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const jwt_key = "super_seceet_key";
