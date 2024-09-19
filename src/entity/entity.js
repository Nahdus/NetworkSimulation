
/**
 
 */


/**
 * @callback setProperty
 * @param {string} propertyName - The name of the property to set.
 * @param {(string|object|function)} property - The value of the property, which can be a string, object, or function.
 * @returns {void}
 */

/**
 * @callback getProperty -gets a property
 * @param {string} propertyName -property name
 * @returns {(string|object|function)}
 * 
 */


/**
 * @typedef {Object} EntityType
 * @property {setProperty} Entity.setProperty -sets a property
 * @property {getProperty} Entity.getProperty
 * @property {function} Entity.getProperties -gets all properties
 * @property {Function} Entity.setUpdateFunction -sets update function
 * @property {Function} Entity.update -Manually run update function once
 */


/**
 * 
 * @returns {EntityType}
 * 
 */

const Entity = ()=>{
    let _property = {}
    let updateFunction
    /**
     * 
     * @param {string} propertyName 
     * @param {string} property 
     */
    const setProperty = (propertyName,property)=>{
        _property[propertyName] = property
    }
    const setUpdateFunction = (func)=>{
        updateFunction=func
    }
    const update=(delta)=>{
        updateFunction(delta)
    }
    const getProperties=()=>{
        return _property
    }
    const getProperty = (propertyName)=>{
        if (!(propertyName in _property)){
            throw `property ${propertyName} does not exist`
        }
        return _property[propertyName]
    }

    return{
        setProperty,
        getProperty,
        getProperties,
        setUpdateFunction,
        update
    }


}

export {Entity}