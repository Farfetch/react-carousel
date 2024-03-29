# react-carousel &middot; [![license](https://img.shields.io/github/license/Farfetch/react-carousel)](LICENSE) ![build](https://github.com/Farfetch/React-Carousel/workflows/Publish%20react-carousel/badge.svg)


A carousel component, with support for Swipe, Scroll and Snap Points.

## Installing

```bash
$ npm install --save @farfetch/react-carousel
```

...and include it in your project

```js
import { Carousel } from '@farfetch/react-carousel';
```

We also include css styles out-of-the-box, to use them just import the css by doing the following:

```js
import '@farfetch/react-carousel/styles.css'
```

If you want to style the carousel by yourself, ignore this step.

## Screenshots
![Example](docs/example.png)

### Infinite scroll demo
![Infinite Scroll](docs/infinite-scroll-example.gif)

## Concepts

The Carousel is fully operated by [`Context`](#CarouselContext), this gives the flexibility to extend it without having to change the core, as all the state of the [`Carousel`](#Carousel) is already exposed in the context.

To create a new carousel, you basically need two things: The wrapper ([`Carousel`](#Carousel)), a movement engine (one of the [sliders](#SwipeSlider)) and optional navigation [components](#Arrow). 

The base structure would look like this:

```jsx
import { Carousel, SwipeSlider, Bullets } from '@farfetch/react-carousel';

/* The mandatory wrapper of the Carousel */
<Carousel>
    /* One of the available movement engines */
    <SwipeSlider>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
    </SwipeSlider>
    
    /* Optional navigation component */
    <Bullets />
</Carousel>
```

You have full control of what you can put inside the [`Carousel`](#Carousel) wrapper, including divs and others components. 

The wrapper is nothing more than a `<div>` and the instance of the [`CarouselProvider`](#CarouselProvider), so all children already have access to the Context by default.

### Architecture overview

![react-carousel Architecture](docs/architecture-overview.png)

## Usage examples

In the examples below we demonstrate the flexibility of the components, passing all the available props, just for demonstration purposes.

Except for the movement engines, you can mix all the examples to have the more adequate Carousel for your needs.

### SwipeSlider

```jsx
import { Carousel, SwipeSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const MyComponent = (props) => (
    <Carousel className={ Style.container } isInfinite isRTL itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <SwipeSlider className={ Style.slider } disableSwipe hasKeysNavigation>
            <div className={ Style.customItem }>Item 1</div>
            <div className={ Style.moreCustomItem }>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </SwipeSlider>
    </Carousel>
);

export default MyComponent;
```

### ScrollSlider

```jsx
import { Carousel, ScrollSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const MyComponent = (props) => (
    <Carousel className={ Style.container } isInfinite isRTL itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <ScrollSlider className={ Style.slider } limitScroll>
            <div className={ Style.customItem }>Item 1</div>
            <div className={ Style.moreCustomItem }>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </ScrollSlider>
    </Carousel>
);

export default MyComponent;
```

### SnapSlider

```jsx
import { Carousel, SnapSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const MyComponent = (props) => (
    <Carousel className={ Style.container } isInfinite isRTL itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <SnapSlider className={ Style.slider }>
            <div className={ Style.customItem }>Item 1</div>
            <div className={ Style.moreCustomItem }>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </SnapSlider>
    </Carousel>
);

export default MyComponent;
```

### With Bullets

```jsx
import { Carousel, Bullets, SwipeSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const MyComponent = (props) => (
    <Carousel className={ Style.container } isInfinite isRTL itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <SwipeSlider className={ Style.slider } disableSwipe hasKeysNavigation>
            <div className={ Style.customItem }>Item 1</div>
            <div className={ Style.moreCustomItem }>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </SwipeSlider>
        
        <Bullets theme={ BulletsTheme } />
    </Carousel>
);

export default MyComponent;
```

### With Arrows

```jsx
import { Carousel, Bullets, SwipeSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const handleArrowClick = () => {
    console.log('Clicked on the arrow');
}

const MyComponent = (props) => (
    <Carousel className={ Style.container } isInfinite isRTL itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <SwipeSlider className={ Style.slider } disableSwipe hasKeysNavigation>
            <div className={ Style.customItem }>Item 1</div>
            <div className={ Style.moreCustomItem }>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </SwipeSlider>
        
        <Arrow flow={ "prev" } onClick={ handleArrowClick }>
            { ({ onClick }) => <button onClick={ onClick }>Previous</button> }
        </Arrow>
        
        <Arrow flow={ "next" } onClick={ handleArrowClick }>
            { ({ onClick }) => <button onClick={ onClick }>Next</button> }
        </Arrow>
    </Carousel>
);

export default MyComponent;
```

### Complex responsive Carousel

```jsx
import { ResponsiveConsumer } from '@farfetch/react-context-responsive';
import { Carousel, Bullets, SwipeSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const handleArrowClick = () => {
    console.log('Clicked on the arrow');
}
const ResponsiveCarousel = (props) => (
    const { children } = props;
    
    <Carousel className={ Style.container } itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <ResponsiveConsumer>
            { ({ lessThan }) => {
                lessThan.md ? (
                    <ScrollSlider className={ Style.slider }>
                        { children }
                    </SwipeSlider>
                ) : 
                (
                    <SwipeSlider className={ Style.slider } disableSwipe hasKeysNavigation>
                        { children }
                    </SwipeSlider>
                )
            } }
        </ResponsiveConsumer>
        
        <Bullets theme={ BulletsTheme } />
        
        <Arrow flow={ "prev" } onClick={ handleArrowClick }>
            { ({ onClick }) => <button onClick={ onClick }>Previous</button> }
        </Arrow>
        
        <Arrow flow={ "next" } onClick={ handleArrowClick }>
            { ({ onClick }) => <button onClick={ onClick }>Next</button> }
        </Arrow>
    </Carousel>
);

export default ResponsiveCarousel;
```

### With custom component

```jsx
import { Carousel, CarouselContext, Bullets, SwipeSlider } from '@farfetch/react-carousel';

const handleAfterChange = (e) => {
    console.log(e.index);
    console.log(e.dir);
};

const handleArrowClick = () => {
    console.log('Clicked on the arrow');
}

const Pagination = (props) => {
    <CarouselContext.Consumer>
        { ({ activeItem, itemsLength }) => <div>{ activeItem } of { itemsLength } items</div> }
    </CarouselContext.Consumer>
}

const MyComponent = (props) => (
    <Carousel className={ Style.container } isInfinite isRTL itemsToShow={ 2 } onAfterChange={ handleAfterChange }>
        <SwipeSlider className={ Style.slider } disableSwipe hasKeysNavigation>
            <div className={ Style.customItem }>Item 1</div>
            <div className={ Style.moreCustomItem }>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </SwipeSlider>
        
        <Pagination />
        
        <Arrow flow={ "prev" } onClick={ handleArrowClick }>
            { ({ onClick }) => <button onClick={ onClick }>Previous</button> }
        </Arrow>
        
        <Arrow flow={ "next" } onClick={ handleArrowClick }>
            { ({ onClick }) => <button onClick={ onClick }>Next</button> }
        </Arrow>
    </Carousel>
);

export default MyComponent;
```

## Components

The available components for the Carousel are:

### <a name="Carousel"></a>Carousel

The wrapper for the entire Carousel, it creates a wrapping `<div>` and an implementation of the [`CarouselProvider`](#CarouselProvider).

#### Properties

| Name              | Type   | Default | Description                                                                                                                                                          |
|-------------------|--------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| className         | String |         | Desired theme's class names                                                                                                                                          |
| children          | Node   |         | The components to construct the carousel                                                                                                                             |
| isInfinite        | Bool   | false   | Enables the behaviour to go back to the start/end in the carousel edges                                                                                              |
| isRTL             | Bool   | false   | Sets the carousel in RTL mode                                                                                                                                        |
| itemsToShow       | Number | 1       | Number of visible items in the carousel                                                                                                                              |
| onAfterChange     | Func   |         | Callback when changing the active item. Callback object: { index: Number - The new active index, dir: String - The movement direction ('prev' or 'next') } |
| itemsToScroll             | Number   | 1   | The number of items to scroll when using [`Arrow`](#Arrow)      |

It also accepts additional props to be passed to the container.

### <a name="CarouselContext"></a>CarouselContext

A React Context for the [`Carousel`](#Carousel), following the Context API.

#### Context object

| Name              | Type   | Description                                                                                                                                            |
|-------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| activeItem        | Number | The active carousel item index (0 based)                                                         |
| isRTL             | Bool   | Is the carousel in RTL mode                                                                                                                            |
| isInfinite        | Bool   | Is the carousel in infinite mode                                                                                                                       |
| itemsToShow       | Number | Number of visible items in the carousel                                                                                                                |
| itemsLength       | Number | Total items length in the carousel                                                                                                                     |
| setItemsLength    | Func   | Setter for the itemsLength value. Arguments: (itemsLength: Number - The new items length)                                                              |
| goTo              | Func   | Move the carousel to an specific index. Arguments: (newIndex: Number - The new active item, options: Object - To be passed the onAfterChange callback) |
| goNext            | Func   | Move to the next item, if possible. Arguments: (options: Object - To be passed the onAfterChange callback)                                             |
| goPrev            | Func   | Move to the previous item, if possible. Arguments: (options: Object - To be passed the onAfterChange callback)                                         |
| containerRef | Object | Component reference that can be used throughout the Carousel from the context |


### <a name="CarouselProvider"></a>CarouselProvider

A provider for the [`CarouselContext`](#CarouselContext), already handling all the business logic and the state management for the Carousel.

#### Properties

| Name              | Type   | Default | Description                                                                                                                                                          |
|-------------------|--------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| isInfinite        | Bool   | false   | Enables the behaviour to go back to the start/end in the carousel edges                                                                                              |
| children          | Node   |         | Children to have the context available                                                                                                                               |
| isRTL             | Bool   | false   | Sets the carousel in RTL mode                                                                                                                                        |
| itemsToShow       | Number | 1       | Number of visible items in the carousel                                                                                                                              |
| onAfterChange     | Func   |         | Callback for after the change of the active item. Callback object: { index: Number - The new active index, dir: String - The movement direction ('prev' or 'next') } |
| startItem         | Number | 0 | Force to display a item by index

### <a name="Arrow"></a>Arrow

A render prop component that returns the onClick function, based on the props.

#### Properties

| Name              | Type   | Default | Description                                                                                                  |
|-------------------|--------|---------|--------------------------------------------------------------------------------------------------------------|
| flow              | String |         | The movement flow for the arrow. Allowed values: "next" and "prev"                                           |
| children          | Node   |         | Function to render the component. Callback object: { onClick: Func - The onClick handler for the component } |
| onClick           | Func   |         | Callback for the onClick                                                                                     |

### <a name="Bullets"></a>Bullets

The pagination of the carousel, with infinite bullets support.

#### Properties

| Name              | Type   | Default | Description                                                                            |
|-------------------|--------|---------|----------------------------------------------------------------------------------------|
| theme             | Object |         | The theme object, as described below                                                   |

#### Theming

| Name              | Description |
|-------------------|-------------|
| container         |             |
| containerDefault  |             |
| containerInfinite |             |
| moveInfinite      |             |
| bullet            |             |
| bulletInfinite    |             |
| isSecondary       |             |
| isActive          |             |


### <a name="SwipeSlider"></a>SwipeSlider

A slider that uses Javascript swipe navigation and keyboard navigation.

#### Properties

| Name              | Type   | Default | Description                                                                            |
|-------------------|--------|---------|----------------------------------------------------------------------------------------|
| className         | String |         | Desired theme's class names                                                            |
| children          | Node   |         | The items for the carousel                                                             |
| disableSwipe      | Bool   | false   | Disables the swipe navigation                                                          |
| hasKeysNavigation | Bool   | true    | Enables the keyboard navigation for the carousel                                       |

#### Support for navigation components

The SwipeSlider has full support for all the navigation components.

### <a name="ScrollSlider"></a>ScrollSlider

A slider using native scroll navigation.  Variable-width items are **NOT** supported.

#### Properties

| Name        | Type                    | Default  | Description                                                                |
|-------------|-------------------------|----------|----------------------------------------------------------------------------|
| className   | String                  |          | Desired theme's class names                                                |
| children    | Node                    |          | The items for the carousel                                                 |
| limitScroll | Bool                    | false    | Limits the scroll depth to just one item (mobile only)                     |

#### Support for navigation components

The ScrollSlider works with the [`Arrow`](#Arrow) component using the `requestAnimationFrame`, to have a smooth scroll for the item. 

It also has support for the [`Bullets`](#Bullets).

### <a name="UnevenItemsScrollSlider"></a>UnevenItemsScrollSlider

A slider using native scroll navigation.  `itemsToScroll` are **NOT** supported.  Other [`Carousel`](#Carousel) props not supported include `itemsToShow`, and `isInfinite`.

#### Properties

| Name        | Type                    | Default  | Description                                                                |
|-------------|-------------------------|----------|----------------------------------------------------------------------------|
| className   | String                  |          | Desired theme's class names                                                |
| children    | Node                    |          | The items for the carousel                                                 |
| ratioToScroll | Number                    | 1    | Range ratioToScroll > 0 && ratioToScroll <= 1.  The percentage (in decimal form) of the carousel viewport to scroll when using [`Arrow`](#Arrow)                    |
| itemOnSizeChange    | Number                    |          | The item to go to when length of carousel changes.  If not specified, the carousel will remain where it is when resizing occurs                                                 |

#### Support for navigation components

The UnevenItemsScrollSlider works with the [`Arrow`](#Arrow) component using the `requestAnimationFrame`, to have a smooth scroll for the item. 

It also has support for [`Bullets`](#Bullets).

### <a name="SnapSlider"></a>SnapSlider

A slider using native scroll navigation, with snap points, on browsers with support. 

It fallback to the [`SwipeSlider`](#SwipeSlider) for browser with no support. 

**NOTE:** The Snap Points support can be laggy on Android and RTL mobile browsers. For those cases, prefer the [`SwipeSlider`](#SwipeSlider).

#### Properties

| Name           | Type                    | Default  | Description                                                                |
|----------------|-------------------------|----------|----------------------------------------------------------------------------|
| className      | String                  |          | Desired theme's class names                                                |
| children       | Node                    |          | The items for the carousel                                                 |
| limitScroll    | Bool                    | true     | Limits the scroll depth to just one item (mobile only)                     |


#### Support for navigation components

The ScrollSlider **doesn't** work with the [`Arrow`](#Arrow) component, due to snap point support.

It supports the [`Bullets`](#Bullets) component.

## Creating your own component

As the Carousel state is managed by a context, we can easily create new components extending the carousel logic.

Example: 

```jsx
import { CarouselContext } from '@farfetch/react-carousel';

const Pagination = (props) => {
    <CarouselContext.Consumer>
        { ({ activeItem, itemsLength }) => <div>{ activeItem } of { itemsLength } items</div> }
    </CarouselContext.Consumer>
}

export default Pagination;
```

You can easily consume any information from the [`CarouselContext.Consumer`](#CarouselContext) and also even create a new movement engine with a custom animation, for example, as all the functions are already exposed in the [`Context`](#CarouselContext).

## React compatibility

React >= `16.8.0` is required to use this package. 

## Contributing

Read the [Contributing guidelines](./docs/CONTRIBUTING.md)

### Disclaimer

By sending us your contributions, you are agreeing that your contribution is made subject to the terms of our [Contributor Ownership Statement](https://github.com/Farfetch/.github/blob/master/COS.md)

## Maintainers

* [dinospereira](https://github.com/dinospereira)
* [SoaresMG](https://github.com/SoaresMG)
* [sofiacteixeira](https://github.com/sofiacteixeira)
* [themariamarques](https://github.com/themariamarques)

## License

[MIT](./LICENSE) 
