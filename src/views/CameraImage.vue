<script setup lang="ts">
import { ref } from "vue";
import { Camera, Subscribe, setConfig } from 'kl-camera-frontend';
import { TransformImageData } from 'transform-image-data';
setConfig({
  async grabStart(camera: Camera) {
    console.log(`${camera.desc}: ${camera.grabType} grabStart...`);
    return true;
  },
  async grabStop(camera: Camera) {
    console.log(`${camera.desc}: grabStop...`);
    return false;
  },
  async startSubscribe(subscribe: Subscribe, cb: (imageData: ImageData) => void) {
    console.log(`${subscribe.camera.desc}/${subscribe.name}: startSubscribe...`);
    const { width: outw, height: outh } = subscribe;
    const outImageData = new ImageData(outw, outh);
    const transferImageData = new TransformImageData({
      inw,
      inh,
      inData,
      outw,
      outh,
      outData: outImageData.data.buffer,
    })
    transferImageData.inData.fill(4285295861)
    const uint8 = new Uint8Array(transferImageData.inData.buffer);
    function fill() {
      const { scale, dx, dy } = subscribe;
      transferImageData.updateMatrix(scale, dx, dy);
      uint8[2] =  ~~(255 * Math.random())
      for (let y = 0; y < inh; y++) {
        uint8[0] = ~~(255 / inh * y)
        transferImageData.inData.fill(transferImageData.inData[0], y * inw, (y + 1) * inw);
      }
      transferImageData.update();
      cb(outImageData);
      setTimeout(() => {
        subscribe.isSubscribed && fill();
      }, 100)
    }
    fill();
  },
  async stopSubscribe(subscribe: Subscribe) {
    console.log(`${subscribe.camera.desc}/${subscribe.name}: stopSubscribe...`);
  },
  async updateSubscribe(subscribe: Subscribe) {
    console.log(`${subscribe.name}/${subscribe.camera.desc}: updateSubscribe...`);
  },
  async destorySubscribe(subscribe: Subscribe) {
    console.log(`${subscribe.name}/${subscribe.camera.desc}: destorySubscribe...`);
  }
})

const camera = ref(new Camera({
  id: 1,
  name: '模拟相机',
  model: 'MODEL',
  sn: 'SN-TEST',
  width: 5120,
  height: 5120,
  channel: 3,
}))
const { width: inw, height: inh } = camera.value;
const inData = new ArrayBuffer(inw * inh * 4);
</script>
<template>
  <div class="shadow-block p20" style="height: 400px">
    <KLCameraImage :camera="camera">
      <template #footer>-</template>
    </KLCameraImage>
  </div>
</template>
