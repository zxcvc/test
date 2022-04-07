import { computed, defineComponent, onMounted, ref, Transition } from 'vue'
import { Picker, Popup, Field } from 'vant';
import { ItemData, QA } from '../type'
import './index.scss'
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
                                    <Field {...{
                                        modelValue: has_selected.value[index],
                                        isLink: true,
                                        readonly: true,
                                        center:true,
                                        onClick: () => { showPicker.value = true; col.value = item.A; i.value = index }
                                    }}>
                                    </Field>

                                </label>
                            </section>
                        )
                    })
                }
                <Transition {...{
                    enterActiveClass: 'animate__animated animate__slideInUp',
                    leaveActiveClass: 'animate__animated animate__slideOutDown'
                }}>
                    {completed.value && <div class='next' onClick={()=>ctx.emit('next')}>继续</div>}
                </Transition>

                <Popup  {...{
                    safeAreaInsetBottom: true,
                    duration: 0.3,
                    teleport: document.body,
                    round: false,
                    position: 'bottom',
                    show: showPicker.value,
                    "onUpdate:show": (v) => { showPicker.value = v; }
                }} >
                    <Picker {...{
                        columns: col.value,
                        onCancel: close,
                        onConfirm: get_confirm_handler(i.value),
                    }} />
                </Popup>
            </div>
        )
    }
})