<template>
  <div class="calendar">
    <div class="calendar__header">
      <!-- 年份 月份 -->
      <div class="calendar__control" :class="{'calendar__control_center': centerHeader}">
        <div class="calendar__indicator">
          <span class="calendar__indicator-title">{{shownIndicator.title}}</span>
          <span class="calendar__indicator-detail"><span class="fs-24">{{shownIndicator.detail}}</span>月</span>
        </div>
      </div>
      <div class="calendar__action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="calendar__main">
      <div class="calendar__arrow left" @click="prevView">
        <bn-icon-arrow-left />
      </div>
      <div class="calendar__today" @click="goToday">
        今天
      </div>
      <div class="calendar__date">
        <!-- 星期 -->
        <div class="calendar__weekdays">
          <div v-for="(weekDay,index) in weekDays" :key="weekDay" class="calendar__weekday">{{weekDay}}</div>
        </div>
        <!-- 日期 -->
        <div class="calendar__days">
          <div class="calendar__day" v-for="(day,index) in days" :key="index"
               :class="{'calendar__day_now': checkToday(day), 'calendar__day_selected': checkSelected(day), 'calendar__day_othermonth': checkOtherMonth(day), 'calendar__day_decorate': checkDecorate(day)}"
               @click="select(day)">
            <span>{{day.getDate()}}<i class="sub" v-if="checkSub(day)" :style="{color: checkSub(day).color}">{{checkSub(day).content}}</i></span>
          </div>
        </div>
      </div>
      <div class="calendar__arrow right" @click="nextView">
        <bn-icon-arrow-right />
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'Calendar',
  props: {
    decorate: {
      type: Object,
      'default': function _default() {
        return {};
      }
    },
    choseDay: {
      type: Date,
      default: new Date()
    },
    sub: {
      type: Object,
      'default': function _default() {
        return {};
      }
    },
    i18n: {
      type: String,
      'default': 'zh-cn'
    },
    indicator: {
      type: Object,
      'default': function _default() {
        return {};
      }
    },
    startMonday: {
      type: Boolean,
      'default': false
    },
    view: {
      type: String,
      'default': 'month'
    },
    centerHeader: {
      type: Boolean,
      'default': true
    }
  },
  data() {
    return {
      I18N: {
        'zh-cn': ['日', '一', '二', '三', '四', '五', '六'],
        'en': ['SUN', 'MON', 'TUN', 'WED', 'THU', 'FRI', 'SAT']
      },
      startDate: new Date(),
      selectday: new Date(),
      currentView: {},
    };
  },
  computed: {
    shownIndicator: {
      get() {
        let indicator = {};
        if (this.indicator.title) {
          indicator.title = this.indicator.title;
        } else {
          indicator.title = moment(this.startDate).format('YYYY');
        }
        if (this.indicator.detail) {
          indicator.detail = moment(this.indicator.detail).format('MM');
        } else {
          indicator.detail = moment(this.startDate).format('MM');
        }
        return indicator;
      }
    },
    days: {
      get() {
        let days = [];
        let dayslength = void 0;
        let startDay = void 0;
        let leftPadding = void 0;
        let startDate = void 0;
        if (this.view === 'month') {
          dayslength = 35;
          startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth());
          startDay = startDate.getDay();
        } else {
          dayslength = 7;
          startDate = this.startDate;
          startDay = startDate.getDay();
        }
        if (this.startMonday) {
          leftPadding = startDay ? startDay - 1 : 6;
        } else {
          leftPadding = startDay;
        }
        Array.from({ length: leftPadding }, function (v, k) {
          return -(k + 1);
        }).reverse().forEach(function (minus) {
          days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + minus));
        });
        days.push(startDate);
        Array.from({ length: dayslength - days.length }, function (v, k) {
          return k + 1;
        }).forEach(function (plus) {
          days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + plus));
        });
        return days;
      }
    },
    weekDays: {
      get() {
        var weekDayNames = JSON.parse(JSON.stringify(this.I18N[this.i18n]));
        if (this.startMonday) {
          var sunday = weekDayNames.shift();
          weekDayNames.push(sunday);
        }
        return weekDayNames;
      }
    }
  },
  watch: {
    days() {
      this.currentView = {
        start: this.days[0],
        end: this.days[this.days.length - 1]
      };
    },
    startDate(value) {
      this.$emit('onchange', value);
    }
  },
  methods: {
    checkToday(day) {
      let now = new Date();
      return !!(day.getFullYear() === now.getFullYear() && day.getMonth() === now.getMonth() && day.getDate() === now.getDate());
    },
    checkSelected(day) {
      return !!(day.getFullYear() === this.choseDay.getFullYear() && day.getMonth() === this.choseDay.getMonth() && day.getDate() === this.choseDay.getDate());
    },
    checkOtherMonth(day) {
      return day.getMonth() !== this.startDate.getMonth();
    },
    checkDecorate(day) {
      var dateFormat = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
      return !!this.decorate[dateFormat];
    },
    checkSub(day) {
      var dateFormat = day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
      return this.sub[dateFormat];
    },
    prevView() {
      if (this.view === 'month') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, this.startDate.getDate());
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() - 7);
      }
      this.$nextTick(() => {
        this.$emit('prev');
      });
    },
    nextView() {
      if (this.view === 'month') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate());
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 7);
      }
      this.$nextTick(() => {
        this.$emit('next');
      });
    },
    select(day) {
      this.selectday = day;
      this.$nextTick(() => {
        this.$emit('selected', this.selectday);
      });
    },
    goToday() {
      this.startDate = new Date();
      this.selectday = new Date();
      this.$nextTick(() => {
        this.$emit('today', this.startDate);
      });
    }
  },
  mounted() {
    this.currentView = {
      start: this.days[0],
      end: this.days[this.days.length - 1]
    };
  }
};
</script>
<style>

