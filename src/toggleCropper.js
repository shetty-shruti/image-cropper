import {
    displayElement
} from './main';

export function showCropper() {
    displayElement[0].setAttribute('style', 'display:block');
}

export function hideCropper() {
    displayElement[0].setAttribute('style', 'display:none !important');
}

