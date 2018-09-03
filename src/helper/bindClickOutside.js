function isVisible (elem) {
    return (
        !!elem &&
        !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
    );
};

export function bindClickOutside (element, callback) {
    const outsideClickListener = (event) => {
        if (!element.contains(event.target)) {
            if (isVisible(element)) {
                callback();
                removeClickListener();
            }
        }
    };

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    };

    document.addEventListener('click', outsideClickListener);
};
