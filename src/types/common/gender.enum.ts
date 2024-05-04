enum Gender {
    Unknow = 0,
    Male = 1,
    Female = 2,
}

const getGenderText = (value: Gender) => {
    switch (value) {
        case Gender.Unknow:
            return "-";
        case Gender.Male:
            return "男";
        case Gender.Female:
            return "女";

        default:
            return "-";
    }
};

export default Gender;
export { getGenderText };
