import './../scss/main.scss';
import imageToCrop from '../images/cropImage.png'

import {
    showCropper,
    hideCropper
} from './toggleCropper';

import {
    makeResizableDiv
} from './makeResizableDiv';


var cropperExist = true; // Variable to check if cropper exist

const imageDiv = document.getElementById('image'); 
const cropButton = document.getElementById('cropButton');

const imgsrc = document.getElementById('crop_Img');
const canvas = document.getElementById('finalCanvas');

imgsrc.src = imageToCrop; // Assigining image to source



export var displayElement = document.getElementsByClassName('resizable');

makeResizableDiv('.resizable'); // Calling resizable div

/*
    Toggle the cropper. If clicked on image and cropeer exist then hide it
    else clicking again show the cropper
*/
imageDiv.addEventListener('click', toggleCropper()); 

cropButton.addEventListener('click', cropImage());

/**
 * Function which performs the cropping
 */
function cropImage() {
    return function () {
        if (cropperExist) {
            const element = document.querySelector(".resizable");
            const cropped_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            const cropped_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            console.log(cropped_height, cropped_width);
            drawCroppedImage(element.getBoundingClientRect().left - imgsrc.getBoundingClientRect().left,
                element.getBoundingClientRect().top - imgsrc.getBoundingClientRect().top,
                cropped_width, cropped_height, cropped_width, cropped_height);

        } else {
            alert('Please select section to crop');
        }
    };
}

/**
 * If cropper exist hide the cropper on click.
 * If not show the cropper on click.
 */
function toggleCropper() {
    return function () {
        if (cropperExist) {
            hideCropper();
            cropperExist = false;
        } else {
            showCropper();
            cropperExist = true;
        }
    };
}
/**
 * 
 * @param {The x-axis coordinate of the top left corner of the sub-rectangle of the source image} sx 
 * @param {The y-axis coordinate of the top left corner of the sub-rectangle of the source image} sy 
 * @param {The width of the sub-rectangle of the source image to draw into the destination context} w 
 * @param {The height of the sub-rectangle of the source image to draw into the destination context.} h 
 * @param {The width to draw the image in the destination canvas} cw 
 * @param {The height to draw the image in the destination canvas} ch 
 */
function drawCroppedImage(sx, sy, w, h, cw, ch) {

    
    const ctx = canvas.getContext("2d");
    canvas.setAttribute('width', 980 + 'px');
    canvas.setAttribute('height', 500 + 'px');
    /* Remove imageDiv and draw on canvas*/
    imageDiv.remove(); 
    hideCropper(); 
    cropperExist = false;
    console.log(sx, sy, w, h, cw, ch);
    ctx.drawImage(imgsrc, sx, sy, w, h, sx, sy, cw, ch);
}

canvas.addEventListener('click',showCropper());

window.onunload = function() {
    imageDiv.removeEventListener('click', toggleCropper()); 
    cropButton.removeEventListener('click', cropImage());
    canvas.removeEventListener('click',showCropper());
}