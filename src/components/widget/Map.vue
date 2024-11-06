<template>
    <div class="konva" ref="konvaRef" >
        <!-- 컨트롤 버튼 -->
        <div class="control">
            <div class="control-btn" @click="zoomIn">
                <el-icon><Plus /></el-icon>
            </div>
            <div class="control-btn" @click="zoomOut">
                <el-icon><Minus /></el-icon>
            </div>
            <div class="control-btn">{{ Math.floor(zoomRate * 100) + '%' }}</div>
            <div class="control-btn" @click="initPosition">Fit</div>
        </div>
        <!-- X Y 좌표 -->
        <div class="xy-position">
            <div>x: {{ x }}</div>
            <div>y: {{ y }}</div>
        </div>
        <!-- 맵 -->
        <v-stage ref="stageRef" :config="stageConfig" >
            <v-layer ref="layerRef">
                <v-group ref="groupRef" :config="groupConfig">
                    <v-image ref="imageRef" :config="imageConfig"/>
                    <!-- 구역 -->
                    <v-group v-for="(item, key) in roomList" :key="key">
                        <v-line  :config="{
                            points: item.points,
                            fill: item.color,
                            stroke: 'gray',
                            strokeWidth: 1,
                            closed: true,
                        }" />
                    </v-group>
                    <v-group v-for="(item, key) in blockArea" :key="key">
                        <v-line  :config="{
                            points: item.points,
                            fill: '#ff000073',
                            stroke: '#ff000073',
                            strokeWidth: 1,
                            closed: true,
                        }" />
                    </v-group>
                    <v-group v-for="(item, key) in blockWall" :key="key">
                        <v-line  :config="{
                            points: item.points,
                            fill: 'yellow',
                            stroke: 'yellow',
                            strokeWidth: 2,
                            closed: true,
                        }" />
                    </v-group>
                    <!-- Air sensor -->
                    <v-group v-for="(item, key) in airSensors" :key="key">
                        <v-circle :config="{
                            x: item.x,
                            y: item.y,
                            fill: 'blue',
                            stroke: 'black',
                            strokeWidth: 1,
                            radius: 6,
                        }" />
                        <!-- <v-text :config="{
                            text: item.deviceName, 
                            fontSize: 6,
                            color: 'white'
                        }" /> -->
                    </v-group>
                    <!-- 구역 라벨 -->
                    <v-group v-for="(item, key) in roomList" :key="key">
                        <v-label :config="{
                                    x:item.centerPoint.x,
                                    y:item.centerPoint.y,
                                }">
                            <v-tag :config="{
                                    fill: '#5ADAC6',
                                    pointerDirection: 'left',
                                    pointerWidth: 6,
                                    pointerHeight: 8,
                                }"/>
                            <v-text
                                :config="{
                                    text: item.name,
                                    fontSize: 16,
                                    fill: 'black',
                                    padding: 4,
                                }"
                            />
                        </v-label>
                    </v-group>
                    
                    <!-- 오류코드 툴팁 -->
                    <!-- <v-group ref="groupToolTipRef" :config="{
                        x: getLocationX(-100), 
                        y: getLocationY(-100),
                        width:200,
                        height: 200,
                        fill: 'red'
                    }">
                        <v-rect :config="{
                            width:200,
                            height: 100,
                            fill: 'blue'
                        }" />
                        <v-text :config="{
                            text: `오류코드: ${errorCode}`, 
                            fontSize: 15,
                            color: 'white'
                        }" />
                    </v-group> -->
                    
                    <!-- 로봇 위치 -->
                    <!-- <v-circle :config="{
                        x: getLocationX(robotLocation.x),
                        y: getLocationY(robotLocation.y),
                        radius: 10,
                        fill: 'red',
                        stroke: 'black',
                        strokeWidth: 4,
                    }" />
                    -->

                    <!-- 중심점 -->
                    <v-text :config="{
                        text: '+',
                        fontSize: 20,
                        fill: 'red',
                        x: imgObj.width / 2 - 6,
                        y: imgObj.height / 2 - 8
                    }"/>
                </v-group>
            </v-layer>
        </v-stage>
    </div>
</template>
<script lang="ts" setup>
import { nextTick,  ref} from 'vue'

/**-------- 데이터 setting ----------**/ 
type DataType = {
    errorCode:string
    mapUrl: string
    origin: number[]
    resolution: number
    mapData: []
    area: {
        room_list : []
        info: any
        block_wall:[]
        block_area:[]
    }
}
type SensorType = {areaId:string, id:number, deviceName:string, serial:string, x: number, y:number}
const resolution = ref(0)
const origin = ref({x:0, y:0})
const robotLocation = ref({x:1, y:1})
const mapUrl = ref('')
const errorCode = ref('')
const roomList:any = ref([])
const blockWall:any = ref([])
const blockArea:any = ref([])
const airSensors:any = ref([])

/**-------- konva 맵 ----------**/ 
const imgObj = new window.Image()

const imageRef:any = ref(null)
const konvaRef:any = ref(null)
const stageRef:any = ref(null)
const layerRef:any = ref(null)
const groupRef:any = ref(null)

const imageConfig:any = ref(null)
const stageConfig:any = ref({ width:0, height:0 })
const groupConfig:any = ref(null)
const zoomRate: any = ref(1) // 확대율
const x = ref(0)
const y = ref(0)


