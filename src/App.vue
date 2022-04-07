<script lang="ts">
import { defineComponent, ref, TransitionGroup, onMounted, computed, effect, reactive, Fragment, AudioHTMLAttributes } from 'vue'
import data from '../public/data.json'
import Item from './components/Item'
import type { ItemData } from './type'

export default defineComponent({
  name: 'App',
  components: { Item },
  setup() {
    const index = ref(0)
    const img_path = computed(() => data[index.value].image)
    const el = ref<HTMLElement | null>(null)
    const music = ref<string | undefined>()
    function next(n: number = -1) {
      console.log(n)
      if (n !== -1) {
        index.value = n
        return
      }
      let id = setTimeout(() => {
        if (index.value >= data.length - 1) return
        ++index.value
        clearTimeout(id)
      }, 200)
    }
    let playing = false
    const music_src = computed(()=>data[index.value].music)
    const audio = ref<HTMLAudioElement|null>(null)
    function play(src: string) {
      if(playing) return 
      audio.value?.addEventListener('canplaythrough',()=>{
        audio.value?.play()
        playing = true
      })
      audio.value?.addEventListener('ended',()=>{
        playing = false
      })
    }

    effect(() => {
      document.body.style.backgroundImage = `url(${img_path.value})`
    })
    return { data: reactive(data) as Array<ItemData>, index, el, img_path, next, music_src, play }
  }
})
</script>

<template>
<audio :src="music_src" ref="audio"></audio>
  <TransitionGroup
    :appear="true"
    enter-active-class="animate__animated animate__fadeIn"
    leave-from-class="animate__animated animate__fadeOut"
  >
    <template v-for="(item, i) in data">
      <Item v-if="i === index" :key="i" :data="item" :index="index" @next="next" @play="play"></Item>
    </template>
  </TransitionGroup>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
