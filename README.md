# Charity app frontend

Front-end for charity app.

Back-end for the app can be found [here](https://github.com/Zukkari/charity-app).

## Building

Building is a little bit weird because of how npm handles local modules...

When installing libraries, in `package.json` remove the line: 

```json5
"charity-client": "./schema"
```

Client is required to be as dependency because we still need some libraries
 that the API client brings with it, but for some reason NPM doesn't want to install it locally.

After the dependencies have been installed, add that line back.

## Functionality

App supports following functionality:

- Adding items to cart
- Checking out via the checkout page (click on the cart)
- Balance is shown at the bottom of the screen
- Possibility to reset cart on the checkout page
- Interaction of multiple users is handled with SSE
- Items are greyed out once they are out of stock
