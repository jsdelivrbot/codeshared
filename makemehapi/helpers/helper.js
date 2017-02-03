// All .js files in the helpers directory will be loaded and the file name will be used as the helper name.

// Each file must export a single method with the signature function(context) and return a string.
module.exports = (context) => {
    // Data passed to a view in hapi is available within the helper’s context object. Hapi saves the data in the context.data.root object. 
    return context.data.root.query.name + context.data.root.query.suffix;
}

