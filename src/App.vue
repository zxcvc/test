<script lang="ts">
import { defineComponent, ref, TransitionGroup, onMounted, computed, effect, reactive } from 'vue'
import data from './data.json'
import Item from './components/Item'
import type { ItemData } from './type'


export default defineComponent({
  components: { Item },
  setup() {
    const index = ref(0)
    const img_path = computed(() => index.value + '.jpg')
    const el = ref<HTMLElement | null>(null)
    function next(){
      let id = setTimeout(()=>{
        if (index.value >= data.length - 1) return
        ++index.value
        clearTimeout(id)
      },200)
    }
    effect(() => {
      document.body.style.backgroundImage = `url(${img_path.value})`
    })
    return { data: reactive(data) as Array<ItemData>, index, el, img_path,next }
  }
})
</script>

<template>
  <div>
    <TransitionGroup :appear="true" enter-active-class="animate__animated animate__fadeInUp" leave-from-class="animate__animated animate__fadeOutUp">
        <template v-for="(item, i) in data">
          <Item  v-if="i === index" :key="i" :data="item" :index="index" @next="next"></Item>
        </template>
    </TransitionGroup>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
