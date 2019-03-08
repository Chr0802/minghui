<template>
  <div class="page-header-index-wide">
      
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <!-- <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div> -->
          <a-tab-pane loading="true" tab="男女比例" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <stack-bar :data='genderData.part'/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <chart-card :loading="loading" title="总体男女比例" contentHeight="300px" :total="genderData.total?(genderData.total.filter(item=>item.gender==='男')[0].count+':'+genderData.total.filter(item=>item.gender==='女')[0].count):''">
                  <a-tooltip title="左侧柱状图为各部门的男女比例情况，右侧饼图为公司总体男女比例情况" slot="action">
                    <a-icon type="info-circle-o" />
                  </a-tooltip>
                  <div>
                    <pie :data='genderData.total'/>
                  </div>
                </chart-card>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="学历情况" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <stack-bar :data='degreeData.part'/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <chart-card :loading="loading" title="总体学历情况" contentHeight="300px" :total="''">
                  <a-tooltip title="左侧柱状图为各部门的学历情况，右侧饼图为公司总体学历情况" slot="action">
                    <a-icon type="info-circle-o" />
                  </a-tooltip>
                  <div>
                    <pie :data='degreeData.total'/>
                  </div>
                </chart-card>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="工龄分布" key="3">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <box :data='seniorityData.total'/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <chart-card :loading="loading" title="总体工龄分布" contentHeight="300px">
                  <a-tooltip title="左侧柱状图为各部门的工龄分布情况，右侧饼图为公司总体工龄分布情况" slot="action">
                    <a-icon type="info-circle-o" />
                  </a-tooltip>
                  <div>
                    <pie :data='seniorityData_p'/>
                  </div>
                </chart-card>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="系数分布" key="4">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <box :data='coefData.total'/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <chart-card :loading="loading" title="总体系数分布" contentHeight="300px">
                  <a-tooltip title="左侧柱状图为各部门的系数分布情况，右侧饼图为公司总体系数分布情况" slot="action">
                    <a-icon type="info-circle-o" />
                  </a-tooltip>
                  <div>
                    <pie :data='coefData_p'/>
                  </div>
                </chart-card>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <a-card :loading="loading":body-style="{padding: '0'}">
      <template slot='title'>
        <div class="extra-item">
          <span>统计对象：</span>
          <a-select :style="{width: '256px'}" v-model='statsObj'>
            <a-select-option value='all'>总体</a-select-option>
            <template v-for="dept in depts">
              <a-select-option :value='dept._id'>{{dept.name}}</a-select-option>
            </template>
          </a-select>
        </div>
       
      </template>
      <a-row :gutter="24">
        <!-- <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px',paddingTop: '12px'}">
          <chart-card :loading="loading" title="总销售额" total="￥126,560">
            <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <trend flag="up" style="margin-right: 16px;">
                <span slot="term">周同比</span>
                12%
              </trend>
              <trend flag="down">
                <span slot="term">日同比</span>
                11%
              </trend>
            </div>
            <template slot="footer">日均销售额<span>￥ 234.56</span></template>
          </chart-card>
        </a-col> -->
        <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '-60px',paddingTop: '0' }">
          <chart-card :loading="loading" title="工龄情况"contentHeight="200px" :total="employeeNum?employeeNum:0 | NumberFormat">
            <a-tooltip title="该部门员工工龄的直方图" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <histogram :data="seniorityData_s"/>
            </div>
          </chart-card>
        </a-col>
        
        <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '-60px',paddingTop: '0' }">
          <chart-card :loading="loading" title="系数分布"contentHeight="200px" :total="employeeNum?employeeNum:0 | NumberFormat">
            <a-tooltip title="该部门员工员工系数的直方图" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <histogram :data="coefData_s"/>
            </div>
          </chart-card>
        </a-col>
         
        <a-col :sm="24" :md="12" :xl="24" :style="{ marginBottom: '0',paddingTop: '0' }">
          <chart-card :loading="loading" title="入离职率" contentHeight="300px":total="employeeNum?employeeNum:0 | NumberFormat">
            <a-tooltip title="该部门入离职指标折线图" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <base-line :data="IOData_s"/>
            </div>
            <template slot="footer"></template>
          </chart-card>
        </a-col>
      </a-row>
    </a-card>
    
  </div>
