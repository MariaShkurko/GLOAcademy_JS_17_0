"use strict";

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
    if (this.selector[0] === '.') {
        const className = this.selector.substring(1);
        const newElement = document.createElement('div');

        newElement.className = className;
        newElement.setAttribute('style', `height: ${this.height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize};`);
        newElement.innerHTML = `Новый div с классом ${className}`;

        document.body.append(newElement);
    } else if (this.selector[0] === '#') {
        const id = this.selector.substring(1);
        const newElement = document.createElement('div');

        newElement.id = id;
        newElement.style.cssText = `height: ${this.height};
            width: ${this.width};
            background: ${this.bg};
            font-size: ${this.fontSize};`;
        newElement.innerHTML = `Новый div с id ${id}`;

        document.body.append(newElement);
    }
}

const div1 = new DomElement('.big', '500px', '700px', '#c2c2f3', '27px');
const div2 = new DomElement('.small', '15px', '150px', '#aabb10', '10px');
const div3 = new DomElement('.medium', '200px', '400px', '#12ab1c', '18px');
div1.createElement();
div2.createElement();
div3.createElement();