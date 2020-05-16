class WebBluetoothController {
  deviceName: string;
  serviceUUID: BluetoothServiceUUID;
  characteristicUUID: BluetoothCharacteristicUUID;

  characteristic: BluetoothRemoteGATTCharacteristic | undefined;
  device: BluetoothDevice | undefined;
  connectionToServer: BluetoothRemoteGATTServer | undefined;
  service: BluetoothRemoteGATTService | undefined;

  constructor(deviceName: string, serviceUUID: BluetoothServiceUUID, characteristicUUID: BluetoothCharacteristicUUID) {
    this.deviceName = deviceName;
    this.serviceUUID = serviceUUID;
    this.characteristicUUID = characteristicUUID;
  }

  async init() {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        this.device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: [this.serviceUUID] });
        this.connectionToServer = await this.device?.gatt?.connect();
        this.service = await this.connectionToServer?.getPrimaryService(this.serviceUUID);
        this.characteristic = await this.service?.getCharacteristic(this.characteristicUUID);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  async sendMessage(message: number) {
    const value = Uint8Array.of(message);
    try {
      this.characteristic?.writeValue(value);
    } catch (err) {
      console.error(err);
    }
  }
}