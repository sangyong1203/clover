<template>
    <div id="grid" ref="gridRef" style="width:100%;flex: 1; overflow: hidden; display: flex;" ></div>

</template>
<script setup lang="ts">
// https://nhn.github.io/tui.grid/latest/Grid#getRow  모든 tui-grid의 event, function, 속성에 대한 설명, 클릭하여 참고 하시면 됩니다. 

import { onMounted, onBeforeUnmount, ref } from 'vue'
import Grid from 'tui-grid';
import type { OptColumn, OptComplexColumnInfo, OptRowHeader } from 'tui-grid/types/options';
import dayjs from 'dayjs'

interface Props {
    columns: OptColumn[] // 컬럼 설정
    complexColumns?: OptComplexColumnInfo[]
    cell?:any // cell 설정
    language?:string // localization 언어 종류
    placeholder?:string // no-data 데이터 없을시 나타나는 문자
    presetName?: 'default'| 'striped' | 'clean' // tui-grid에 재공하는 3가지 table 양식 종류
    width?:number // table width
    headerAlign?: 'left' | 'center' | 'right'
    rowHeight?:number // row height
    rowHeaders?: OptRowHeader[] // 첫번째 컬럼 No 배열 번호 사용 여뷰
    headerHeight?:number // header height
    rowSize?:number // 한 페이지에 데이터 행 수 
    // resizable?:boolean
    disabled?: boolean
    multiple?: boolean
}
const props = withDefaults(defineProps<Props>(),{
    multiple: true
}) 
const gridRef:any = ref(null)
const grid = ref<Grid>()
const tableData:any = ref([]) // emits에 사용되는 tableData
const emits = defineEmits([
    'afterChange', 
    'afterFilter', 
    'afterUnfilter', 
    'beforeSort',
    'afterSort', 
    'beforeChange', 
    'beforeFilter',
    'check',
    'checkAll',
    'uncheck',
    'uncheckAll',
    'onCheck',
    'click',
    'dblclick',
    'row-click',
    'drag',
    'dragStart',
    'drop',
    'editingFinish',
    'editingStart',
    'focusChange',
    'mousedown',
    'mouseout',
    'mouseover',
    'scrollEnd',
])
let checkedRows:any[] = []// 체크한 row

