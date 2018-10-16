import fetch from 'cross-fetch';

/**
 * @param {Object} config -
 * @param {string} config.apiKey - The Google Geocoding API key.
 * @param {number} [config.maxPendingRequests=100] - The maximum allowed pending
 *   geocoding requests.
 */
class GoogleGeocodingService {
  constructor(config) {
    this._ = {
      // Will be cached by the address. Not sure yet whether the results of geocoding
      // are case-sensitive. So, keying off the geocoded address as is.
      cache: {
        '': null, // Cache the empty address as null.
      },
      config: {
        ...config,
        maxPendingRequests: typeof config.maxPendingRequests === 'number' ? config.maxPendingRequests : 100,
      },
      fetchCount: 0, // Number of pending requests.
    };
  }

  geocode(address, overridingApiKey) {
    // console.log('GoogleGeocodingService#geocode');
    // console.log(address);
    return new Promise((resolve, reject) => {
      const cachedResults = this._.cache[address];
      if (cachedResults !== undefined /* Note: null is okay. */) {
        resolve(cachedResults);
        // console.log('Cache HIT');
        return;
      }

      this._.fetchCount += 1;
      if (this._.fetchCount <= this._.config.maxPendingRequests) {
        const apiKey = overridingApiKey || this._.config.apiKey;
        const urlStr = [
          'https://maps.googleapis.com/maps/api/geocode/json',
          `?address=${encodeURIComponent(address)}`,
          `&key=${encodeURIComponent(apiKey)}`,
        ].join('');
        fetch(urlStr).then(res => {
          this._.fetchCount -= 1;
          if (res.ok) {
            res.json().then(geoRes => {
              const { results, status } = geoRes;
              if (Array.isArray(results) && (status === 'OK' || status === 'ZERO_RESULTS')) {
                this._.cache[address] = results;
                resolve(results);
              }
              else {
                reject(Error(status));
              }
            }).catch(reason => {
              let error = reason;
              if (!(error instanceof Error)) {
                error = Error(reason);
              }
              reject(error);
            });
          }
          else {
            reject(Error(`${res.status} ${res.statusText}`));
          }
        }).catch(reason => {
          this._.fetchCount -= 1;
          let error = reason;
          if (!(error instanceof Error)) {
            error = Error(reason);
          }
          reject(error);
        });
      }
      else {
        this._.fetchCount -= 1;
        reject(Error(`Exceeded maximum concurrent geocode requests of ${this._.config.maxPendingRequests}.`));
      }
    });
  }
}

export default GoogleGeocodingService;
