

/**
 * @typedef {Object} data -person's Data
 * @property {string} favColor -person's fav color
 * @property {string} favFood -person's fav food
 */


/**
 * @typedef {Function} setName
 * @param {string} name
 * @returns {void}
 */

/**
 * @typedef {Function} setData
 * @param {data} data
 * @returns {void}
 */

/**
 * @typedef {Function} getName
 * @returns {string} -person name
 */


/**
 * @typedef {Object} PersonType
 * @property {setName} setName
 * @property {setData} setData
 * @property {getName} getName
 */


/**
 * @returns {PersonType}
 */
const Person = ()=>{
    let _name
    let _favColor
    let _favFood
    const setName=(name)=>{
        _name = name
    }
    const setData=(data)=>{
        _favColor = data["favColor"]
        _favFood = data["favFood"]
    }

    const getName=()=>{
        return _name
    }

    return {
        setName,
        setData,
        getName
    }
}

export {Person}