## To run locally

You will need to run the service in `address-history-challenge`

After cloning this repo down, create a `.env.local` file and copy the contents of `.env.local.example` over.
Make sure that the port in the `REACT_APP_API_URL` variable is the one the `address-history-challenge` is listening on.

Then, run `npm install` and `npm start` to run in development mode.

## To navigate

You'll need to have a user id handy or make one via the API.  When you do, enter it into the text field and press enter.

You will see a list of non-deleted addresses.  Clicking on the eyeball icon will slide a drawer open with the event history of that specific address.

Furthermore, clicking on an event will add it to the "comparison" section below.  Clicking on events will compare the addresses between them, highlighting the differences in red and bolding the text.
