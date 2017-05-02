function Calender(){
	this.init();
}

Calender.prototype = {
	DateList : [],
	YearList : [],
	MonthList : [],
	solarTermsName : ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"],
	IFestival: {
                "0101": "元旦节",
                "0214": "情人节",
                "0305": "雷锋日",
                "0308": "妇女节",
                "0312": "植树节",
                "0401": "愚人节",
                "0501": "劳动节",
                "0504": "青年节",
                "0601": "儿童节",
                "0701": "建党日",
                "0801": "建军节",
                "0910": "教师节",
                "1001": "国庆节",
                "1224": "平安夜",
                "1225": "圣诞节",
            },
    TFestival: {
                "正月初一": "春节",
                "正月初五": "破五",
                "二月初二": "春龙节",
                "五月初六": "立夏节",
                "七月十五": "盂兰盆节",
                "七月三十": "地藏节",
                "腊月廿三": "小年",
                "腊月三十": "除夕",
                "正月十五": "元宵节",
                "五月初五": "端午节",
                "七月初七": "乞巧节",
                "八月十五": "中秋节",
                "九月初九": "重阳节",
                "腊月初八": "腊八节",
                "腊月廿四": "扫房日"
            },
    init:function(){
    	var curDate = new Date();
    	var year = curDate.getFullYear(); //以四位数字返回年份
    	var month = curDate.getMonth();  //0~11返回月份，0是一月，11是十二月
    	var day = curDate.getDay();  //返回0~6，代表周日到周六
        this.fillSelect();
    },
    fillSelect: function(){
        for (var i = 0; i < 120; i++) {
            this.YearList[i] = 1901+i;
        }
        for (var i = 0; i < 12; i++) {
            this.MonthList[i] = i;
        }
        
        var selectYearEle = document.getElementsByClassName("select_year")[0];
        var selectMonthEle = document.getElementsByClassName("select_month")[0];

        for (var i = 0; i < this.YearList.length; i++) {
            var y_options_ele = document.createElement("option");
            y_options_ele.setAttribute("value",this.YearList[i]);
            y_options_ele.innerHTML = "&nbsp"+this.YearList[i]+"年&nbsp";
            if(this.YearList[i]==year){
                y_options_ele.setAttribute("selected","selected")
            }
            selectYearEle.appendChild(y_options_ele);
        }

        for (var i = 0; i < this.MonthList.length; i++) {
            var m_options_ele = document.createElement("option");
            m_options_ele.setAttribute("value",this.MonthList[i]);
            m_options_ele.innerHTML = "&nbsp"+(this.MonthList[i] +1)+"月&nbsp";
            if(this.MonthList[i]==month){
                m_options_ele.setAttribute("selected","selected")
            }
            selectMonthEle.appendChild(m_options_ele);
        }        
    },
    getDateList: function(year,month,day){
        var CurStart = new Date(year,month,1); //当月第一天
        var PreEnd = new Date();
        PreEnd.setTime(CurStart.getTime()-24*60*60*1000); //上个月最后一天
        var new_year,new_month;
        if(parseInt(month)==11){
            new_year = parseInt(year+1);
            new_month = 0;
        }else{
            new_year = year;
            new_month = parseInt(month+1);
        }
        var NextStart = newDate(new_year,new_month,1); //下个月第一天
        var CurDays = (NextStart.getTime() - CurStart)/(24*60*60*1000);
        var CurEnd = newDate(year,month,CurDays); //当月最后一天

        var DateObjConstructor = function(){
            this.IsSelectedMonth = false;
            this.IsWeekend = false;
            this.isSelected = false;
            this.year = "";
            this.month = "";
            this.day = "";
            this.Lunar = "";
            this.Term = "";
            this.IFestival = "";
            this.TFestival = "";            
        };
        this.DateList = [];
        var result = {};
        var index = -1;
        var ifestival_date,tfestival_date,item;

        var TmpDate = new Date();
        if(PreEnd.getDay() != 6){
            for(var i=0; i<=PreEnd.getDay(); i++){
                var DateObj = new DateObjConstructor();
                TmpDate.setTime(PreEnd.getTime() - 24*60*60*1000*(PreEnd.getDay()-i));
                DateObj.year = TmpDate.getFullYear();
                DateObj.month = TmpDate.getMonth();
                DateObj.day = TmpDate.getDate();
                if(TmpDate.getDay() == 0 || TmpDate.getDay() == 6){
                    DateObj.IsWeekend = true;
                }

                result = 
            }
        }



    }

}
