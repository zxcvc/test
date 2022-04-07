import { computed, defineComponent, onMounted, onUnmounted, ref, Transition } from 'vue'
import { Select, Option, RadioGroup, Radio,Button } from '@varlet/ui'
import '@varlet/ui/es/radio-group/style/index.js'
import '@varlet/ui/es/radio/style/index.js'
import '@varlet/ui/es/button/style/index.js'
import './index.scss'

import { ItemData, QA } from '../type'

export default defineComponent({
    name: 'Item',
    props: {
        data: {
            type: Object,
            required: true,
        },
        index: { type: Number, required: true }
    },
    emits: ['next','play'],
    setup(props, ctx) {
        const p = props.data as unknown as ItemData
        const title = p.title
        const qa = p.QA
        const content = p.content
        const tips = p.tips
        const nexts = p.nexts
        const music = p.music
        function next(n:number = -1) {
            ctx.emit('next',n)
        }
        const fn = ()=>next()
        onMounted(() => {
            if (!qa) {
                document.body.addEventListener('click', fn)
            }
        })
        onUnmounted(() => {
            document.body.removeEventListener('click', fn)
        })

        return () => (
            <div class='page'>
                <div class="title">
                    {
                        title && title.map((item, index) => (
                            <h2 key={index}>{item}</h2>
                        ))
                    }
                </div>

                <div class="content">
                    {
                        content && content.map((item, index) => (
                            <h1 key={index}>{item}</h1>
                        ))
                    }
                </div>

                {
                    music && <div class='music'>

                    <Button type='info' onClick={ (e)=>{e.stopPropagation();ctx.emit('play',music)}}>播放</Button>
                    </div>
                }

                <div class="qa">
                    {
                        qa && (
                            <section>
                                <label>
                                    <h3>{qa.Q}</h3>
                                    <RadioGroup {...{
                                        modelValue: qa.result,
                                        'onUpdate:modelValue': (value) => {
                                            qa.result = value
                                            console.log(nexts)
                                            if(nexts){
                                                // document.body.addEventListener('click',fn)
                                                return
                                            }
                                            next()
                                        }
                                    }}>
                                        {qa.A.map((it, i) => (
                                            <div key={i}>
                                                <Radio checkedValue={it}>{it}</Radio>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </label>
                            </section>
                        )
                    }
                </div>

                <div class="nexts">
                    {
                        nexts && nexts.map((item,index)=>(
                            <a key={index} onClick={(e)=>{e.stopPropagation(); next(item.value); return false}}>{item.label}</a>
                        ))
                    }
                </div>

                <div class="tips">
                    {
                        tips && tips.map((item, index) => (
                            <footer key={index}>{item}</footer>
                        ))
                    }
                </div>

            </div>
        )
    }
})