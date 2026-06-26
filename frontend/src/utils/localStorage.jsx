export function setItem(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.log(err);
    }
}

export function getItem(key, value) {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    } catch (err) {
        console.log(err);
    }
}