var express = require('express');
var path = require('path');
var bliss = new require('bliss');
var colors = require('colors');
var app = express();
var view = new bliss();

app.set('views', path.join(__dirname, 'views'));
app.engine('.bliss', function(path, options, fn){
    fn( null, view.render(path, options));
});

/*
 * ROUTES
 */

app.get('/:progress?', function(req, res){
    if ( !req.params.progress || req.params.progress > 100 )
    {
        res.send('You must provide a number between 1-100');  
    }
    else
    {
        progress = req.params.progress;
        width = 90.0 * progress / 100.0;
        if ( progress < 30 )
        {
            colour = "d9534f";
        }
        else if ( progress < 70)
        {
            colour = "f0ad4e";
        }
        else {
            colour = "5cb85c";
        }

        res.type('svg');
        res.render('bar.bliss', { width: width, progress: progress, colour: colour  });
        console.log('Rendered: '.green + progress.green + "%".green);
    }
});

/*
 * SERVER
 */
var server = app.listen(3000, function() {
    console.log('Listening on port 3000'.rainbow);
});