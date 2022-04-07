<script lang="ts">
import { defineComponent, ref, TransitionGroup, onMounted, computed, effect, reactive, Fragment, AudioHTMLAttributes } from 'vue'
import data from './data.json'
import Item from './components/Item'
import type { ItemData } from './type'
import { platform } from 'os'


export default defineComponent({
  name: 'App',
  components: { Item },
  setup() {
    const index = ref(0)
    const img_path = computed(() => data[index.value].image)
    const el = ref<HTMLElement | null>(null)
    const music = ref<string | undefined>()
    const audio_el = ref<AudioHTMLAttributes | null>(null)

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
    function play(src: string) {
      if(playing) return 
      const audio = new Audio(src)
      audio.addEventListener("canplaythrough", event => {
        audio.play();
        playing = true
      })
      audio.addEventListener('ended',()=>{
        playing = false
      })
    }

    effect(() => {
      document.body.style.backgroundImage = `url(${img_path.value})`
    })
    return { data: reactive(data) as Array<ItemData>, index, el, img_path, next, music, play }
  }
})
</script>

<template>
  <div id="audio-wraper">
    <audio :src="music"></audio>
  </div>
  <TransitionGroup
    :appear="true"
    enter-active-class="animate__animated animate__fadeInUp"
    leave-from-class="animate__animated animate__fadeOutUp"
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
