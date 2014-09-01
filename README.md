# exiftool [![Build Status](https://travis-ci.org/nathanpeck/exiftool.svg?branch=master)](https://travis-ci.org/nathanpeck/exiftool)

A node.js wrapper around [exiftool](http://owl.phy.queensu.ca/~phil/exiftool/), a commandline utility that can extract metadata from many different filetypes, including JPEG, PNG, PDF, WMV, MOV. For a full list see the [exiftool list of supported filetypes](http://www.sno.phy.queensu.ca/~phil/exiftool/#supported).

## Installation

To make use of exiftool you will need to download and install the appropriate exiftool package for your system.

__Mac OS X:__

```
sudo brew update
sudo brew install exiftool
```

__Ubuntu:__

```
sudo apt-get update
sudo apt-get install libimage-exiftool-perl
```

For other systems or for information on how to compile exiftool from source refer to the [official documentation for exiftool](http://www.sno.phy.queensu.ca/~phil/exiftool/install.html).

## Usage

```js
var exif = require('exiftool');
var fs   = require('fs');

fs.readFile('./tests/resources/chvrches.jpg', function (err, data) {
  if (err)
    throw err;
  else {
    exif.metadata(data, function (err, metadata) {
      if (err)
        throw err;
      else
        console.log(metadata);
    });
  }
});
```

The properties and contents of the metadata dictionary returned by exiftool will vary widely depending on the filetype but you can expect dictionaries that look similar to this:

__From a JPG:__

```js
{ exiftoolVersionNumber: 9.58,
  fileType: 'JPEG',
  mimeType: 'image/jpeg',
  jfifVersion: 1.01,
  resolutionUnit: 'None',
  xResolution: 1,
  yResolution: 1,
  imageWidth: 620,
  imageHeight: 413,
  encodingProcess: 'Baseline DCT, Huffman coding',
  bitsPerSample: 8,
  colorComponents: 3,
  yCbCrSubSampling: 'YCbCr4:2:0 (2 2)',
  imageSize: '620x413' }
```

__From a MOV:__

```js
{ exiftoolVersionNumber: 9.58,
  fileType: 'MOV',
  mimeType: 'video/quicktime',
  majorBrand: 'Apple QuickTime (.MOV/QT)',
  minorVersion: '2005.3.0',
  compatibleBrands: 'qt',
  movieHeaderVersion: 0,
  createDate: '2012:09:18 17:18:25',
  modifyDate: '2012:09:18 17:18:25',
  timeScale: 2997,
  duration: '0:02:31',
  preferredRate: 1,
  preferredVolume: '100.00%',
  previewTime: '0 s',
  previewDuration: '0 s',
  posterTime: '0 s',
  selectionTime: '0 s',
  selectionDuration: '0 s',
  currentTime: '0 s',
  nextTrackID: 4,
  trackHeaderVersion: 0,
  trackCreateDate: '2012:09:18 16:24:43',
  trackModifyDate: '2012:09:18 17:18:25',
  trackID: 1,
  trackDuration: '0:02:31',
  trackLayer: 0,
  trackVolume: '0.00%',
  imageWidth: 320,
  imageHeight: 136,
  cleanApertureDimensions: '320x136',
  productionApertureDimensions: '320x136',
  encodedPixelsDimensions: '320x136',
  graphicsMode: 'ditherCopy',
  opColor: '32768 32768 32768',
  compressorID: 'avc1',
  vendorID: 'Apple',
  sourceImageWidth: 320,
  sourceImageHeight: 136,
  xResolution: 72,
  yResolution: 72,
  compressorName: 'H.264',
  bitDepth: 24,
  videoFrameRate: 23.976,
  audioFormat: 'mp4a',
  audioChannels: 2,
  audioBitsPerSample: 16,
  audioSampleRate: 44100,
  purchaseFileFormat: 'mp4a',
  matrixStructure: '1 0 0 0 1 0 0 0 1',
  mediaHeaderVersion: 0,
  mediaCreateDate: '2012:09:18 17:18:25',
  mediaModifyDate: '2012:09:18 17:18:25',
  mediaTimeScale: 2997,
  mediaDuration: '0:02:31',
  genMediaVersion: 0,
  genFlags: '0 0 0',
  genGraphicsMode: 'ditherCopy',
  genOpColor: '32768 32768 32768',
  genBalance: 0,
  textFont: 'Unknown (1024)',
  textFace: 'Plain',
  textSize: 12,
  textColor: '0 0 0',
  backgroundColor: '65535 65535 65535',
  fontName: 'Lucida Grande',
  handlerClass: 'Data Handler',
  handlerVendorID: 'Apple',
  handlerDescription: 'Apple Alias Data Handler',
  otherFormat: 'tmcd',
  handlerType: 'Metadata Tags',
  audioGain: 1,
  trebel: 0,
  bass: 0,
  balance: 0,
  pitchShift: 0,
  mute: 'Off',
  brightness: 0,
  color: 1,
  tint: 0,
  contrast: 1,
  playerVersion: '7.6 (7.6)',
  version: '7.6.0 (1290) 0x7608000 (Mac OS X, 10.5.6, 9G71)',
  'comment(err)': 'Encoded and delivered by apple.com/trailers/',
  'copyright(err)': '� 2012 Warner Bros. Pictures. All Rights Reserved',
  'userDataDes(err)': 'In theaters 2012',
  windowLocation: '45 21',
  playSelection: 0,
  playAllFrames: 0,
  movieDataSize: 8636129,
  movieDataOffset: 98160,
  comment: 'Encoded and delivered by apple.com/trailers/',
  copyright: '� 2012 Warner Bros. Pictures. All Rights Reserved',
  userDataDes: 'In theaters 2012',
  avgBitrate: '457 kbps',
  imageSize: '320x136',
  rotation: 0 }
```

## Filtering metadata

You can also provide an optional list of extra parameters to pass into exiftool, if you want it to return only specific metadata keys:

```js
var exif = require('exiftool');
var fs   = require('fs');

fs.readFile('./tests/resources/chvrches.jpg', ['-imageWidth', '-imageHeight'], function (err, data) {
  if (err)
    throw err;
  else {
    exif.metadata(data, function (err, metadata) {
      if (err)
        throw err;
      else
        console.log(metadata);
    });
  }
});
```