.calendar {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #fff

}

.calendar .calendar__header {
  position: absolute;
  padding: 25px 0;
  right: 6px;
  top: -65px;
  line-height: 24px;
}

.worktask-calendar-rigth-title {
  text-align: center;
  height: 24px;
  line-height: 17px;
  background-color: transparent;
  color: #0056ff;
  border: 1px solid #0056ff;
}
.calendar .calendar__action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  height: 100%;
  top: 0;
  right: 10px
}

.calendar .calendar__control {
  width: 210px;
  padding: 0;
  display: flex;
  color: #1e2329
}

.calendar .calendar__control.calendar__control_center {
  margin: 0 auto
}

.calendar .calendar__control .calendar__indicator {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 500
}

.calendar .calendar__control .calendar__indicator-detail {
  color: #0056ff;
  margin-left: 10px
}

.calendar .calendar__control .calendar__arrow {
  width: 44px;
  text-align: center
}

.calendar .calendar__control .calendar__arrow.right:after {
  display: inline-block;
  content: '';
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #c7d2d0
}

.calendar .calendar__control .calendar__arrow.left:after {
  display: inline-block;
  content: '';
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #c7d2d0
}

.calendar .calendar__arrow {
  width: 54px;
  text-align: center;
  position: relative;
  color: #c7d2d0;
  cursor: pointer
}

.calendar .calendar__arrow.right i:before {
  position: absolute;
  top: 12px;
  right: 26px;
  font-size: 28px
}

.calendar .calendar__arrow.left i:before {
  position: absolute;
  top: 10px;
  font-size: 28px
}

.calendar .calendar__arrow:hover, .calendar .calendar__arrow:focus {
  color: #0056ff
}

.calendar .calendar__main {
  display: flex;
  padding-top: 25px;
}

.calendar .calendar__today {
  cursor: pointer;
  flex: none;
  width: 20px;
  padding: 5px 0;
  margin-left: 8px;
  border-radius: 10px;
  align-self: flex-start;
  border: 1px solid #0056ff;
  font-size: 11px;
  text-align: center;
  color: #0056ff
}

.calendar .calendar__date {
  width: 100px;
  flex: 1 0 auto
}

.calendar .calendar__weekdays {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 11px;
  color: #1e2329
}

.calendar .calendar__weekdays .calendar__weekday {
  flex: 0 0 auto;
  display: inline-block;
  width: 14.2%;
  margin: 0;
  text-align: center;
  font-size: 12px
}

.calendar .calendar__days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 10px
}

.calendar .calendar__days .calendar__day {
  position: relative;
  flex: 0 0 auto;
  display: inline-block;
  width: 14.2%;
  margin: 3px 0;
  text-align: center;
  font-size: 12px;
  color: #000
}

.calendar .calendar__days .calendar__day .sub {
  font-style: inherit;
  font-size: 10px;
  line-height: 14px;
  position: absolute;
  top: -5px;
  left: 20px;
  text-align: center;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 14px
}

.calendar .calendar__days .calendar__day span {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  font-family: "Gudea", sans-serif
}

.calendar .calendar__days .calendar__day.calendar__day_now span {
  border-radius: 50%;
  background: #f5a781;
  color: #fff !important
}

.calendar .calendar__days .calendar__day.calendar__day_selected span {
  border-radius: 50%;
  background: #eb4f04;
  color: #fff !important
}

.calendar .calendar__days .calendar__day.calendar__day_othermonth span {
  border-radius: 50%;
  color: #ccc
}

.calendar .calendar__days .calendar__day.calendar__day_decorate {
  position: relative
}

.calendar .calendar__days .calendar__day.calendar__day_decorate:after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  margin: auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #eb4f04
}
.bn-icon {
  height: 44px;
  font-size: 30px;
}
</style>
