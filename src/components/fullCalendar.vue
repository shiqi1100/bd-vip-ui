<template>
    <div class="bd-full-calendar">
        <ul class="bd-full-calendar__header clearfix">
            <li v-for="item in week"
                :key="item"
                v-text="'星期'+item"></li>
        </ul>
        <ul class="bd-full-calendar__body clearfix">
            <li v-for="(item,index) in days"
                :key="index">
                <span class="bd-full-calendar__body-day"
                    v-text="item.day"></span>
                <div class="bd-full-calendar__body-content">
                    <!-- 打卡记录 -->
                    <div class="bd-full-calendar-attend">
                        <div class="bd-full-calendar-attend__body"
                            v-if="item.data.length > 0">
                            <div v-for="(el,ox) in item.data"
                                :key="ox"
                                class="bd-full-calendar-attend__item">
                                <el-popover ref="popover1"
                                    placement="top-start"
                                    title=""
                                    width="260"
                                    trigger="hover">
                                    <div class="bd-full-calendar-attend-item__wrap"
                                        slot="reference">
                                      {{el.signinTime}}
                                        <span v-show="el.signinTime">
                                            {{moment(el.signinTime).format('HH:mm')}}
                                        </span>
                                        <span :style="{'color': signinType(el.signinTypeCd).color}"
                                            v-if="item.isWork > -1">
                                            {{signinType(el.signinTypeCd).text}}
                                        </span>
                                    </div>
                                    <div class="el-popover-attend-content-wrap"
                                        v-show="el.signinTime">
                                        <div class="el-popover-attend-content">
                                            <div class="text-center pxy el-popover-attend-content__teminal">
                                                <Icon size="60"
                                                    type="iphone"
                                                    v-if="el.terminalType == 'MOBILE'"></Icon>
                                                <Icon size="48"
                                                    type="android-desktop"
                                                    v-else-if="el.terminalType == 'WEB'"></Icon>
                                            </div>
                                            <blockquote class="text-muted fs-12 m-t-0 m-b-sm"
                                                v-show="el.signinAddr"
                                                v-text="el.signinAddr">
                                            </blockquote>
                                            <div class="el-popover-attend-content-text"
                                                v-if="el.terminalType == 'MOBILE'">
                                                <blockquote v-if="el.wifiName != null && el.wifiName != ''"
                                                    class="text-muted text-left fs-12 m-t-0 m-b-sm"
                                                    v-text="'WIFI名称：'+el.wifiName">
                                                </blockquote>
                                                <img v-if="el.demonstrateImg != null && el.demonstrateImg != ''"
                                                    :src="el.demonstrateImgUrl"
                                                    class="img-responsive">
                                            </div>
                                            <div class="el-popover-attend-content-text"
                                                v-else-if="el.terminalType == 'WEB'">
                                                <p v-text="el.signinIp"></p>
                                            </div>
                                            <div class="p-x p-y-sm text-center bg-primary text-white"
                                                v-text="moment(el.signinTime).format('YYYY/MM/DD HH:mm:ss')">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="el-popover-attend-content-wrap text-center"
                                        v-show="!el.signinTime">
                                        未签到
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                        <!-- <div class="bd-full-calendar-attend__body" v-if="item.isWork > -1">
                            <div class="bd-full-calendar-attend__item" :style="{'color': 'red'}">
                                {{item.unData}}
                            </div>
                        </div> -->
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import _ from 'lodash'
import moment from "moment";
    export default {
        name: 'calendar',
        components: {},
        props: {
            i18n: {
                type: String,
                'default': 'zh-cn'
            },
            time: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            data: { //考勤记录
                type: Object,
                default: function _default() {
                    return {};
                }
            },
            workday: { //考勤工作日
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data: () => ({
            I18N: {
                'zh-cn': ['一', '二', '三', '四', '五', '六', '日'],
                'en': ['SUN', 'MON', 'TUN', 'WED', 'THU', 'FRI', 'SAT']
            },
            days: []
        }),
        created() {
            this.inited();
        },
        mounted() {},
        watch: {
            '$route': 'inited', // 如果路由有变化，会再次执行该方法,
            time(val, oldval) {
                // let time = val.year + '/' + val.month
                // console.log('full time', val, time, Date.parse(new Date(val.year + '-' + val.month + '-01 00:00:00')))
                if (val == oldval) {
                    this.cloneDays(new Date(val.year + '/' + val.month + '/01 00:00:00'));
                    // this.cloneDays(new Date(time))
                }
            },
            data(data, olddata) {
                console.log('data', data);

                if (data == olddata) {
                    return;
                }
                // this.cloneDays(new Date(this.time.year + '/' + this.time.month))

                this.cloneDays(new Date(this.time.year + '/' + this.time.month + '/01 00:00:00'));
                this.eachDay(data);
            },
            workday() {
                // this.cloneDays(new Date(this.time.year + '/' + this.time.month))
                this.cloneDays(new Date(this.time.year + '/' + this.time.month + '/01 00:00:00'));
                this.eachDay(this.data);
            }
        },
        computed: {
            week() {
                return this.I18N[this.i18n];
            }
        },
        methods: {
            inited() {
                this.cloneDays(new Date());
            },
            eachDay(data) {
              console.log(data, '167')
                let A = [];
                _.each(this.days, function (item) {
                    let m = _.cloneDeep(item);
                    m.day = m.day < 10 ? '0' + m.day : m.day;
                    for (let key in data) {
                        console.log('key', m.day, key);
                        // 有签到的遍历进去
                        if (m.day == key) {
                            m.data = data[key];
                        }
                    }
                    A.push(m);
                    // console.log('this.days', item, i)
                });
                _.each(A, (item, i) => {
                    console.log('AA', item, i);
                    if (!item.day) {
                        return;
                    }

                    //当月 不会所有天数都显示 当天截止
                    //不同年， 年份大
                    if (this.time.year > Number(moment().format('YYYY'))) {
                        return;
                    }
                    // 同年
                    if ((this.time.year + '-' + this.time.month) == moment().format('YYYY-M')) {
                        // 月大
                        if (this.time.month > Number(moment().format('M'))) {
                            return;
                        }
                        // 日大
                        if (Number(moment().format('DD')) <= item.day) {
                            return;
                        }
                    }
                    if (item.data.length == 0) {
                        // 2次没打卡
                        item.data = [
                        {
                            signinTypeCd: 0
                        },
                        {
                            signinTypeCd: 0
                        }];
                    } else if (item.data.length == 1) {
                        // item.unData = '未打卡';
                        item.data.push({
                            signinTypeCd: 0
                        });
                    }
                });
                this.days = A;
                console.log('this.days', this.days);
            },
            cloneDays(time) {
                this.days = _.cloneDeep(this.getDays(time));
            },
            getDays(time) {
                var _this = this;

                function is_leap(year) {
                    return year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0);
                } //是否为闰年
                let days = [];
                let today = time;

                let year = today.getFullYear(); //本年
                let month = today.getMonth() + 1; //本月
                // let day = today.getDate()
                //本月第一天是星期几（距星期日离开的天数）
                let startDay = new Date(year, month - 1, 1).getDay() - 1;
                if (startDay == -1) {
                    startDay += 7;
                }
                let mDays = [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                //各月份的总天数

                let trStr = Math.ceil((mDays[month - 1] + startDay) / 7); //表格所需要行数
                // console.log('startDay', year, month, day, startDay, new Date(year, month - 1, 1).getDay())
                //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
                let nDays = new Date(year, month, 0).getDate();
                let week = 0;
                for (let i = 0; i < (trStr * 7); i++) {
                    let day;
                    week++;
                    week = week > 7 ? 1 : week;
                    if (i + 1 > startDay && i < nDays + startDay) {
                        day = (i - startDay) + 1;
                    }
                    days.push({
                        week,
                        isWork: _.indexOf(_this.workday, String(week)),
                        day,
                        data: []
                    });
                }
              console.log(days)
                return days;
            },

            signinType(type) {
                // console.log('signinType', type);
                switch (type) {
                    case '1':
                        return {
                            color: '#48b0f7',
                            text: '正常'
                        };
                    case '2':
                        return {
                            color: '#f55753',
                            text: '迟到'
                        };
                    case '3':
                        return {
                            color: 'blue',
                            text: '签退'
                        };
                    case '4':
                        return {
                            color: '#f8d053',
                            text: '早退'
                        };
                    case '9':
                        return {
                            color: '#dedede',
                            text: '未签到'
                        };
                    default:
                        return {
                            color: '#dedede',
                            text: '未签到'
                        };
                }
            }
        }
    };
</script>

<style lang="scss">
    .bd-full-calendar {
        padding: 2rem;
    }

    .bd-full-calendar__body,
    .bd-full-calendar__header {
        list-style-type: none;

        li {
            width: calc(100%/7);
            list-style-type: none;
            float: left;
            text-align: center;
            height: 40px;
            line-height: 40px;
            position: relative;
            margin-top: -1px;
            margin-left: -1px;
            border: 1px solid #eee;
        }
    }

    .bd-full-calendar__header {
        li {
            background: #fefefe;
        }
    }

    .bd-full-calendar__body {
        li {
            height: 100px;
        }

        .bd-full-calendar__body-day {
            width: 20px;
            height: 20px;
            line-height: 20px;
            position: absolute;
            right: 0;
            top: 0;
            text-align: center;
        }
    }

    .bd-full-calendar-attend {
        width: 100%;
        height: 100%;

        .bd-full-calendar-attend__body {
            position: absolute;
            left: 0;
            bottom: 0;
        }

        .bd-full-calendar-attend__item {
            height: 26px;
            line-height: 26px;
            text-align: left;
            padding: 0 4px;
            cursor: pointer;
        }

        .bd-full-calendar-attend__icon {
            vertical-align: -2px;
            text-align: center;
            width: 20px;
            height: 26px;
            display: inline-block;
        }
    }

    .el-popover-attend-content {
        .el-popover-attend-content__teminal {}

        blockquote {
            padding: 0 0 0 18px;
            border-left: 0
        }

        blockquote:before {
            content: '';
            font-family: FontAwesome;
            content: "\f10d";
            margin-right: 13px;
            float: left
        }

        blockquote p {
            font-size: 16px
        }
    }
</style>
