let Global = {
    //url: "http://localhost:3000/",
    //url: "https://greenacorn.herokuapp.com/",
    url: "https://green-acorn-app.herokuapp.com/",


    //testing && production
    //urlEnvironment: "local",
    //urlEnvironment: "staging",
    urlEnvironment: "production",

    //urlArgyle: "https://argyle-api-dev.herokuapp.com", //local
    //urlArgyle: "https://argyle-api-dev.herokuapp.com", //staging
    urlArgyle: "https://api.roverpayapp.com", //production

    //merchantId: "5ddbe4b14d581e0017f78c46", //local
    //merchantId: "5ddbe4b14d581e0017f78c46", // staging
    merchantId: "5df7a89cbd23660017c29f1f", //production

    mobileWidth: 1024,
};

export function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

export default Global;