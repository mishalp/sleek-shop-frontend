const getFileData = async (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2) {
            resolve(reader.result)
        }
    }

    reader.onerror = () => reject()

    reader.readAsDataURL(file)
})

export default getFileData