const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  item: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Item'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  checkIn: {type:Date, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;