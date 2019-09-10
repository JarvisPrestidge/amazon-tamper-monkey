
![node](https://img.shields.io/badge/node-v8.10.0-blue.svg) 
![yarn](https://img.shields.io/badge/yarn-v1.7.0-yellow.svg) 

# amazon-tamper-monkey :monkey:

## Installation

Install nodejs and yarn if you haven't already.


Then bring in the js dependencies with:

```bash
$ yarn
```

## Usage

To build the script, use the following:

```bash
$ yarn build
```

Then copy the generated dist/barcode.js file into the tampermonkey editor or if you wan to develop our side the tampermonkey browser editor 
you can simple add the following in the declaration section of your tampermonkey script:

```js
@require       file://<absolute path to your dist/barcode.js file>
```

Good luck ryan <3
