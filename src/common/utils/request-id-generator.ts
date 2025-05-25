export function generateRequestId() {
    const timestamp = Date.now();
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${timestamp}_${randomNumbers}`
}