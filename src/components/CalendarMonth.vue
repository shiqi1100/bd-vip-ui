<template>
    <div class="calendar-year">
        <div class="calendar-year-hd">
            <el-row>
                <el-col :span="2" class="text-center cursor" @click.native="prev()">
                  <bn-icon-arrow-left />
                </el-col>
                <el-col :span="20" class="calendar-year-hd__bd text-center" v-text="title"></el-col>
                <el-col :span="2" class="text-center cursor" @click.native="next()">
                  <bn-icon-arrow-right />
                </el-col>
            </el-row>
        </div>
        <div class="calendar-year-bd">
            <!-- 月 -->
            <div class="calendar-year-bd__month" v-show="choice == 'month'">
                <el-row>
                    <!-- 选中-年月 -->
                    <el-col :span="column == 0 ? 2 : column" v-for="n in 12" :key="n" @click.native="changeMonth(n)" class="text-center cursor" :class="{'active':date.choice.full == (year.start+'-'+n)}">
                    <span v-text="n+'月'"></span>
                    </el-col>
                </el-row>
            </div>
            <!-- 年 -->
            <div class="calendar-year-bd__year" v-show="choice == 'year'">
                <ul>
                    <li v-for="n in arr" :key="n" @click="changeYear(yearStr+n)" class="text-center cursor" :class="{'col-10':column == 0,'col-4': column == 4,'col-3': column == 3}">
                        <span v-text="yearStr+n+'年'"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
    export default {
        name: 'CalendarMonth',
        props: {
            column: {
                type: Number,
                default: 0
            },
            value: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data: () => ({
            arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            year: {
                start: '', //开始
                end: '' //结束
            },
            title: '',
            yearStr: '',
            choice: 'month',
            date: {
                now: {
                    year: '',
                    month: '',
                    full: ''
                },
                choice: {
                    year: '',
                    month: '',
                    full: ''
                }
            }
        }),
        computed: {
        },
        mounted() {
            //do something after mounting vue instance
            var myDate = moment(new Date());
            this.year.start = myDate.format('YYYY');
            this.date.now = {
                year: myDate.format('YYYY'),
                month: myDate.format('M'),
                full: myDate.format('YYYY') + '-' + myDate.format('M')
            };
            console.log('--mounted', _.toString(this.year.start));
            this.date.choice = _.cloneDeep(this.date.now);
            this.yearStr = this.substring(this.year.start);
            this.title = this.year.start + '年';
            this.$emit('input', this.date.choice);
            this.$emit('on-change', this.date.now);
        },
        methods: {
            changeType() {
                //切换年和月显示
                switch (this.choice) {
                    case 'month':
                        console.log('--changeType', _.toString(this.year.start));
                        this.yearStr = this.substring(this.year.start);
                        this.choice = 'year';
                        this.year.start = this.yearStr + '0';
                        this.year.end = this.yearStr + '9';
                        this.title = this.year.start + '年' + '-' + this.year.end + '年';
                        break;
                    case 'year':
                        this.choice = 'month';
                        this.year.end = '';
                        this.title = this.year.start + '年';
                        this.date.choice.year = this.year.start;
                        this.date.choice.full = this.date.choice.year + '-' + this.date.choice.month;
                        break;
                }
            },
            prev() {
                switch (this.choice) {
                    case 'month':
                        this.date.choice.year--;
                        this.year.start--;
                        this.date.choice.full = this.date.choice.year + '-' + this.date.choice.month;
                        this.title = this.year.start + '年';

                        this.changeMonth(this.date.choice.month);
                        break;
                    case 'year':
                        this.year.start = _.subtract(_.toNumber(this.year.start), 10);
                        this.year.end = _.subtract(_.toNumber(this.year.end), 10);
                        this.title = this.year.start + '年' + '-' + this.year.end + '年';
                        break;
                }

                this.yearStr = this.substring(this.year.start);
            },
            next() {
                switch (this.choice) {
                    case 'month':
                        this.date.choice.year++;
                        this.year.start++;
                        this.date.choice.full = this.date.choice.year + '-' + this.date.choice.month;
                        this.title = this.year.start + '年';
                        this.changeMonth(this.date.choice.month);
                        break;
                    case 'year':
                        this.year.start = _.add(_.toNumber(this.year.start), 10);
                        this.year.end = _.add(_.toNumber(this.year.end), 10);
                        this.title = this.year.start + '年' + '-' + this.year.end + '年';
                        break;
                }

                this.yearStr = this.substring(this.year.start);
            },
            changeYear(year) {
                //切回月
                this.choice = 'month';
                this.year.start = year;
                this.title = this.year.start + '年';
                this.date.choice.year = year;
                this.date.choice.full = this.date.choice.year + '-' + this.date.choice.month;
                console.log('--changeYear', _.toString(this.year.start));
                this.yearStr = this.substring(this.year.start);
                this.changeMonth(this.date.choice.month);
            },
            changeMonth(month) {
                this.date.choice.month = month;
                this.date.choice.full = this.date.choice.year + '-' + month;
                this.$emit('input', this.date.choice);
                this.$emit('on-change', this.date.choice);
            },
            substring(year) {
                console.log('substring', year);
                let yearStr = _.toString(year);
                if (yearStr.length > 0) {
                    return yearStr.substring(0, 3);
                }
                return '';
            }
        }
    };
</script>
<style lang="scss">
    .calendar-year {
        padding: 20px;
        .calendar-year-hd {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            .el-row > .el-col{
              display: flex;
              align-items: center;
              justify-content: center;
            }
        }
        .calendar-year-bd {}
        .calendar-year-bd__month,
        .calendar-year-bd__year {
            .text-center {
              cursor: pointer;
                &.active span {
                    display: inline-block;
                    background: #0056ff;
                    color: #FFF;
                    width: 40px;
                    border-radius: 10px;
                }
                height: 40px;
              text-align: center;
                line-height: 40px;
            }
        }
        .calendar-year-bd__year {
            li {
                display: inline-block;
            }
            li.col-10 {
                width: 10%;
            }
            li.col-4 {
                width: 25%;
            }
        }
    }
</style>
