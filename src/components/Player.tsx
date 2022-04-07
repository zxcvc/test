import { computed, defineComponent, ref } from "vue";
import './Player.scss'
export default defineComponent({
    props: {
        src: { type: String, required: true }
    },
    setup(props, ctx) {
        const playing = ref(false)
        const icon = computed(() => playing.value ? '/a.svg' : '/b.svg')
        const audio = new Audio(props.src)
        audio.addEventListener('ended', e => {
            playing.value = false
        })
        audio.load()

        function play(e:Event) {
            e.stopPropagation()
            if (playing.value){
                audio.pause()
            }else{
                audio.play()
            }
            playing.value = !playing.value
        }

        return () => (
            <img {...{
                src: icon.value,
                onClick:play
            }} />
        )
    }
})