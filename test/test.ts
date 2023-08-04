import { isValid, info } from '../src';
import { expect } from 'chai';

const valid = [
    'X30284111711',
    'S57284012014',
    'VA5462804927',
    'NC5822415251',
    'UE3009261194',
    'UD0613244358',
    'SB3435243772',
    'UA5408696775',
    'NA4532489209'
];

const invalid = [
    null,
    undefined,
    NaN,
    Infinity,
    0,
    '',
    [],
    {},
    function () { },
    'hello',
    '523523523522',
    'LA222222222A',
    'AB3435243772',
    'L25388049086'
]

console.log(info('S57284012014'));

describe("Euro Banknotes", () => {
    describe("isValid", () => {
        it('should return true when given serial number is valid', () => {
            for (const serialNumber of valid) {
                expect(isValid(serialNumber), serialNumber).to.be.true;
            }
        });
        it('should return false when given serial number is invalid', () => {
            for (const serialNumber of invalid) {
                expect(isValid(serialNumber as any)).to.be.false;
            }
        });
    });
    describe("info", () => {
        it('should throw error when given invalid serial number', () => {
            expect(() => { info('hello') }).to.throw();
        });
        it('should return info object when given valid serial number', () => {
            expect(info('X30284111711')).to.deep.equal({
                series: 1,
                country: 'Germany'
            });
            expect(info('VA5462804927')).to.deep.equal({
                country: 'Spain',
                printer: 'IMBISA',
                series: 2,
            });
        })
    });
});