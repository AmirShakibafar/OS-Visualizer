let isCancelled = false;
const setIsCancelled = () => {
    isCancelled = true;
}

const reSetIsCancelled = () => {
    isCancelled = false;
}

const readIsCancelled = () => {
    return isCancelled;
}

export {readIsCancelled, reSetIsCancelled, setIsCancelled};