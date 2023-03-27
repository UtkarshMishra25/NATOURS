/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51MpwRiSC5QhlM4IL0CQ3d64LB3bc0Nghvh7tvMuSYMoIEPpGie3IPgGnx4UMLG6sRydVHUwocvnAKk04Q3uSnsxp00snhoHOc7');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};