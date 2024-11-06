<template>
        <div ref="tuiEditerRef" id="editor" style="height: 100%; width: 100%;"></div>
</template>
<script lang="ts" setup>
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { ref, toRefs, onMounted, nextTick } from 'vue'
const editor:any = ref(null)
const tuiEditerRef:any = ref(null)

interface Props {
    content: string
}
const props = defineProps<Props>()
const { content } = toRefs(props)
onMounted(()=>{
    nextTick(()=>{
        editor.value = new Editor({
                el: tuiEditerRef.value,
                height: '300px',
                initialValue: content.value,
                initialEditType: 'wysiwyg',
                toolbarItems: [
                    ['heading', 'bold', 'italic', 'strike'],
                    ['ul', 'ol',  'indent', 'outdent'],
                    ['link'],
                ],
                hideModeSwitch: true
            })
    })
})
const getContent = () =>{
    return editor.value.getHTML()
}
defineExpose({getContent})
</script>