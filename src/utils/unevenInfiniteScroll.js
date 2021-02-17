import { animate } from '#utils';

export const isNodeVisible = (container, node, direction) => {
    if (!node || !container) {
        return;
    }

    const nodePosition = node.getBoundingClientRect().left;
    const offsetLeft = container.getBoundingClientRect().left;

    return direction === 'next'
        ? nodePosition - offsetLeft > node.offsetWidth * -1
        : nodePosition - offsetLeft < container.offsetWidth;
};

export const getTranslateValue = (node, translatePosition) => {
    if (!node || !translatePosition) {
        return;
    }

    const translationRegEx = new RegExp(
        `\\.*translate${translatePosition}\\((.*)(px|em|rem|%)\\)`,
        'i'
    );
    const translateValue = node.style.transform.match(translationRegEx);

    return translateValue ? parseInt(translateValue[1], 10) : 0;
};

export const getElementStyleValue = (element, styleValue) => {
    if (!window) {
        return;
    }

    const elementStyle =
        element.currentStyle || window.getComputedStyle(element);

    return (
        parseInt(elementStyle[styleValue].replace(/[a-z]|[A-Z]|%/g, '')) || 0
    );
};

export const getLastNodePosition = (
    wrapper,
    currentPosition,
    moveWidth,
    direction
) => {
    const firstItem = wrapper.firstElementChild;
    const lastItem = wrapper.lastElementChild;

    if (!firstItem || !lastItem) {
        return 0;
    }

    const firstItemPosition = lastItem.offsetWidth - firstItem.offsetLeft;
    const nodeMargin = getElementStyleValue(firstItem, 'marginRight') * 2;

    let elementPos =
        direction === 'next' ? currentPosition * -1 : currentPosition;
    elementPos += moveWidth;
    elementPos -= firstItemPosition;
    elementPos -= nodeMargin;

    return direction === 'next'
        ? lastItem.offsetLeft - elementPos
        : (lastItem.offsetLeft - elementPos) * -1;
};

const moveCarousel = (
    container,
    wrapper,
    ratioToScroll,
    direction,
    isRTL = false,
    customMoveWidth = null
) => {
    if (!container || !wrapper || !ratioToScroll || !direction) {
        return;
    }

    if (isRTL) {
        direction = direction === 'next' ? 'prev' : 'next';
    }

    const itemMoveWidth = !customMoveWidth
        ? Math.round(
              (wrapper.offsetWidth - container.offsetWidth) /
                  wrapper.childElementCount /
                  10
          )
        : Math.round(
              customMoveWidth * (customMoveWidth / wrapper.childElementCount)
          );

    const moveItem = () => {
        for (let index = 0; index < wrapper.childElementCount; index++) {
            const node = wrapper.childNodes[index];

            let nodeTransformValue = getTranslateValue(node, 'X');

            if (isNodeVisible(container, node, direction)) {
                nodeTransformValue =
                    direction === 'next'
                        ? nodeTransformValue - itemMoveWidth
                        : nodeTransformValue + itemMoveWidth;
            } else {
                nodeTransformValue = getLastNodePosition(
                    wrapper,
                    nodeTransformValue,
                    itemMoveWidth,
                    direction
                );
            }

            node.style.transform = `translateX(${nodeTransformValue}px)`;
        }
    };

    moveItem();

    if (!customMoveWidth) {
        animate({ progress: moveItem }, ratioToScroll);
    }
};

export default moveCarousel;
