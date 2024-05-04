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

export {
    pureTimeout, // 延遲
};
