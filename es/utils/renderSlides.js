import { Children } from 'react';
import { cloneSlide } from "./";

var renderSlides = function renderSlides(children, itemsToShow, style) {
  return Children.map(children, function (child, index) {
    return cloneSlide(child, index, false, null, style);
  });
};

export default renderSlides;