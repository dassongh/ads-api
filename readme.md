# ads-api

#### [node.js, express.js, mongodb, mongoose, jest]

### `POST /api/ads`

- request data validates by Joi library and mongoose model;
- returns created ad;

### `GET /api/ads?name=&page=&limit=&sort=`

- with no query params returns first 10 ads;
- if name is provided returns list of ads with matching name;
- page and limit params for pagination;
- sort accepts price and createdAt values;

Sort examples:

- sort=price (for price ascending);
- sort=-price (for price descending);

### `GET /api/ads/:adId?fields=`

- returns requested by Id ad;
- if fields query param includes "images", returns ad with all images;
- if fields query param includes "description", returns ad with description;

Fields examples:

- fields=images+description

### `DELETE /api/ads/:adId`

- removes ad from database and returns that ad

### `PUT /api/ads/:adId`

- request data validates by Joi library and mongoose model;
- updates existing ad and returns it;

### Commands

- `npm start` &mdash; starts server in production mode
- `npm run start:dev` &mdash; starts server in development mode
- `npm run test` &mdash; starts test
