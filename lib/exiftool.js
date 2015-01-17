var ChildProcess = require('child_process');

// Accepts the raw binary content of a file and returns the meta data of the file.
exports.metadata = function (source, tags, doneGettingMetadata) {
  // tags is an optional parameter, hence it may be a callback instead.
  if (typeof tags == 'function') {
    doneGettingMetadata = tags;
    tags = [];
  }

  // The dash specifies to read data from stdin.
  var args = [];
  if (typeof(tags) == 'object' && tags.length > 0) {
    args = tags;
  }

  args.push('-json');
  args.push('-');

  var exif = ChildProcess.spawn('exiftool', args);

  //Check for error because of the child process not being found / launched.
  exif.on('error', function (err) {
    doneGettingMetadata('Fatal Error: Unable to load exiftool. ' + err);
  });

  var response = '';
  var errorMessage = '';
  exif.stdout.on("data", function (data) {
    response += data;
  });

  // Read an error response back and deal with it.
  exif.stderr.on("data", function (data) {
    errorMessage += data.toString();
  });

  // Handle the response to the callback to hand the metadata back.
  exif.on("close", function () {
    if (errorMessage)
    {
      doneGettingMetadata(errorMessage);
    }
    else
    {
      try {

        var jsonResponse = JSON.parse(response);

        /**
         * exiftool outputs a strange thing: an array with 1 object inside..
         * convert it to a simple array as that is what this component returned before..
         */

        if (typeof(jsonResponse[0]) == 'object') {
          var metaData = [];
          for (i in jsonResponse[0]) {
            metaData[i] = jsonResponse[0][i];
          }
          doneGettingMetadata(null, metaData);
        } else {
          throw new Error('trigger');
        }

      } catch (Exception) {
        doneGettingMetadata('Fatal Error: Unable to parse exiftool output.');
      }

    }
  });

  //Give the source binary data to the process which will extract the meta data.
  exif.stdin.write(source);
  exif.stdin.end();

  return exif;
};
