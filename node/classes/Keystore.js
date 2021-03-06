"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var utils_1 = require("../utils");
var pollenium_ilex_1 = require("pollenium-ilex");
var keythereum_1 = __importDefault(require("keythereum"));
var file_saver_1 = __importDefault(require("file-saver"));
var Keystore = /** @class */ (function () {
    function Keystore(keystorePojo) {
        this.keystorePojo = keystorePojo;
        this.nickname = keystorePojo.nickname ? keystorePojo.nickname : null;
        this.address = pollenium_buttercup_1.Address.fromHexish(keystorePojo.address);
    }
    Keystore.prototype.getName = function () {
        return this.nickname ?
            this.nickname + " - " + this.address.getPhex()
            : this.address.getPhex();
    };
    Keystore.prototype.getFileName = function () {
        if (this.nickname) {
            return "Watsonia Login File - " + this.nickname + ".txt";
        }
        else {
            return 'Watsonia Login File';
        }
    };
    Keystore.prototype.getBlob = function () {
        return new Blob([JSON.stringify(this.keystorePojo, null, 2)], { type: "text/plain;charset=utf-8" });
    };
    Keystore.prototype.download = function () {
        file_saver_1["default"].saveAs(this.getBlob(), this.getFileName());
    };
    Keystore.prototype.fetchKeypair = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var privateKeyUint8Array;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            keythereum_1["default"].recover(password, _this.keystorePojo, resolve);
                        })];
                    case 1:
                        privateKeyUint8Array = _a.sent();
                        return [2 /*return*/, new pollenium_ilex_1.Keypair(new pollenium_buttercup_1.Bytes32(privateKeyUint8Array))];
                }
            });
        });
    };
    Keystore.fromFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var keystoreJson, keystorePojo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.fetchFileText(file)];
                    case 1:
                        keystoreJson = _a.sent();
                        keystorePojo = JSON.parse(keystoreJson);
                        return [2 /*return*/, new Keystore(keystorePojo)];
                }
            });
        });
    };
    Keystore.generate = function (struct) {
        return __awaiter(this, void 0, void 0, function () {
            var dk, keystorePojo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            keythereum_1["default"].create(null, resolve);
                        })];
                    case 1:
                        dk = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                keythereum_1["default"].dump(struct.password, dk.privateKey, dk.salt, dk.iv, null, resolve);
                            })];
                    case 2:
                        keystorePojo = _a.sent();
                        if (struct.nickname) {
                            keystorePojo.nickname = struct.nickname;
                        }
                        return [2 /*return*/, new Keystore(keystorePojo)];
                }
            });
        });
    };
    return Keystore;
}());
exports.Keystore = Keystore;
