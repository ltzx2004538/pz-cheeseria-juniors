# Welcome to Patient Zero's Cheeseria Coding Challenge From Oliver Yu

## Overview

This is my code test work for Patient Zero.

This project is a cheese seller page, so the customer can buy the cheese and put it into a cart then checkout.

## Technology Stack
   React, Redux, Redux-saga, Typescript, Material-UI, Styled Component, Cypress

## The feature I have made:
  1. Add a dialog for each cheese card, so the user can see the details of each cheese.
  2. Add a checkout button in the cart slider, so user can send the order to the backend after they click the button
  3. Add a purchase history dialog if the user click the recent purchase button
  4. Build UI Test when for #2, the test will automatically add cheeses to the cart and click the checkout button.
     It will also check the button is disabled if the cart is empty.
     
## Known Issues
  1. The UI is simple and need to be improved makes it looks better.
  2. The backend don't have a real database, curretly the orders will be saved in memory.
  3. The purchase record only save the ID of each cheese, so the user can only see the ID number of the cheese they have purchased before
     This can be solved if we have a real database, so the cheeses details can be populated by the ID in the database layer. 
  5. The application working fine in Google Chrome but not looks good in other browser.
  6. The application don't have responsive design.


## Important Scripts

In the project directory, you can run:

### `npm install`

Installs package dependencies (node v14.15.0)

### `npm start`

Builds and runs the app in the development mode.\
The browser will be automatically launched under [http://localhost:9000](http://localhost:9000).
The server backend will start listening on [http://localhost:3000](http://localhost:3000)

### Cypress.io

I have 2 test for the purchase button:

1. Send order to the backend server successful
   Check the order is send to the order successfully
2. does not allow users to send empty order
   Check the order cannot be send if it is empty

```bash
npm install
npm test
```

### Helpful links

[React Material UI](https://material-ui.com/getting-started/usage/)
