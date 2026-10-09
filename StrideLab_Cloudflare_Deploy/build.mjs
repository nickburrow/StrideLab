import {mkdir,copyFile,writeFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
const out='dist'; const base=join(out,'stride-engine');
await mkdir(join(base,'wasm'),{recursive:true});
await copyFile('index.html',join(out,'index.html'));
const pkg='node_modules/@mediapipe/tasks-vision';
await copyFile(join(pkg,'vision_bundle.cjs'),join(base,'vision_bundle.js'));
for(const file of ['vision_wasm_internal.wasm','vision_wasm_internal.js','vision_wasm_nosimd_internal.wasm','vision_wasm_nosimd_internal.js']){
  await copyFile(join(pkg,'wasm',file),join(base,'wasm',file));
}
const modelUrl='https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
const response=await fetch(modelUrl);if(!response.ok)throw Error(`Model download failed: ${response.status}`);
await writeFile(join(base,'pose_landmarker_lite.task'),Buffer.from(await response.arrayBuffer()));
console.log('Built StrideLab with locally hosted MediaPipe JS, WASM and model.');
