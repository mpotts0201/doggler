export function createBlobUrl(blob, filename) {
    const URL = window.URL || window.webkitURL;
    let url = URL.createObjectURL(blob);
    return url;
}

export function openBlob(blob, fileName) {
    // console.log(`CREATING WINDOW for ${fileName}`);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        return window.navigator.msSaveOrOpenBlob(blob, fileName);
    }
    // Read blob.
    const URL = window.URL || window.webkitURL;
    let url = URL.createObjectURL(blob);
    // Create link.
    let a = document.createElement("a");
    // // Set link on DOM.
    document.body.appendChild(a);
    // // Set link's visibility.
    a.style = "display: none";
    // // Set href on link.
    a.href = url;

    a.target = "_self";
    // // Set file name on link.
    a.download = fileName;
    // Trigger click of link.
    // window.open(url);
    a.click();

    setTimeout(function () {
        a.remove();
        URL.revokeObjectURL(url);
    }, 5000);
}
