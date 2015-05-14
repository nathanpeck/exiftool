var ChildProcess = require('child_process');

// Accepts the raw binary content of a file or a path and returns the meta data of the file.
exports.metadata = function (source, tags, doneGettingMetadata) {
  // tags is an optional parameter, hence it may be a callback instead.
  if (typeof tags == 'function') {
    doneGettingMetadata = tags;
    tags = [];
  }

  var usingBinaryData = false;
  if (typeof source === 'string') {
    tags.push(source);
  } else {
    // The dash specifies to read data from stdin.
    tags.push("-");
    usingBinaryData = true;
  }
  
  var exif = ChildProcess.spawn('exiftool', tags);

  //Check for error because of the child process not being found / launched.
  exif.on('error', function (err) {
    doneGettingMetadata('Fatal Error: Unable to load exiftool. ' + err);
  });

  // Read the binary data back
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
      // Split the response into lines.
      response = response.split("\n");

      //For each line of the response extract the meta data into a nice associative array
      var metaData = [];
      response.forEach(function (responseLine) {
        var separatorPos = responseLine.indexOf(': ')
        //Is this a line with a meta data pair on it?
        if (separatorPos !== -1) {
          //Turn the plain text data key into a camel case key.
          var key = responseLine.slice(0, separatorPos).trim().split(' ').map(
            function (tokenInKey, tokenNumber) {
              if (tokenNumber === 0)
                return tokenInKey.toLowerCase();
              else
                return tokenInKey[0].toUpperCase() + tokenInKey.slice(1);
            }
          ).join('');
          //Trim the value associated with the key to make it nice.
          var value = responseLine.slice(separatorPos + 1).trim();
          if (!isNaN(value))
          {
            value = parseFloat(value, 10);
          }
          metaData[key] = value;
        }
      });
      doneGettingMetadata(null, metaData);
    }
  });

  if (usingBinaryData)
  {
    //Give the source binary data to the process which will extract the meta data.
    exif.stdin.write(source);
    exif.stdin.end();
  }

  return exif;
};
