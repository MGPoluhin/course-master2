export const getConfig = (element, selector) => {
    const attribute = selector.substring(1, selector.length - 1)
    const attributeValue = element.getAttribute(attribute)
    let json = {}

    try {
        json = JSON.parse(attributeValue)
    } catch (error) {
        console.debug(error)
    }

    return json
}