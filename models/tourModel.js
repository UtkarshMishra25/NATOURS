const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal than 40 characters'],
        minlength: [10, 'A tour name must have more or equal than 10 characters'],
        // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        requiresd: [true, 'A tour must have a price']
    },
    priceDiscount: {
       type: Number,
       validate: {
            validator: function(val) {
                return val < this.price;
            },
            message: 'Discount price should be below the price'
       } 
    }, 
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    desscription: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, 
    {
        toJSON: { virtuals: true},
        toObject: { virtuals: true}
});    

tourSchema.virtual('durationWeeks').get(function(next) {
    return this.duration / 7;
});

// DOCUMENT MIDDILEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre('save', function(next) {
//     console.log('Will save document...');
//     next();
// });

// tourSchema.post('save', function(doc, next) {
//     console.log(doc);
//     next();
// });

//QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true } });

    this.start = Data.now();
    next();
});

tourSchema.post(/^find/, function(docs, next){
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});

// AGGREGATOIN MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

    console.log(this.pipeline());
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;