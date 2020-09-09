import { FormControl } from "@angular/forms";

export function errorMessage(control: FormControl): string {
    if (control.hasError('required')) {
        return 'This field is reqiured'
    }
    else if (control.hasError('minlength')) {
        return 'Min length is 3'
    }
    else if (control.hasError('email') && !control.hasError('required')) {
        return 'Invalid email'
    }
    else if (control.hasError('invalidMimeType')) {
        return 'Invalid file'
    }

    return ''
}