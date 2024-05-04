/*=====================================
    Global util 

    Author: Gray
    CreateTime: 2024 / 05 / 04
=====================================*/

/**
 * 延遲
 * @param delay
 */
const pureTimeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
};

/**
 * 取得元素在畫面上的絕對位置
 * @param element
 */
const cumulativeOffset = (element: HTMLElement | Element) => {
    if (!element) {
        return undefined;
    }

    let rect = element.getBoundingClientRect();
    let sx = -(window.scrollX ? window.scrollX : window.pageXOffset);
    let sy = -(window.scrollY ? window.scrollY : window.pageYOffset);

    return {
        top: rect.top - sy,
        left: rect.left - sx,
    };
};

export {
    pureTimeout, // 延遲
    cumulativeOffset, // 取得元素在畫面上的絕對位置
};
