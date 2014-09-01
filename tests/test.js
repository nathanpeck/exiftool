var exif   = require(process.cwd() + '/lib/exiftool.js'),
    expect = require('chai').expect,
    fs     = require('fs');

describe('Giving JPG image binary data to exiftool', function () {
  var response;

  before(function (done) {
    fs.readFile(process.cwd() + '/tests/resources/chvrches.jpg', function (err, data) {
      if (err)
        throw err;
      else
        exif.metadata(data, function (err, metadata) {
          if (err)
            throw err;
          else
          {
            console.log(metadata);
            response = metadata;
            done();
          }
        });
    });
  });

  it('metadata return should be image metadata', function () {
    expect(response).to.have.property('fileType');
    expect(response.fileType).to.equal('JPEG');
  });
});

describe('Giving PNG image binary data to exiftool', function () {
  var response;

  before(function (done) {
    fs.readFile(process.cwd() + '/tests/resources/lauren.png', function (err, data) {
      if (err)
        throw err;
      else
        exif.metadata(data, function (err, metadata) {
          if (err)
            throw err;
          else
          {
            console.log(metadata);
            response = metadata;
            done();
          }
        });
    });
  });

  it('metadata return should be image metadata', function () {
    expect(response).to.have.property('fileType');
    expect(response.fileType).to.equal('PNG');
  });
});

describe('Giving PDF binary data to exiftool', function () {
  var response;

  before(function (done) {
    fs.readFile(process.cwd() + '/tests/resources/working.pdf', function (err, data) {
      if (err)
        throw err;
      else
        exif.metadata(data, function (err, metadata) {
          if (err)
            throw err;
          else
          {
            console.log(metadata);
            response = metadata;
            done();
          }
        });
    });
  });

  it('metadata return should be pdf metadata', function () {
    expect(response).to.have.property('fileType');
    expect(response.fileType).to.equal('PDF');
  });
});

describe('Giving MOV video binary data to exiftool', function () {
  var response;

  before(function (done) {
    fs.readFile(process.cwd() + '/tests/resources/hobbit.mov', function (err, data) {
      if (err)
        throw err;
      else
        exif.metadata(data, function (err, metadata) {
          if (err)
            throw err;
          else
          {
            console.log(metadata);
            response = metadata;
            done();
          }
        });
    });
  });

  it('metadata return should be pdf metadata', function () {
    expect(response).to.have.property('fileType');
    expect(response.fileType).to.equal('MOV');
  });
});

describe('Doing exif.metadata() on a JPG image with tags input -imageWidth and -imageHeight', function () {
  var response;

  before(function (done) {
    fs.readFile(process.cwd() + '/tests/resources/chvrches.jpg', function (err, data) {
      if (err)
        throw err;
      else
        exif.metadata(data, ['-imageWidth', '-imageHeight'],function (err, metadata) {
          if (err)
            throw err;
          else
          {
            console.log(metadata);
            response = metadata;
            done();
          }
        });
    });
  });

  it('matadata return should be the values of tags', function () {
    expect(response).to.have.property('imageWidth');
    expect(response).to.have.property('imageHeight');
  });
});
