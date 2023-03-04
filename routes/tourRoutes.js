const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/234fad4/reviews 
// GET /tour/234fad4/reviews


router.use('/:tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);    

router
    .route('/monthly-plan/:year')
    .get(authController.protect, 
        authController.restrictTo('admin', 'lead-guid', 'guid'),
        tourController.getMonthlyPlan);    

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit') 
    .get(tourController.getToursWithin);
// /tours-diatance?distance=233&center=-40,45&unit=m1
// /tours-distance/233/center/-40,45&unit/m1

router
    .route('/')
    .get(tourController.getAllTours)
    .post(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guid'), 
        tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTours)
    .patch(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.UpdatedTour)
    .delete(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.deleteTour);

module.exports = router;