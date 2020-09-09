// Type definitions for currency-formatter
// Project: https://github.com/smirzaei/currency-formatter#readme
// Definitions by: Raymond Kandawasvika <https://github.com/okandas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.6

declare module 'currency-formatter' {

    export interface Currency {
        code: string;
        decimalDigits: number;
        decimalSeparator: string;
        spaceBetweenAmountAndSymbol: boolean;
        symbol: string;
        symbolOnLeft: boolean;
        thousandsSeparator: string;
    }
    
    export function format(value: number, options: {
        code?: string,
        locale?: string,
        symbol?: string,
        decimal?: string,
        thousand?: string,
        precision?: number,
        format?: string | {
            pos: string,
            neg: string,
            zero: string
        }
    }): string;

    export function findCurrency(currencyCode: string): Currency;
}