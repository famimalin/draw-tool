import Gender from "../../common/gender.enum";

interface DrawUserInfo {
    id: string;
    name: string;
    age: number;
    gender: Gender;
}

export default DrawUserInfo;