const onEnter = (row:any) => (event:any)=>{
    if(event.key === 'Enter'){
        if(row.id){
            const values = {
                id: event.changes[0].rowKey,
                columName: event.changes[0].columnName.replace(/([A-Z])/g, '_$1').toLowerCase(),
                columValue: event.changes[0].value,
            }
            emits('afterChange', values, event)
        }
        document.removeEventListener('keyup', onEnter)
    }
}
// Grid table의 각 이벤트 설정
const setTableEvent = () => {
    grid.value?.on('afterChange', (event:any) => {
        const row:any = grid.value?.getRow(event.changes[0].rowKey)
        document.addEventListener('keyup', onEnter(row))
        if(row.id){
            const values = {
                id: event.changes[0].rowKey,
                columName: event.changes[0].columnName.replace(/([A-Z])/g, '_$1').toLowerCase(),
                columValue: event.changes[0].value,
            }
            emits('afterChange', values, event)
        }
    })
    grid.value?.on('afterFilter', (event:any) => {
        emits('afterFilter', event)
    })
    grid.value?.on('afterUnfilter', (event:any) => {
        emits('afterUnfilter', event)
    })
    grid.value?.on('beforeSort', (event:any) => {
        emits('beforeSort', event)
    })
    grid.value?.on('afterSort', (event:any) => {
        emits('afterSort', event)
    })
    grid.value?.on('beforeChange', (event:any) => {
        emits('beforeChange', event)
    })
    grid.value?.on('beforeFilter', (event:any) => {
        emits('beforeFilter', event)
    })
    grid.value?.on('check', (event:any) => {
        const value = grid.value?.getRow(event.rowKey)
        emits('check', value, true)

        // onCheck emit 이벤트 사용시
        checkedRows.push(value)
        console.log('checkedRows', checkedRows)
        emits('onCheck', checkedRows)
    })
    grid.value?.on('checkAll', (event:any) => {
        emits('checkAll', tableData.value, true)

        // onCheck emit 이벤트 사용시
        checkedRows = [...tableData.value]
        emits('onCheck', checkedRows)
    })
    grid.value?.on('uncheck', (event:any) => {
        const values:any = grid.value?.getRow(event.rowKey)
        emits('check', values, false)

        // onCheck emit 이벤트 사용시
        const foundIndex =checkedRows.findIndex( item => item.id === values.id)
        checkedRows.splice(foundIndex, 1)
        emits('onCheck', checkedRows)
    })
    grid.value?.on('uncheckAll', (event:any) => {
        emits('checkAll', [], false)

        // onCheck emit 이벤트 사용시
        checkedRows = []
        emits('onCheck', [])
    })

    grid.value?.on('click', (event:any) => {
        if(tableData.value.length === 0 || event.targetType === 'etc') return
        if(event.columnName !== '_checked' && event.targetType !== 'columnHeader'){
            const values = grid.value?.getRow(event.rowKey)
            // emit row value
            emits('row-click', values, event)
        }

    })
    // grid.value?.on('dblclick', (event:any) => {
    //     emits('dblclick', event)
    // })
    grid.value?.on('dblclick', (event:any) => {
        emits('dblclick', event)
    })
    grid.value?.on('drag', (event:any) => {
        emits('drag', event)
    })
    grid.value?.on('dragStart', (event:any) => {
        emits('dragStart', event)
    })
    grid.value?.on('drop', (event:any) => {
        emits('drop', event)
    })
    grid.value?.on('editingFinish', (event:any) => {
        emits('editingFinish', event)
    })
    grid.value?.on('editingStart', (event:any) => {
        emits('editingStart', event)
    })
    grid.value?.on('focusChange', (event:any) => {
        emits('focusChange', event)
    })
    grid.value?.on('mousedown', (event:any) => {
        emits('mousedown', event)
    })
    grid.value?.on('mouseout', (event:any) => {
        emits('mouseout', event)
    })
    grid.value?.on('mouseover', (event:any) => {
        emits('mouseover', event)
    })
    grid.value?.on('scrollEnd', (event:any) => {
        emits('scrollEnd', event)
    })
}
const cellTheme:any = {
    outline:{
        showVerticalBorder: true
    },
    normal:{
        showVerticalBorder: false,
        showHorizontalBorder:true
    },
    header:{
        showVerticalBorder: true,
        showHorizontalBorder:true
    },
}
// Table 높이 설정
const setBodyHeight = () =>{
   const elBody =  document.querySelector('.tui-grid-container')
   const elHeader =  document.querySelector('.tui-grid-header-area')
   let elHeaderHeight = elHeader?.clientHeight??40
   let elBodyHeight = elBody?.clientHeight?? 500
   let bodyHeight = elBodyHeight - elHeaderHeight - 2
   grid.value?.setBodyHeight(bodyHeight)
}

// grid table 생성
const createGrid = () => {
    Grid.applyTheme(props.presetName??'clean', 
        {
            cell:props.cell??cellTheme,

        }
    )
    // Grid.setLanguage(props.language??'ko',  { display: { noData: props.placeholder }})
    Grid.setLanguage(props.language??'ko')
    grid.value = new Grid({
      el: gridRef.value, 
      scrollX: false,
      scrollY: true,
      rowHeight: props.rowHeight??50,
      rowHeaders: props.rowHeaders??[],
      width:props.width??'auto',
      columnOptions: {
        // resizable: props.resizable??true
        resizable : true
      },
      header: {
        height: props.headerHeight??50,
        align: props.headerAlign??'center',
        complexColumns: props.complexColumns
      },
      pageOptions: {
        perPage: props.rowSize
      },
      columns: props.columns,
    })
    setTableEvent()
    setBodyHeight()
}

