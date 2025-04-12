"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDate = exports.createFoldersIfNotExist = void 0;
var fs = require("fs");
var createFoldersIfNotExist = function (folderPaths) {
    var e_1, _a;
    try {
        for (var folderPaths_1 = __values(folderPaths), folderPaths_1_1 = folderPaths_1.next(); !folderPaths_1_1.done; folderPaths_1_1 = folderPaths_1.next()) {
            var path = folderPaths_1_1.value;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
                console.log("Folder created at: ".concat(path));
            }
            else {
                console.log("Folder already exists at: ".concat(path));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (folderPaths_1_1 && !folderPaths_1_1.done && (_a = folderPaths_1.return)) _a.call(folderPaths_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
exports.createFoldersIfNotExist = createFoldersIfNotExist;
var setDate = function (day, month, year) {
    // Get ordinal suffix of day
    var getOrdinal = function (day) {
        var suffixes = ["th", "st", "nd", "rd"];
        var value = day % 100;
        return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    };
    return {
        day: day,
        ordinalDay: getOrdinal(day),
        month: month,
        year: year
    };
};
exports.setDate = setDate;