const setData = (data:DataType) => {
    // console.log('setData ',data )
    errorCode.value = data.errorCode
    mapUrl.value = data.mapUrl
    resolution.value = data.resolution
    origin.value = {x:data.origin[0], y: data.origin[1]} 

    setMap()
    

    // room 데이터 설정-----
    roomList.value = setPoints(data.area.room_list)
    // block wall 데이터 설정-----
    blockWall.value = setPoints(data.area.block_wall)
    // block area 데이터 설정-----
    blockArea.value = setPoints(data.area.block_area)

    
}
// 맵 이미지 설정
function setMap(){
    // 이미지 설정
    imgObj.src = mapUrl.value

    imgObj.onload = () => {
        imageConfig.value = {
            image:imgObj,
            width:imgObj.width,
            height:imgObj.height
        }
        resizeDraw() // 화면크기 따라 map 조절
        eventSetting() // 맵 기능 이벤트 설정
    }
}
// air sensor 표시
const setAirSensor = (data:SensorType[]) => {
    airSensors.value = data
}
// 모양 그릴때 필요하느 x,y 좌표 데이터를 수자 array 형태로 바꿔줌 예:[2,100,13,22]
const setPoints = (data:any[]) =>{
    data.forEach( (wall:any) => {
        let points:any = []
        wall.image_path.forEach( (item:{x:string, y:string}) => {
            points.push(Number(item.x))
            points.push(Number(item.y))
        })
        wall.points = points
    })
    data.forEach((wall:any)=>{
        wall.centerPoint = calculateBlockCenter(wall.points)
    })
    return data
}
// room 구역의 중심을 계산 
const calculateBlockCenter = (points:[]) => {
  let xSum = 0;
  let ySum = 0;
  const numPoints = points.length / 2; // 각 점은 x, y로 이루어짐

  for (let i = 0; i < points.length; i += 2) {
    xSum += points[i];     // x 좌표
    ySum += points[i + 1]; // y 좌표
  }

  const centerX = Math.round(xSum / numPoints * 1000)/1000;
  const centerY = Math.round(ySum / numPoints * 1000)/1000;

  return { x: centerX, y: centerY };
}

// Table 창크기 따라 크기 자동 조절
function resizeDraw() {
    let resizeObserver: ResizeObserver | null = null;
    if (konvaRef.value) {
        resizeObserver = new ResizeObserver(() => {
            drawMap()
        })
        resizeObserver.observe(konvaRef.value)
    }
}
// 맴 그리기
function drawMap(){

    // stage 크기 설정
    stageConfig.value.width = konvaRef.value?.clientWidth
    stageConfig.value.height = konvaRef.value?.clientHeight

    // group를 중심 위치로 세팅
    groupConfig.value = {
        width: imgObj.width,
        height: imgObj.height,
        x: stageConfig.value.width * 0.5,
        y: stageConfig.value.height * 0.5,
        offsetX: imgObj.width * 0.5,
        offsetY: imgObj.height * 0.5,
        draggable: true
    }
}
// 각 마우스 이벤트 설정
function eventSetting() {
    const stageNode = stageRef.value.getNode()
    stageNode.on('mouseover', function () {
        document.body.style.cursor = 'crosshair'
    })
    stageNode.on('mouseout', function () {
        document.body.style.cursor = 'default'
    })
    stageNode.on('mousemove', function () {
        x.value = getPointerPositionX()
        y.value = getPointerPositionY()
    })
    stageNode.on('wheel', function (event: any) {
        let ev = event.evt.wheelDelta
        if (ev > 0) {
            zoomIn()
        } else {
            zoomOut()
        }
    })
    stageNode.on('mousedown', function (event: any) {
        event.target.preventDefault()
        document.body.style.cursor = 'grab'
    })
    stageNode.on('mouseup', function () {
        document.body.style.cursor = 'crosshair'
    })
}

// 포인트 position X
function getPointerPositionX(){
    const stageNode = stageRef.value.getNode()
    const p = stageNode.getPointerPosition()
    const groupNode = groupRef.value.getNode()
    const positionX = (p.x - groupNode.x()) / groupNode.scaleX()
    const x = Math.round(positionX * 1000)/1000;
    return Number(x)
}
// 포인트 position Y
function getPointerPositionY(){
    const stageNode = stageRef.value.getNode()
    const p = stageNode.getPointerPosition()
    const groupNode = groupRef.value.getNode()
    const positionY = (p.y - groupNode.y()) / groupNode.scaleY()
    const y = Math.round(positionY * 1000)/1000;
    return Number(y)
}

// 확대
function zoomIn() {
    const node = groupRef.value.getNode()
    node.scaleX(node.scaleX() * 1.1)
    node.scaleY(node.scaleY() * 1.1)
    zoomRate.value = node.scaleX()
}
// 축소
function zoomOut() {
    const node = groupRef.value.getNode()
    node.scaleX(node.scaleX() / 1.1)
    node.scaleY(node.scaleY() / 1.1)
    zoomRate.value = node.scaleX()
}
// 위치 초기화
function initPosition() {
    const node = groupRef.value.getNode()
    node.scaleX(1)
    node.scaleY(1)
    node.setX(stageConfig.value.width * 0.5)
    node.setY(stageConfig.value.height * 0.5)
    zoomRate.value = node.scaleX()
}

defineExpose({setData, setAirSensor})

</script>
<style lang="scss" scoped>
.konva{
    width: 100%; 
    height: 100%; 
    overflow: hidden; 
    position: relative;
}
.center-point{
    position: absolute; 
    top:50%; 
    left: 50%; 
    z-index: 100;
}

.control {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 100;
}
.control-btn {
    background: transparent;
    border-radius: 4px;
    border: 1px solid #000000be;
    height: 28px;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}
.control-btn:hover {
    cursor: pointer;
}
.xy-position {
    position: absolute;
    right: 4px;
    bottom: 4px;
    text-align: center;
    background: transparent;
    border-radius: 4px;
    padding: 4px;
    width: 100px;
    z-index: 100;
    border: 1px solid #000000be;
    // box-shadow: 0 0 3px 0px #bdbdbd;
    
}
</style>
