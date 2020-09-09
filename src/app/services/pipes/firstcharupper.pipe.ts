import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'firstCharToUpperCase',
    pure: true
})
export class FirstCharToUpperCase implements PipeTransform {

    transform(str: string, ...args: unknown[]) {
        let first = str[0].toUpperCase()
        let rest = str.slice(1, str.length).toLowerCase()
        return first + rest
    }

}
