/*=====================================
    與抽獎相關的共用 method

    隨機姓名參考:
        https://github.com/cfsghost/fake-data-generator-taiwan
        > 將權重隨機姓名的隨機判斷做調整

    Author: Gray
    CreateTime: 2024 / 05 / 03
=====================================*/
import FirstNameData from "../data/firstNameData.json";
import LastNameData from "../data/lastNameData.json";
import Gender from "../types/common/gender.enum";
import DrawUserInfo from "../types/data/draw/drawUserInfo.interface";
import { v4 as uuidv4 } from "uuid";

/*--------------------------
    Variable
--------------------------*/
type NamePoolItem = {
    startNum: number;
    endNum: number;
    value: string;
};

let FirstNameMaxNum: number;
let LastNameMaxNum: number;
const FirstNameProbability: NamePoolItem[] = [];
const LastNameProbability: NamePoolItem[] = [];

/*--------------------------
    Private Methods
--------------------------*/
/**
 * 初始化 姓名資料表
 */
const _initNameData = () => {
    const genNamePoolItemList = (data: { [name: string]: number }, list: NamePoolItem[]) => {
        let start = 1;

        Object.entries(data).forEach(([name, weight]) => {
            const item = {
                startNum: start,
                endNum: start + weight,
                value: name,
            };
            list.push(item);

            start = item.endNum + 1;
        });

        const total = start - 1;
        return total;
    };

    FirstNameMaxNum = genNamePoolItemList(FirstNameData, FirstNameProbability);
    LastNameMaxNum = genNamePoolItemList(LastNameData, LastNameProbability);
};

/**
 * 依照傳入的數值，從 pool 找到對應文字
 * @param checkNum (須為整數)
 * @param pool
 * @param start
 * @param end
 */
const _findTextFromPool = (
    checkNum: number,
    pool: NamePoolItem[],
    start?: number,
    end?: number
): string => {
    if (start === undefined || end === undefined) {
        start = 0;
        end = pool.length - 1;
        return _findTextFromPool(checkNum, pool, start, end);
    }

    const mid = Math.floor((start + end) / 2);
    const item = pool[mid];

    if (checkNum >= item.startNum && checkNum <= item.endNum) {
        return item.value;
    } else if (checkNum <= item.startNum) {
        return _findTextFromPool(checkNum, pool, start, mid - 1);
    } else {
        return _findTextFromPool(checkNum, pool, mid + 1, end);
    }
};

/**
 * 取得隨機的名字
 */
const _getRandomFirstName = () => {
    const check = Math.floor(Math.random() * FirstNameMaxNum + 1);
    return _findTextFromPool(check, FirstNameProbability);
};

/**
 * 取得隨機的姓
 */
const _getRandomLastName = () => {
    const check = Math.floor(Math.random() * LastNameMaxNum + 1);
    return _findTextFromPool(check, LastNameProbability);
};

/*--------------------------
    Methods
--------------------------*/
/**
 * 取得隨機的姓名
 * 95% 為三字, 5% 為二字
 */
const getRandomName = () => {
    const firstNameCheck = Math.floor(Math.random() * 100) + 1;
    const count = firstNameCheck >= 95 ? 1 : 2;

    let result = _getRandomLastName();

    for (let i = 0; i < count; i++) {
        result += _getRandomFirstName();
    }

    return result;
};

/**
 * 取得隨機的抽獎人
 */
const getRandomDrawUser = () => {
    const user: DrawUserInfo = {
        id: uuidv4(),
        name: getRandomName(),
        age: Math.floor(Math.random() * 82 + 18), // 抽獎對象 18 ~ 100 歲
        gender: Math.floor(Math.random() * 2) === 1 ? Gender.Male : Gender.Female,
    };

    return user;
};

/*--------------------------
    Init
--------------------------*/
_initNameData();

/*--------------------------
    Export
--------------------------*/
export {
    getRandomName, // 取得隨機的姓名
    getRandomDrawUser, // 取得隨機的抽獎人
};
