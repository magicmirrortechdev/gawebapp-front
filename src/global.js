let Global = {
    url: process.env.REACT_APP_URL,
    urlEnvironment: process.env.REACT_APP_URLENVIRONMENT,
    urlArgyle: process.env.REACT_APP_URLARGYLE,
    merchantId: process.env.REACT_APP_MERCHANTID,
    mobileWidth: 1024,
    version: "V 2.7.2"
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
