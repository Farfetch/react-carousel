import PropTypes from 'prop-types';

export default {
    setMethods: PropTypes.func,
    goNext: PropTypes.func,
    goPrev: PropTypes.func,
    goTo: PropTypes.func,
    activeItem: PropTypes.number,
    itemsLength: PropTypes.number,
};