// Grid Object 제거
const destroyGrid = () => {
    grid.value?.destroy()
}

// Table 데이터 설정
const setTableData = (data:any) => {
    console.log('setTableData', data)
    data.forEach( (item:any) => {
        if(item.createDate) item.createDate = item.createDate ? dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss') : ''
        if(item.updateDate) item.updateDate = item.updateDate ? dayjs(item.updateDate).format('YYYY-MM-DD HH:mm:ss') : ''
        if(item.stopDate) item.stopDate = item.stopDate ? dayjs(item.stopDate).format('YYYY-MM-DD HH:mm:ss') : ''
        if(item.stopDate) item.stopDate = item.stopDate ? dayjs(item.stopDate).format('YYYY-MM-DD HH:mm:ss') : ''
        if(item.viewYn) item.viewYn = item.viewYn === 'Y' ? '노출' : '비노출'
    })
    grid.value?.clear()
    tableData.value = data
    grid.value?.resetData(tableData.value)
    // grid.value?.refreshLayout()
    
}

// Table 창크기 따라 크기 자동 조절
let resizeObserver: ResizeObserver | null = null;
const resize = () => {
    if (gridRef.value) {
        resizeObserver = new ResizeObserver(entries => {
            grid.value?.refreshLayout()
        })
        resizeObserver.observe(gridRef.value);
    }
}
// 생성한 Grid Instance 반환
const getGridInstance = ()=> {
    return grid.value
}
const initCheckedRows = () => {
    checkedRows = []
}
onMounted(()=>{
    createGrid()
    resize()
})
onBeforeUnmount(() => {
    // Clean up the observer
    if (resizeObserver && gridRef.value) {
        resizeObserver.unobserve(gridRef.value);
        resizeObserver.disconnect();
    }
    destroyGrid()
})
defineExpose({createGrid, destroyGrid, setTableData, getGridInstance, initCheckedRows})


</script>
<style lang="scss" scoped>
:deep(.tui-grid-body-container)::-webkit-scrollbar {
    width: 0px;
    height: 0%;
}
:deep(.tui-grid-body-container)::-webkit-scrollbar-thumb {
    border-radius: 6px;
    }
:deep(.tui-grid-body-container):hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.262);
}
:deep(.tui-pagination),
:deep(.tui-grid-clipboard){
    display: none;
}
:deep(.tui-grid-scrollbar-y-inner-border),
:deep(.tui-grid-scrollbar-y-outer-border){
    background-color:unset;
    
}
:deep(.tui-grid-header-area),
:deep(.tui-grid-table){
    background-color: var(--base-color--gray_light);
    border-color: var(--base-color--gray_light);
}
:deep(.tui-grid-cell-header),
:deep(.tui-grid-scrollbar-right-top){
    background-color: var(--base-color--gray_light);
    border-color: var(--base-color--gray_light);
}
:deep(.tui-grid-cell-row-header){
    border-bottom: 1px solid var(--base-color--gray_light);
}
:deep(.tui-grid-content-area){
    height: 100%;
}
:deep(.tui-grid-content-text){
    font-size: 18px;
    height: 80% !important;
}
:deep(.tui-grid-container p, .tui-grid-container input, .tui-grid-container textarea){
    font-size: 16px;
}


:deep(input[type="checkbox"]:checked){
  background-color: #000000 !important;
}
:deep(input[type="checkbox"]) {
    width: 13px;
    height: 13px;
    cursor: pointer;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    appearance: none;
    outline: none;
}
:deep(input[type="checkbox"]:checked::before) {
    content: '✔';
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 10px;
    width: 13px;
    height: 11px;
}
:deep(.tui-grid-row-header-checkbox){
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>