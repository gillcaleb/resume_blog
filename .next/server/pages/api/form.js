"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/form";
exports.ids = ["pages/api/form"];
exports.modules = {

/***/ "(api)/./pages/api/form.js":
/*!***************************!*\
  !*** ./pages/api/form.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nfunction handler(req, res) {\n    // Get data submitted in request's body.\n    const body = req.body;\n    // Optional logging to see the responses\n    // in the command line where next.js app is running.\n    console.log(\"body: \", body);\n    // Guard clause checks for first and last name,\n    // and returns early if they are not found\n    if (!body.email) {\n        // Sends a HTTP bad request error code\n        return res.status(400).json({\n            data: \"Missing name, email, or mesage body\"\n        });\n    }\n    //This is where I do additional form validation and then process the request, i.e. send to a database or forward via email\n    res.status(200).json({\n        data: `${body.name}`\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZm9ybS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsU0FBU0EsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN0Qyx3Q0FBd0M7SUFDeEMsTUFBTUMsSUFBSSxHQUFHRixHQUFHLENBQUNFLElBQUk7SUFFckIsd0NBQXdDO0lBQ3hDLG9EQUFvRDtJQUNwREMsT0FBTyxDQUFDQyxHQUFHLENBQUMsUUFBUSxFQUFFRixJQUFJLENBQUM7SUFFM0IsK0NBQStDO0lBQy9DLDBDQUEwQztJQUMxQyxJQUFJLENBQUNBLElBQUksQ0FBQ0csS0FBSyxFQUFFO1FBQ2Ysc0NBQXNDO1FBQ3RDLE9BQU9KLEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsSUFBSSxFQUFFLHFDQUFxQztTQUFFLENBQUM7S0FDN0U7SUFFRCwwSEFBMEg7SUFFMUhQLEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7UUFBRUMsSUFBSSxFQUFFLENBQUMsRUFBRU4sSUFBSSxDQUFDTyxJQUFJLENBQUMsQ0FBQztLQUFFLENBQUM7Q0FDL0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvZm9ybS5qcz8xMTk1Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgICAvLyBHZXQgZGF0YSBzdWJtaXR0ZWQgaW4gcmVxdWVzdCdzIGJvZHkuXG4gICAgY29uc3QgYm9keSA9IHJlcS5ib2R5XG4gIFxuICAgIC8vIE9wdGlvbmFsIGxvZ2dpbmcgdG8gc2VlIHRoZSByZXNwb25zZXNcbiAgICAvLyBpbiB0aGUgY29tbWFuZCBsaW5lIHdoZXJlIG5leHQuanMgYXBwIGlzIHJ1bm5pbmcuXG4gICAgY29uc29sZS5sb2coJ2JvZHk6ICcsIGJvZHkpXG4gIFxuICAgIC8vIEd1YXJkIGNsYXVzZSBjaGVja3MgZm9yIGZpcnN0IGFuZCBsYXN0IG5hbWUsXG4gICAgLy8gYW5kIHJldHVybnMgZWFybHkgaWYgdGhleSBhcmUgbm90IGZvdW5kXG4gICAgaWYgKCFib2R5LmVtYWlsKSB7XG4gICAgICAvLyBTZW5kcyBhIEhUVFAgYmFkIHJlcXVlc3QgZXJyb3IgY29kZVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZGF0YTogJ01pc3NpbmcgbmFtZSwgZW1haWwsIG9yIG1lc2FnZSBib2R5JyB9KVxuICAgIH1cblxuICAgIC8vVGhpcyBpcyB3aGVyZSBJIGRvIGFkZGl0aW9uYWwgZm9ybSB2YWxpZGF0aW9uIGFuZCB0aGVuIHByb2Nlc3MgdGhlIHJlcXVlc3QsIGkuZS4gc2VuZCB0byBhIGRhdGFiYXNlIG9yIGZvcndhcmQgdmlhIGVtYWlsXG4gIFxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogYCR7Ym9keS5uYW1lfWAgfSlcbiAgfSJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwiYm9keSIsImNvbnNvbGUiLCJsb2ciLCJlbWFpbCIsInN0YXR1cyIsImpzb24iLCJkYXRhIiwibmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/form.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/form.js"));
module.exports = __webpack_exports__;

})();