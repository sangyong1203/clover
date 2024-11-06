<template>
    <main>
        <FileDragUpload
            width="100%"
            height="100%"
            ref="uplaodFileRef"
            division="fota"
            :size="20000000"
            @onUpload="onUpload"
        />
    </main>
</template>
<script lang="ts" setup>
import { FileDragUpload } from '@/components'

function onUpload(file: any) {
    console.log('file', file)
}
</script>
