const { resolve } = require('path');
const glob = require('glob').sync;
const replace = require('replace-in-file');


// Glob options. Pass directory to search and files to ignore
// source directory where cached assets are located
const cwd = resolve(__dirname, 'build');
const ignore = ['sw.js'];
const siteUrl = '';

// Generate alphanumeric hash
const makeId = length => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

// Find all JS, CSS, and font files in rendered output
const addFiles = async () => {
    // create matched files array
    const files = glob('**/*.{png,ico,json,js,css,woff,woff2}', { cwd, ignore });
    const newFiles = files.map(toCache => `'/${toCache}'`).toString();

    console.log(files);
    console.log("..................");
    console.log(newFiles);

    // find and replace options; add hash ID, files to cache array, and site base URL
    const replaceOptions = {
        files: resolve(cwd, 'sw.js'),
        from: [
            /(const)\s(staticAssets)\s=\s?\[\];/g,
            /const\sversion\s=\s'';/g,
            /baseURL/g,
        ],
        to: [
            `const staticAssets = [${newFiles}];`,
            `const version = '${makeId(6)}';`,
            `${siteUrl}`,
        ],
    };

    // update sw.js in _public dir
    try {
        await replace(replaceOptions);
        // eslint-disable-next-line no-console
        console.info('SW updated.');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

addFiles();
