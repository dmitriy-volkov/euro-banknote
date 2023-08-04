# About
<b>ZERO DEPENDENCIES</b>

Check validity of euro banknote by serial number and get information about it.

There are currently 2 series of euro banknotes, both are covered by this library.
Read more about euro banknotes [here](https://en.wikipedia.org/wiki/Euro_banknotes).

# Usage
```javascript
import { isValid, info } from 'euro-banknote';

console.log('NC5822415251 is valid: ' + isValid('NC5822415251'));
// NC5822415251 is valid: true

console.log('AB2222222221 is valid: ' + isValid('AB2222222221'));
// AB2222222221 is valid: false

console.log(info('NC5822415251'));
// { series: 2, country: 'Spain', printer: 'IMBISA' }

console.log(info('S57284012014'));
// { series: 1, country: 'Italy' }
```
Library is written in typescript, types are included.