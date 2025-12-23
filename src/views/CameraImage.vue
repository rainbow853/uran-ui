<script setup lang="ts">
import { ref } from "vue";
import { Camera, Subscribe, setConfig } from 'kl-camera-frontend';
import { TransformImageData } from 'transform-image-data';
import { ElMessageBox } from "element-plus";
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
      uint8[2] = ~~(255 * Math.random())
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
  },
  async grabImage(_0, _1) {
    return new ImageData(new Uint8ClampedArray(inData), inw, inh) as any;
  },
})

// 将 ImageData 转换为 Blob 并下载
function downloadImageData(imageData: ImageData, filename = 'image.png') {
  // 创建 canvas 临时元素
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 设置 canvas 尺寸与 ImageData 一致
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  // 将 ImageData 绘制到 canvas
  ctx?.putImageData(imageData, 0, 0);

  // 将 canvas 转换为 Blob
  canvas.toBlob((blob) => {
    if (!blob) return;

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // 触发下载
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 释放 URL 对象
    URL.revokeObjectURL(url);
  });
}

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
function grabImageSuccessCB(imageData: ImageData) {
  ElMessageBox.confirm(
    '采集图像已完成，是否下载图像？',
    '采集图像',
    {
      confirmButtonText: '确定',
      showCancelButton: false,
    }).then(() => downloadImageData(imageData))
}
</script>
<template>
  <div class="shadow-block p20" style="height: 600px">
    <KLCameraImage :camera="camera" :grabImageSuccessCB="grabImageSuccessCB">
    </KLCameraImage>
  </div>
</template>
