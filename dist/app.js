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
class WebBluetoothController {
    constructor(deviceName, serviceUUID, characteristicUUID) {
        this.deviceName = deviceName;
        this.serviceUUID = serviceUUID;
        this.characteristicUUID = characteristicUUID;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                try {
                    this.device = yield navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: [this.serviceUUID] });
                    this.connectionToServer = yield ((_b = (_a = this.device) === null || _a === void 0 ? void 0 : _a.gatt) === null || _b === void 0 ? void 0 : _b.connect());
                    this.service = yield ((_c = this.connectionToServer) === null || _c === void 0 ? void 0 : _c.getPrimaryService(this.serviceUUID));
                    this.characteristic = yield ((_d = this.service) === null || _d === void 0 ? void 0 : _d.getCharacteristic(this.characteristicUUID));
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    sendMessage(message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const value = Uint8Array.of(message);
            try {
                (_a = this.characteristic) === null || _a === void 0 ? void 0 : _a.writeValue(value);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
