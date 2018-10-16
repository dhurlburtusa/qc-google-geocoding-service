# @qc/google-geocoding-service

Makes using the Google Geocoding API easy to use.


## Installation

```sh
npm install --save @qc/google-geocoding-service
```

or

```sh
yarn add @qc/google-geocoding-service
```


## Usage

```js
import GoogleGeocodingService from '@qc/google-geocoding-service';

const geocodingService = new GoogleGeocodingService({
  apiKey: 'YOUR_API_KEY',
})

geocodingService.geocode('1600 Pennsylvan')
  .then(results => {
    console.dir(results);
  });
```


## Other Packages from [QC]

* [@qc/react-block][qc-react-block]
* [@qc/react-conditionals][qc-react-conditionals]
* [@qc/react-geocoder][qc-react-geocoder]
* [@qc/react-layer][qc-react-layer]
* [@qc/react-page][qc-react-page]


## Maintainers

- [Danny Hurlburt](https://github.com/dhurlburtusa)


## License

ISC


[qc]: https://www.npmjs.com/~qc
[qc-react-block]: https://www.npmjs.com/package/@qc/react-block
[qc-react-conditionals]: https://www.npmjs.com/package/@qc/react-conditionals
[qc-react-geocoder]: https://www.npmjs.com/package/@qc/react-geocoder
[qc-react-layer]: https://www.npmjs.com/package/@qc/react-layer
[qc-react-page]: https://www.npmjs.com/package/@qc/react-page
