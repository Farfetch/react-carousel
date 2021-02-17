# ReactSwipeEvents: React Swipe (Touch Event) enabler
Simple component to enable Swipe event for react component
https://www.npmjs.com/package/react-swipe-events

This package is based on React-NPM-Boilerplate (https://github.com/juliancwirko/react-npm-boilerplate)

## How to use ReactSwipeEvents

Install first
- npm install --save react-swipe-events

Import this component
- import ReactSwipeEvents from 'reactSwipeEvents'

Cover your component with ReactSwipeEvents

## Props
Here is a list of accepted Props
- threshold: number - If delta between start and end of swipe below threshold no function will be called out
- onSwiping: func - Call out this function when user swiping (onTouchMove)
- onSwiped: func - Call out this function when user swiped (onTouchEnd)
- onSwipedUp: func - Call out this function when user swiped up
- onSwipedDown: func - Call out this function when user swiped down
- onSwipedLeft: func - Call out this function when user swiped left
- onSwipedRight: func - Call out this function when user swiped right

## Returned parameter 
- onSwipedLeft, onSwipedRight will return (e, originalX, endX)
- onSwipedTop, onSwipedDown will return (e, originalY, endY)
- onSwiping will return (e, originalX, originalY, currentX, currentY, deltaX, deltaY)
- onSwiped will return (e, originalX, originalY, endX, endY, deltaX, deltaY)

## License

MIT
