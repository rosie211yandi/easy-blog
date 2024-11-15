// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
// vite.config.ts  
import { defineConfig } from 'vite';  
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'  
  
// 导入 Vite 配置文件的类型定义（如果 Vite 官方没有直接提供，你可能需要自行定义或使用社区的类型定义）  
// 注意：通常不需要显式导入类型定义，因为 Vite 和它的插件会提供这些  
  
// 导出 Vite 配置  
export default defineConfig({  
  plugins: [vue(), AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],  
  // 你可以在这里添加更多的配置选项，TypeScript 会根据 defineConfig 的泛型参数来推断类型  
});