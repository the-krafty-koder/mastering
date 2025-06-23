# Directory structure

my-express-app/
├── src/
│ ├── app.js # Main app setup
│ ├── server.js # Server entry point
│ ├── controllers/
│ │ └── userController.js
│ │ └── **tests**/ # Unit tests for controllers
│ │ └── userController.test.js
│ ├── routes/
│ │ └── userRoutes.js
│ │ └── **tests**/ # Unit tests for routes
│ │ └── userRoutes.test.js
│ ├── models/
│ │ └── userModel.js
│ │ └── **tests**/ # Unit tests for models
│ │ └── userModel.test.js
│ ├── middlewares/
│ │ └── authMiddleware.js
│ │ └── **tests**/ # Unit tests for middleware
│ │ └── authMiddleware.test.js
│ ├── utils/
│ │ └── logger.js
│ │ └── **tests**/ # Unit tests for utilities
│ │ └── logger.test.js
│ ├── config/
│ │ └── db.js
│ │ └── **tests**/ # Unit tests for configuration
│ │ └── db.test.js
│ └── **e2e**/ # End-to-end tests
│ └── userRoutes.e2e.js
│ └── authMiddleware.e2e.js
├── public/ # Static assets
│ └── stylesheets/
│ └── style.css
├── .env # Environment variables
├── .gitignore
├── README.md
└── package.json

# Parameters

- Use req.params.<parameter> to find parameters from url

```
router.get("/catalog/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const categories = catalog.findItems(categoryId);

  if (categories === undefined) {
    res.status(404).send("Not found");
  } else {
    res.json(categories);
  }
});
```

# Query

- Use req.query to find querystrings from a url

```
router.get("/catalog/:categoryId", (req, res) => {
  const { name, age } = req.query;
  const categories = catalog.findItems(categoryId);

  if (categories === undefined) {
    res.status(404).send("Not found");
  } else {
    res.json(categories);
  }
});
```

# Headers

- In Express
  Use res.set(headerkey, headerValue)
  res.json() automatically sets headers to Content-Type: application/json and status to 200
  res.send() sets headers automatically for the type of data you pass to it.

```
router.get("/catalog/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const categories = catalog.findItems(categoryId);

  if (categories === undefined) {
    res.status(404).set('Content-Type', 'plain/text').send("Not found");
  } else {
    res.status(200).json(categories);
  }
});
```

- In Nodejs
  Use res.writeHead

```
router.get('/', (req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  response.end("Hello from Node JS");
  console.log("Hello handler requested");
})
```

# Content Negotiation

Use express' res.format method to send data depending on the accept header of the request.

```
router.get('/', (req, res) => {
    res.format({
        'text/xml': res.send(catalog.findCategoriesXml()),
        'application/json': res.send(catalog.findCategoriesJSON()),
        'default': res.status(406).send('Not acceptable')
    })
})
```
