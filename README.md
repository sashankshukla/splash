# SPLASH

# Project Description

## Overview

With rising costs and the increased interest from young adults looking to make investments into a multitude of different financial avenues, **Splash** is designed to be a simple way to connect sellers and buyers without a middle man, as well as allow the pooling of financial capital to invest in more profitable assets collectively.

Splash will support several different user types depending on the objective they wish to achieve:

### Buyer

- Add bank accounts and funds to the webapp
- View and filter listings of available assets to purchase
- Create public/private pools in order to invest in those assets
- View progress of funding for an investment pool
- Recieve email notifications for transactions and approvals

### Seller

- Add listings (Photos, Descriptions, Price, additional fees)
- Remove listings if not full funded
- Approve purchases of their assets

# Project Task Requirements

## Minimal Requirements

1. Users should be able to login and signup for the webapp ✅
2. Users should be able to view open listings and filter them ✅
3. Buyers should be able to see owned assets, and view owned asset value ✅
4. Sellers should be able to add a new listing of an asset to the webapp ✅

## Standard Requirements

1. Mock payment on purchase of asset ✅
2. Buyers should be able to view over time price graphs of their assets value ✅
3. Users should be able to create and join investment pools and then purchase assets ✅
4. Sellers should be able to view active/closed listings, open pools for their listings ✅
5. Seller should have to approve a purchase of his asset through his dashboard ✅

## Stretch Requirements

1. ML/AI integration for prediction of user asset price over time ✅
2. Blockchain based fractional ownership - Users transferring fractional shares (blockchain tokens/regular) ❌
3. Mock funding/ payment methods ✅
4. Approval process for members and bank accounts (admins) ✅
5. event-locked fundraisers/bidding - One time in-person event "lobby" accessible by passcode in order to facilitate bidding in-person and cultivate local interest in investment opportunities ❌
6. Private investment pools, shareable and viewable only by token/uniqueID holders ✅

# Technologies

## HTML,CSS, and JS

We used TailwindCSS (a CSS library) for styling all of our React components. HTML tags are present throughout our react components (divs, h1, etc) and `index.html` is the entry point for our React App. Javascript was used both in the front end(React) and backend(Express).

## React & Redux

We used React to create our frontend, enabling us to build serveral reusable components that we integrated throughout the webapp. We utilized redux to globally manage our state for us, utilizing redux thunks to make our API calls, and appropriately handle state changes using builder cases to see changes occur asynchronously on the frontend, giving a more pleasing experience.

## Node and Express

We built our backend using Express.js running on Node. This is where the entirety of our API lives, which we used to communicate between the front end and the database appropriately. We built out both auth and error middlewares for our express backend, to secure necessary api routes and handle both validation and server errors that we then display on the front end.

## MongoDB

We used MongoDB collections to store all of our app data, including users, listings, pools, and banks. We made use of mongoose to build out schemas for these collections and interact with this modelled data (CRUD) to provide all necessary functionality.

## Builds and Deployment

We deployed our webapp to Render. We deployed our Express backend as a web service, and hosted our front end as a static asset website on render.

# Above and Beyond Functionality

# Next steps

# Contributions

## Sashank

## Melinda

## Frankey

## Daman

# Breakdown of Minimal Requirements into Smaller Tasks

## Listings Dashboard

1. Filtering for type of assets desired
2. Add search bar to listings page to look for investments
3. Add scrolling functionality to move between pictures of a listing
4. Sorting
5. Make relevant webpages responsive

## Buyer Dashboard

1. Add API route to retrieve all assets owned by logged in user
2. Allow user to edit their optional information (name, address, etc)
3. Create visual for user to view the overall appreciation/depreciation of assets
4. Create UI list for user to view pools they are part of
5. Make relevant webpages responsive

# Prototypes

![Example Image](sketches/pools_dashboard.JPG)
![Example Image2](sketches/Listings_Page.jpg)
![Example Image3](sketches/buyers_dashboard.JPG)
