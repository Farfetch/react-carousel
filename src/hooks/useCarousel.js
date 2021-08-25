const { CarouselContext } = require('#context');
const { useContext } = require('react');

export default function useCarousel() {
    const carouselContext = useContext(CarouselContext);
    return carouselContext;
}
