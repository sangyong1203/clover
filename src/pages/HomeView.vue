<template>
    <main>
        <!-- <FileDragUpload
            width="100%"
            height="100%"
            ref="uplaodFileRef"
            division="fota"
            :size="20000000"
            @onUpload="onUpload"
        /> -->
        <input type="file" id="fileInput" />
        <pre id="output"></pre>
    </main>
</template>
<script lang="ts" setup>
import { FileDragUpload } from '@/components'
import { onMounted } from 'vue'
import { read, utils } from 'xlsx'
onMounted(() => {
    document.getElementById('fileInput').addEventListener('change', event => {
        const file = event.target.files[0]
        const reader = new FileReader()
        console.log('file', file)
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result)
            const workbook = read(data, { type: 'array' })

            // Assuming the first sheet
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]

            // Convert the sheet to JSON
            const jsonData = utils.sheet_to_json(worksheet)
            console.log('jsonData', jsonData)

            document.getElementById('output').textContent = JSON.stringify(
                jsonData,
                null,
                2,
            )
        }

        reader.readAsArrayBuffer(file)
    })
})

// const reader = new FileReader()
function onUpload(file: any) {
    // console.log('file', file)
    // let raw = file[0].raw
    // const data = new Uint8Array(raw)
    // const workbook = read(data, { type: 'array' })
    // // Assuming the first sheet
    // const firstSheetName = workbook.SheetNames[0]
    // const worksheet = workbook.Sheets[firstSheetName]
    // // Convert the sheet to JSON
    // const jsonData = utils.sheet_to_json(worksheet)
    // console.log('jsonData', jsonData)
    // document.getElementById('output').textContent = JSON.stringify(
    //     jsonData,
    //     null,
    //     2,
    // )
    // reader.readAsArrayBuffer(raw)
}
</script>
