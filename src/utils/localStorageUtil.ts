/*=====================================
    LocalStorage

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/

/*--------------------------
    Methods
--------------------------*/
const getItemJSON = (key: string) => {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem(key);
};

const setItem = (key: string, value: any) => {
    if (typeof window === "undefined") {
        return;
    }

    if (typeof value === "string") {
        localStorage.setItem(key, value);
    } else {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }
};

const removeItem = (key: string) => {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(key);
};

const getItem = <T>(key: string, initialValue: T) => {
    const json = getItemJSON(key);

    if (!json) {
        return initialValue;
    }

    try {
        const result = JSON.parse(json);

        return result as T;
    } catch (e) {
        // json error
    }

    return initialValue;
};

const LocalStorageUtil = {
    getItemJSON,
    setItem,
    removeItem,
    getItem,
};

export default LocalStorageUtil;
