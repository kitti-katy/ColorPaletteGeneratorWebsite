var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cpg_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var paletteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: Number,
    palette: [{
        type: String
    }]
 });
 var Palette = mongoose.model("Palette", paletteSchema);

// Palette.remove()
app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(5000);

app.get('/palettes', function(req, res){
    Palette.find({}, function(err, palettes) {
        var paletteMap = {};
    
        palettes.forEach(function(palette) {
            paletteMap[palette._id] = palette;
        });
    
        res.send(paletteMap);  
      });
 });

 app.get('/save_palette', function(req, res){
    var newPalette = new Palette( { _id: new mongoose.Types.ObjectId(),creator: 0, palette: ['ff0033','00ff30', 'ffeb00', '1100ff','eb00ff'] } )
    newPalette.save(function (err) {
        if (err) return console.error(err);
        res.send("Saved palette!");
      });
 });

