const express = require("express");
const Joi = require("joi");
const { join } = require("path");
const app = express();
app.use(express.json());
const products = [{
  id:1,
  name : "Nike",
  total_quantity:12,
  type_of_product:"Shoe",
  price : 300
  },
  {
    id:2,
    name : "Adidas",
    total_quantity:10,
    type_of_product:"Shoe",
    price : 600
  },
  {
    id:3,
    name : "Reebok",
    total_quantity:6,
    type_of_product:"shirt",
    price : 250
    },
    {
      id:4,
      name : "Apple",
      total_quantity:20,
      type_of_product:"Mobile",
      price : 3000
      },
      {
        id:5,
        name : "Jbl",
        total_quantity:13,
        type_of_product:"Speaker",
        price : 900
        },
]

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/products", function (req, res) {
  res.send(products);
});
app.get("/products/:id", function (req, res) {
  var productId = req.params.id;
  var product = products.find((c) => c.id === parseInt(productId));
  if (!product) {
    res.status(404).send("Product not found");
  } else res.send(product);
});
app.get("/products/:name", function (req, res) {
  var productName = req.params.name;
  var productN = products.find((c) => c.name === productName);
  if (!productN) {
    res.status(404).send("Product not found" + productName);
  } else res.send(productN);
});

app.post("/addproduct", function (req, res) {
  const validateResult = validateProduct(req.body);
  console.log(validateResult);
  if (validateResult.error) res.send(validateResult.error);
  else {
    var product = {
      id: products.length + 1,
      name: req.body.name,
      total_quantity: req.body.total_quantity,
      type_of_product: req.body.type_of_product,
      price: req.body.price,
    };
    products.push(product);
    res.send(product);
  }
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    total_quantity: Joi.number().required(),
    type_of_product: Joi.string().required(),
    price: Joi.number().required(),
  });
  try {
    const result = schema.validate(product);
    return result;
  } catch (err) {
    return err;
  }
}
app.listen(3000);
console.log("listening the server on port 3000");

