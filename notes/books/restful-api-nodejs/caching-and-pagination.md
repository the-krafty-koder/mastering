# Pagination

- Implement pagination by using middleware such as express-paginate.
- The middleware enriches the request object with a `query.limit` and `query.page`. You can use these values as offsets for paginating the underlying data.

```

// # app.js

const express = require('express');
const paginate = require('express-paginate');
const app = express();

// keep this before all routes that will use pagination
app.use(paginate.middleware(10, 50)); (limit, maxLimit)

app.get('/users', async (req, res, next) => {

  // This example assumes you've previously defined `Users`
  // as `const Users = sequelize.define('Users',{})` if you are using `Sequelize`
  // and that you are using Node v7.6.0+ which has async/await support

  router.get("/all_users", (req, res, next) => {
    db.User.findAndCountAll({limit: req.query.limit, offset: req.skip})
      .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('users/all_users', {
          users: results.rows,
          pageCount,
          itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    }).catch(err => next(err))
  });

});

app.listen(3000);
```

# Caching

A HTTP server can be made to cache content for a url that receives frequent requests, in order to avoid querying the underlying database server.

- A special response header called called the Cache Control header is used to cache responses for a specified amount of time before the data is invalidated.
- In Express, express-control-cache is used for this purpose.

```
import cacheControl from "express-cache-control"
const cache = new CacheControl().middleware;

router.get('/v2/', cache('minutes', 1), (request, response) => {...})”

```

# Documenting

- When preparing a REST API for production, ensure to create A WADL document to document API resources and operations. Once you have all your operations described, simply store the wadl file in the static directory of your express.js project and expose it from application: `app.use('/catalog/static', express.static('static'));`

- Swagger is becoming the defacto standard over WADL