</template>

<script>
import ChartCard from '@/components/ChartCard'
import ACol from 'ant-design-vue/es/grid/Col'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
import MiniArea from '@/components/chart/MiniArea'
import MiniBar from '@/components/chart/MiniBar'
import MiniProgress from '@/components/chart/MiniProgress'
import RankList from '@/components/chart/RankList'
import Bar from '@/components/chart/Bar'
import Trend from '@/components/Trend'
import pie from '@/components/chart/pie'
import StackBar from '@/components/chart/StackBar'
import histogram from '@/components/chart/histogram'
import point from '@/components/chart/point'
import baseLine from '@/components/chart/baseLine'
import box from '@/components/chart/box'
import {getGender,getDegree,getAge,getSeniority,getCoef,getIO} from '@/api/statistics'
import {getAllDept} from "@/api/dept"

const DataSet = require('@antv/data-set');
const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i+1) + ' 号店',
    total: 1234.56 - i * 100
  })
}
export default {
  name: 'Statistics',
  components: {
    ATooltip,
    ACol,
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    pie,
    StackBar,
    histogram,
    point,
    box,
    baseLine,
  },
  data() {
    return {
      loading: true,
      rankList:[],
      genderData:{},
      degreeData:{},
      seniorityData:{},
      coefData:{},
      IOData:{},
      coefData_s:[],
      coefData_p:[],
      seniorityData_s:[],
      seniorityData_p:[],
      IOData_s:[],
      statsObj:'all',
      depts:[],
      employeeNum:'',
    }
  },
  methods:{
    getGender,
    getDegree,
    getAge,
    getSeniority,
    getCoef,
    getAllDept,
    getIO,
    async initGender(){
      let rawData = await this.getGender()
      const dv = new DataSet.View().source(rawData.result)
      const dv1 = new DataSet.View().source(rawData.result)
      dv.transform({
        type: 'map',
        callback(row){
          row.x = row.dept.name
          row.y = row.gender
          return row
        }
      }).transform({
        type: 'aggregate',
        fields: ['_id'],
        operations: ['count'],
        as: ['count'],
        groupBy: ['x','y'] 
      }).transform({
        type: 'percent',
        field: 'count',
        dimension: 'y',
        groupBy: ['x'],
        as: 'percent',
      })
      dv1.transform({
        type: 'map',
        callback(row){
          row.item = row.gender
          return row
        }
      }).transform({
        type: 'aggregate',
        fields: ['_id'],
        operations: ['count'],
        as: ['count'],
        groupBy: ['item'] 
      }).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.genderData.raw = rawData
      this.genderData.part = dv.rows
      this.genderData.total = dv1.rows
      console.log(dv1)
    },
    async initDegree(){
      let rawData = await this.getDegree()
      const dv = new DataSet.View().source(rawData.result)
      const dv1 = new DataSet.View().source(rawData.result)
      dv.transform({
        type: 'map',
        callback(row){
          row.x = row.dept.name
          row.y = row.eduDegree
          return row
        }
      }).transform({
        type: 'aggregate',
        fields: ['_id'],
        operations: ['count'],
        as: ['count'],
        groupBy: ['x','y'] 
      }).transform({
        type: 'percent',
        field: 'count',
        dimension: 'y',
        groupBy: ['x'],
        as: 'percent',
      })
      dv1.transform({
        type: 'map',
        callback(row){
          row.item = row.eduDegree
          return row
        }
      }).transform({
        type: 'aggregate',
        fields: ['_id'],
        operations: ['count'],
        as: ['count'],
        groupBy: ['item'] 
      }).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.degreeData.raw = rawData
      this.degreeData.part = dv.rows
      this.degreeData.total = dv1.rows
      this.employeeNum = this.degreeData.raw.result.length//初始化小统计图数字
      console.log(dv1)
    },
    async initSeniority(){
      let rawData = await this.getSeniority()
      const dv = new DataSet.View().source(rawData.result)
      dv.transform({
        type: 'map',
        callback(row){
          row.x = row.dept.name
          row.y = row.seniority_value
          return row
        }
      }).transform({
        type: 'bin.quantile',
        field: 'y',    // 计算分为值的字段
        as: '_bin',    // 保存分为值的数组字段
        groupBy: ['x'],   // 分组
        fraction: 4,   // 可选，默认四分位
      }).transform({
        type: 'map',
        callback: (obj) => {
          obj.range = obj._bin;
          return obj;
        },
      })
      const dv1 = new DataSet.View().source(rawData.result);
      dv1.transform({
        type: 'bin.histogram',
        field: 'seniority_value',
        binWidth: 1,
        as: ['value', 'count'],
      });
      const dv2 = new DataSet.View().source(rawData.result);
      dv2.transform({
        type: 'map',
        callback(row){
          if(row.seniority_value < 0.5){
            row.item = '小于半年'
          }else if(row.seniority_value < 1){
            row.item = '半年到一年'
          }else if(row.seniority_value < 2){
            row.item = '一年到两年'
          }else if(row.seniority_value < 3){
            row.item = '两年到三年'
          }else if(row.seniority_value < 5){
            row.item = '三年到五年'
          }else if(row.seniority_value < 6){
            row.item = '五年到六年'
          }else{
            row.item = '六年以上'
          }
          return row
        }
      }).transform({
        type: 'aggregate',
        fields: ['_id'],
        operations: ['count'],
        as: ['count'],
        groupBy: ['item'] 
      }).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.seniorityData_p = dv2.rows
      this.seniorityData_s = dv1.rows
      this.seniorityData.raw = rawData
      this.seniorityData.total = dv.rows
    },
    async initCoef(){
      let rawData = await this.getCoef()
      const dv = new DataSet.View().source(rawData.result)
      dv.transform({
        type: 'map',
        callback(row){
          row.x = row.dept.name
          row.y = 1 * (row.coef.toFixed(2))
          return row
        }
      }).transform({
        type: 'bin.quantile',
        field: 'y',    // 计算分为值的字段
        as: '_bin',    // 保存分为值的数组字段
        groupBy: ['x'],   // 分组
        fraction: 4,   // 可选，默认四分位
      }).transform({
        type: 'map',
        callback: (obj) => {
          obj.range = obj._bin;
          return obj;
        },
      })
      const dv1 = new DataSet.View().source(rawData.result);
      dv1.transform({
        type: 'map',
        callback(row){
          row.y = 1 * (row.coef.toFixed(2))
          return row
        }
      }).transform({
        type: 'bin.histogram',
        field: 'y',
        binWidth: 0.5,
        as: ['value', 'count'],
      });
      const dv2 = new DataSet.View().source(rawData.result);
      dv2.transform({
        type: 'map',
        callback(row){
          if(row.coef < 3){
            row.item = '<3'
          }else if(row.coef < 6){
            row.item = '3~6'
          }else if(row.coef < 9){
            row.item = '6~9'
          }else if(row.coef < 12){
            row.item = '9~12'
          }else if(row.coef < 15){
            row.item = '12~15'
          }else if(row.coef < 30){
            row.item = '15~30'
          }else{
            row.item = '>30'
          }
          return row
        }
      }).transform({
        type: 'aggregate',
        fields: ['_id'],
        operations: ['count'],
        as: ['count'],
        groupBy: ['item'] 
      }).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.coefData_p = dv2.rows
      this.coefData.raw = rawData
      this.coefData.total = dv.rows
      this.coefData_s = dv1.rows
    },
    async initFold(){
      let rawData = await this.getIO()
      const dv = new DataSet.View().source(rawData.result.arr)
      dv.transform({
        type: 'map',
        callback(row){
          row.inRatio = 1*((row.inNum * row.deltaRatio) / row.count ).toFixed(4)
          row.outRatio = 1*((row.outNum * row.deltaRatio) / row.count ).toFixed(4)
          return row
        }
      }).transform({
        type: 'fold',
        fields: ['inRatio', 'outRatio'],
        key: 'item',
        value: 'value',
      });
      this.IOData.raw = rawData
      this.IOData.total = dv.rows
      this.IOData_s = dv.rows
    },
    changeDept(){
      console.log(this.statsObj)

      let dv1,dv2,dv3
      if(this.statsObj==='all'){
        this.employeeNum = this.degreeData.raw.result.length
        dv1 = new DataSet.View().source(this.seniorityData.raw.result);
        dv2 = new DataSet.View().source(this.coefData.raw.result);
        dv3 = new DataSet.View().source(this.IOData.raw.result.arr);
        console.log('all')
      }else {
        this.employeeNum = this.degreeData.raw.result.filter(item=>item.dept._id===this.statsObj).length
        let rawData1 = JSON.parse(JSON.stringify(this.seniorityData.raw.result)).filter(item=>item.dept._id===this.statsObj)
        let rawData2 = JSON.parse(JSON.stringify(this.coefData.raw.result)).filter(item=>item.dept._id===this.statsObj)
        let rawData3 = JSON.parse(JSON.stringify(this.IOData.raw.result))
        dv1 = new DataSet.View().source(rawData1)
        dv2 = new DataSet.View().source(rawData2)
        let deptCounter = rawData3.dept.filter(item=>item._id===this.statsObj)[0]?rawData3.dept.filter(item=>item._id===this.statsObj)[0].count:0
        console.log(deptCounter)
        let arr = JSON.parse(JSON.stringify(this.IOData.raw.result.arr_1))
        arr.map(item=>{
          item.inItems = item.inItems?item.inItems.filter(item=>item.dept._id===this.statsObj):[]
          item.inNum = item.inItems.length
          item.outItems = item.outItems?item.outItems.filter(item=>item.dept._id===this.statsObj):[]
          item.outNum = item.outItems.length
          item.count = deptCounter
          deptCounter = deptCounter-item.inNum+item.outNum
          item.deltaRatio = JSON.parse(JSON.stringify(item.count/deptCounter)) 
          // console.log(item,deptCounter)
          return item
        })
        arr.reverse()
        console.log(arr)
        dv3 = new DataSet.View().source(arr)
        // console.log(dv3,this.IOData.raw.result.arr_1)
      }
      dv1.transform({
        type: 'bin.histogram',
        field: 'seniority_value',
        binWidth: 1,
        as: ['value', 'count'],
      });
      this.seniorityData_s = dv1.rows
      dv2.transform({
        type: 'map',
        callback(row){
          row.y = 1 * (row.coef.toFixed(2))
          return row
        }
      }).transform({
        type: 'bin.histogram',
        field: 'y',
        binWidth: 0.5,
        as: ['value', 'count'],
      });
      this.coefData_s = dv2.rows
      dv3.transform({
        type: 'map',
        callback(row){
          row.inRatio = 1*((row.inNum * row.deltaRatio) / row.count ).toFixed(4)
          row.outRatio = 1*((row.outNum * row.deltaRatio) / row.count ).toFixed(4)
          return row
        }
      }).transform({
        type: 'fold',
        fields: ['inRatio', 'outRatio'],
        key: 'item',
        value: 'value',
      });
      this.IOData_s = dv3.rows
    }
  },
  watch:{
    'statsObj':'changeDept'
  },
  mounted(){
    this.initGender()
    this.initDegree()
    this.initSeniority()
    this.initCoef()
    this.initFold()
    this.getAllDept().then(res=>{
      let depts = res.result
      this.depts = depts.filter(dept=>(
        dept.sts === 1
      ))
      console.log(this.depts)
    })
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }
</style>