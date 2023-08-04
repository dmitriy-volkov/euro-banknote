/* 
Latvia adopted the euro on 1 January 2014. In future Latvijas Banka has the
right to use the letter "C" in the serial number in the event it is allocated
any future production of banknotes of the first series. However, the use of
that letter is still uncertain; it depends on future production arrangements.

Lithuania adopted the euro on 1 January 2015. In future Lietuvos bankas has the
right to use the letter «B» in the serial number in the event it is allocated
any future production of banknotes of the first series. However, the use of
that letter is still uncertain; it depends on future production arrangements.
*/
const seriesOne = {
    //'B': 'Lithuania,
    //'C': 'Latvia',
    'Z': 'Belgium',
    'X': 'Germany',
    'D': 'Estonia',
    'T': 'Ireland',
    'Y': 'Greece',
    'V': 'Spain',
    'U': 'France',
    'S': 'Italy',
    'G': 'Cyprus',
    'F': 'Malta',
    'P': 'Netherlands',
    'N': 'Austria',
    'M': 'Portugal',
    'H': 'Slovenia',
    'E': 'Slovakia',
    'L': 'Finland',
};

const seriesTwo = {
    'D': {
        printer: 'Polska Wytwórnia Papierów Wartościowych',
        country: 'Poland'
    },
    'E': {
        printer: 'Oberthur Fiduciaire SAS (Chantepie)',
        country: 'France'
    },
    'F': {
        printer: 'Oberthur Fiduciaire AD (Sofia)',
        country: 'Bulgaria'
    },
    'H': {
        printer: 'De La Rue Currency (Loughton)',
        country: 'United Kingdom'
    },
    'J': {
        printer: 'De La Rue Currency (Gateshead)',
        country: 'United Kingdom'
    },
    'M': {
        printer: 'Valora',
        country: 'Portugal'
    },
    'N': {
        printer: 'Oesterreichische Banknoten und Sicherheitsdruck GmbH',
        country: 'Austria'
    },
    'P': {
        printer: 'Joh. Enschede Security Printing BV',
        country: 'Netherlands'
    },
    'R': {
        printer: 'Bundesdruckerei GmbH',
        country: 'Germany'
    },
    'S': {
        printer: "Banca d'Italia",
        country: 'Italy'
    },
    'T': {
        printer: 'Central Bank of Ireland',
        country: 'Ireland'
    },
    'U': {
        printer: 'Banque de France',
        country: 'France'
    },
    'V': {
        printer: 'IMBISA',
        country: 'Spain'
    },
    'W': {
        printer: 'Giesecke & Devrient GmbH (Leipzig)',
        country: 'Germany'
    },
    'X': {
        printer: 'Giesecke & Devrient GmbH (Munich)',
        country: 'Germany'
    },
    'Y': {
        printer: 'Bank of Greece',
        country: 'Greece'
    },
    'Z': {
        printer: 'Nationale Bank van België',
        country: 'Belgium'
    }
}

interface EuroInformation {
    series: number;
    country: string;
    printer?: string;
}

const CODE_A = 'A'.charCodeAt(0);
const CODE_Z = 'Z'.charCodeAt(0);
const CODE_0 = '0'.charCodeAt(0);
const CODE_9 = '9'.charCodeAt(0);

function isNumber(character: string) {
    const code = character.charCodeAt(0);
    return code >= CODE_0 && code <= CODE_9;
}

function isLetter(character: string) {
    const code = character.charCodeAt(0);
    return code >= CODE_A && code <= CODE_Z;
}

function sum(input: string): number {
    let result = 0;
    for (let i = 0; i < input.length; i++) {
        result += input.charCodeAt(i) - CODE_0;
    }
    return result;
}

function root(input: number): number {
    let result = input;
    while (result > 9) {
        result = result % 10 + Math.floor(result / 10);
    }
    return result;
}

export function isValid(serialNumber: string) {
    if (typeof serialNumber !== 'string' || serialNumber.length != 12) {
        return false;
    }
    serialNumber = serialNumber.toUpperCase();
    const fitsFirstSeries = seriesOne.hasOwnProperty(serialNumber[0]);
    const fitsSecondSeries = seriesTwo.hasOwnProperty(serialNumber[0]);
    if (!fitsFirstSeries && !fitsSecondSeries) {
        return false;
    }
    if (!isLetter(serialNumber[1]) && !isNumber(serialNumber[1])) {
        return false;
    }
    for (let i = 2; i < serialNumber.length; i++) {
        if (!isNumber(serialNumber[i])) return false;
    }
    const number = isNumber(serialNumber[1]) ?
        serialNumber.slice(1) : serialNumber.charCodeAt(1) + serialNumber.slice(2);
    return root(serialNumber.charCodeAt(0) + root(sum(number))) % 9 === 0;
}

export function info(serialNumber: string): EuroInformation {
    if (!isValid(serialNumber)) {
        throw new Error("Invalid banknote serial number")
    }
    const countryCode = serialNumber[0];
    const secondCharacter = serialNumber[1];
    if (isLetter(secondCharacter)) {
        return {
            series: 2,
            country: seriesTwo[countryCode].country,
            printer: seriesTwo[countryCode].printer
        }
    } else {
        return {
            series: 1,
            country: seriesOne[countryCode]
        }
    }
}
