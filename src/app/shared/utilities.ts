import { Operator } from './services/entry-service.service';

export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function convertOperator(input: string) {
    switch (input) {
        case 'x':
            return Operator.Times;
        case '-':
            return Operator.Minus;
        case '/':
            return Operator.Divide;
        default:
            return Operator.Plus;
    }
}

export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}