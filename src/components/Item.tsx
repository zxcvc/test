import { computed, defineComponent, onMounted, ref, Transition } from 'vue'
import {Select,Option,RadioGroup,Radio} from '@varlet/ui'
import '@varlet/ui/es/radio-group/style/index.js'
import '@varlet/ui/es/radio/style/index.js'
import './index.scss'

import { ItemData, QA } from '../type'

export default defineComponent({
    name:'Item',
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
                                            console.log(value)
                                            item.result = value
                                            next()
                                        }
                                    }}>
                                        {item.A.map((it,i)=>(
                                            <div key={i}>
                                                <Radio checkedValue={it}>{it}</Radio>  
                                            </div>
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