import { computed, defineComponent, onMounted, ref, Transition } from 'vue'
import {Select,Option,RadioGroup,Radio} from '@varlet/ui'
import '@varlet/ui/es/radio-group/style/index.js'
import '@varlet/ui/es/radio/style/index.js'
import './index.scss'

import { ItemData, QA } from '../type'

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        },
        index: { type: Number, required: true }
    },
    emits:['next'],
    setup(props, ctx) {
        const p = props.data as unknown as ItemData
        const title = p.title
        const qa = p.QA
        const el = ref<HTMLElement | null>(null)
        onMounted(() => {
            el.value?.addEventListener('click', e => {
                e.stopPropagation()
            })
        })
        const _has_selected = new Array(qa.length).fill('')
        const has_selected = ref(_has_selected)
        const completed = computed(() => has_selected.value.every(item => item !== ''))
        let showPicker = ref(false)
        const col = ref<Array<string>>([])
        const i = ref<number>(0)
        function close() {
            showPicker.value = false
        }
        function get_confirm_handler(index: number) {
            console.log(index)
            return function (v: string) {
                has_selected.value[index] = v;
                showPicker.value = false
            }
        }
        function next(){
            ctx.emit('next')
        }
        return () => (
            <div class='page'>
                {
                    title.map((item, index) => (
                        <h2 key={index}>{item}</h2>
                    ))
                }

                {
                    qa.map((item, index) => {
                        return (
                            <section key={index}>
                                <label>
                                    <h3>{item.Q}</h3>
                                    <RadioGroup {...{
                                        modelValue:item.result,
                                        'onUpdate:modelValue':(value)=>{
                                            item.result = value
                                            next()
                                        }
                                    }}>
                                        {item.A.map((it,i)=>(
                                            <Radio checkedValue={it} key={i}>{it}</Radio>  
                                        ))}
                                    </RadioGroup>
                                </label>
                            </section>
                        )
                    })
                }
            </div>
        )
    }
})