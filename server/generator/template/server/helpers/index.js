module.exports.copyFrom = function (source, destination) {
    for (var prop in source) {
        destination[prop] = source[prop];
    }
};