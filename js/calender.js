function Calender(){
	this.init();
}

Calender.prototype = {
	DateList : [],
	YearList : [],
	MonthList : [],
	selectedDate : "",
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
    	var day = curDate.getDate();  //getDay() 返回0~6，代表周日到周六
    	var self = this;
        this.fillSelect(year,month);  //一个疑问，不传参为什么拿不到值?
        this.getDateList(year,month,day);
        addEvent(document.querySelector(".select_year"),"change",function(){
        	year = document.querySelector(".select_year").value;
        	month = document.querySelector(".select_month").value;
        	self.getDateList(year,month,1);
        });
        addEvent(document.querySelector(".select_month"),"change",function(){
        	year = document.querySelector(".select_year").value;
        	month = document.querySelector(".select_month").value;  
        	self.getDateList(year,month,1);
        });
        addEvent(document.querySelector(".prev_month"),"click",function(){
        	
        	if(document.querySelector(".select_month").value == 0){        		
        		document.querySelector(".select_month").value = 11;
        		document.querySelector(".select_year").value = document.querySelector(".select_year").value - 1;
        	}else{
        		document.querySelector(".select_month").value = document.querySelector(".select_month").value - 1;
        	}
        	year = document.querySelector(".select_year").value;
        	month = document.querySelector(".select_month").value;
        	self.getDateList(year,month,1);
        });

        addEvent(document.querySelector(".next_month"),"click",function(){
        	
        	if(document.querySelector(".select_month").value == 11){        		
        		document.querySelector(".select_month").value = 0;
        		document.querySelector(".select_year").value = parseInt(document.querySelector(".select_year").value) + 1;
        	}else{
        		document.querySelector(".select_month").value = parseInt(document.querySelector(".select_month").value) + 1;
        	}
        	year = document.querySelector(".select_year").value;
        	month = document.querySelector(".select_month").value;
        	self.getDateList(year,month,1);
        });

        addEvent(document.querySelector(".return_today_button"),"click",function(){
        	self.selectedDate = "";
        	year = curDate.getFullYear();
        	month = curDate.getMonth();
        	document.querySelector(".select_year").value = year;
        	document.querySelector(".select_month").value = month;
        	self.getDateList(year,month,1);
        });

    },
    fillSelect: function(year,month){
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

        var DateObjConstructor = function(date){
            this.IsSelectMonth = false;
            this.IsWeekend = false;
            this.IsSelected = false;
            this.IsToday = false;
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.day = date.getDate();
            this.week = date.getDay();
            this.Lunar = "";
            this.Term = "";
            this.IFestival = "";
            this.TFestival = "";            
        };
        this.DateList = [];

        var result = {};
        var index = -1;
        var ifestival_date,tfestival_date,item;
        var oneDaysec = 24*60*60*1000;
        
        var dat = new Date(year,month,1);
        if(dat.getDay()!= 0){
            dat.setTime(dat.getTime()-dat.getDay()*oneDaysec);
        }
        var date_temp = new Date();
        console.log(this.selectedDate);
        if(this.selectedDate == ""){
        	this.selectedDate = date_temp.getFullYear() +"-"+ (parseInt(date_temp.getMonth())+1)  +"-"+ date_temp.getDate();
        	console.log("lll")
        }
        console.log(this.selectedDate);
        for(var i=0; i<42; i++){
            var dateObj = new DateObjConstructor(dat);
            //console.log(dateObj);
            if(dateObj.week == 0 || dateObj.week == 6){
                dateObj.IsWeekend = true;
            }
            if(dateObj.month == month){
                dateObj.IsSelectMonth = true;
            }
            if(dateObj.day == date_temp.getDate() && dateObj.month == date_temp.getMonth()&& dateObj.year == date_temp.getFullYear()){
                dateObj.IsToday = true;
                dateObj.IsSelected = true;
            }
            if(dateObj.day == this.selectedDate.split("-")[2]&&(dateObj.IsSelectMonth == true)){
            	dateObj.IsSelected = true;
            }            
            result = lunar.solar2lunar(dateObj.year,parseInt(dateObj.month+1),dateObj.day);
            dateObj.Term = result.Term;
            dateObj.Lunar = result.IDayCn;
            ifestival_date = ((parseInt(dateObj.month)<9) ? "0"+(parseInt(dateObj.month)+1) : parseInt(dateObj.month)+1) + ((parseInt(dateObj.day)<=9) ? "0"+dateObj.day : dateObj.day);
            tfestival_date = result.IMonthCn+result.IDayCn;
            for(item in this.IFestival){
                if(item == ifestival_date){
                    dateObj.IFestival = this.IFestival[item];
                }
            }
            for(item in this.TFestival){
                if(item == tfestival_date){
                    dateObj.TFestival = this.TFestival[item];
                }
            }
            this.DateList.push(dateObj);
            dat.setDate(dat.getDate()+1);
        }
        this.showDateList();
        this.showRight();
        
    },
    showDateList:function(DateList){
        //console.log(this.DateList);
        if(DateList === undefined){
            DateList = this.DateList;
        }
        var str = "";
        for(var i=0;i<DateList.length;i++){
            str += '<li  class="';
            if(!DateList[i].IsSelectMonth){
                str += '   prevnext';
            }
            if(DateList[i].IsWeekend){
                str += '   weekend';
            }
            if(DateList[i].IsToday){
                str += '   today';
            }
            if(DateList[i].IsSelected){
                str += '   selected';
            }
            str +='"';
            if(DateList[i].IFestival){
                str += ' ifestival="'+DateList[i].IFestival+'" ';
            }
            if(DateList[i].TFestival){
                str += ' tfestival="'+DateList[i].TFestival+'" ';
            }
            var dateMonth = parseInt(DateList[i].month)<9?"0"+(parseInt(DateList[i].month)+1):(parseInt(DateList[i].month)+1);
            var dateDay = parseInt(DateList[i].day)<9?"0"+parseInt(DateList[i].day):parseInt(DateList[i].day);
            str +='    date="'+DateList[i].year+'-'+dateMonth+'-'+dateDay+'" weekday="'+DateList[i].week+'"></span><div class="solar_date">'+DateList[i].day+'</div><div class="lunar_date">';                    
            if(DateList[i].Term !== null){
                str += DateList[i].Term+'</div>';
            }else if(DateList[i].IFestival!=""){
                str += DateList[i].IFestival+'</div>';
            }else{
                str += DateList[i].Lunar+'</div>';
            }                    
            str+='</li>';                    
        }
        document.getElementsByClassName("date_list")[0].innerHTML = str; 
        this.eventListener();
    },
    showRight:function(){
        var theDay = document.querySelector(".selected");
        //console.log(this.DateList); 
        var datestr = theDay.getAttribute("date");
        var weekday = theDay.getAttribute("weekday");
        var week = ["日","一","二","三","四","五","六"];
        var ifestival = theDay.getAttribute("ifestival");
        var tfestival = theDay.getAttribute("tfestival");
        var date = datestr.split("-");
        var result = lunar.solar2lunar(date[0],date[1],date[2]);
        document.querySelector(".solar_date_right").innerHTML = datestr+" 星期"+week[weekday];
        document.querySelector(".solar_day").innerHTML = date[2]<=9?date[2].slice(-1):date[2];
        //document.querySelector(".solar_ifestival").innerHTML = ifestival;
        document.querySelector(".lunar_date_right").innerHTML = result.IMonthCn+result.IDayCn;
        //document.querySelector(".lunar_tfestival").innerHTML = result.IMonthCn+result.IDayCn;
        document.querySelector(".animal_year").innerHTML = result.gzYear+"年"+"【"+result.Animal+"年】";
        document.querySelector(".gan_zhi_day").innerHTML = result.gzMonth+"月 "+result.gzDay+"日";
        if(ifestival){
            document.querySelector(".solar_ifestival").innerHTML = ifestival;
        }else{
        	document.querySelector(".solar_ifestival").innerHTML = "";
        }
        if(tfestival){
            document.querySelector(".lunar_tfestival").innerHTML = tfestival;
        }else{
        	document.querySelector(".lunar_tfestival").innerHTML = "";
        }
    },
    eventListener:function(){
        var date_list_li_el = document.querySelectorAll(".date_list li");
        var self = this;
        for(var i=0,len=date_list_li_el.length;i<len;i++){
            addEvent(date_list_li_el[i],"click",function(event){
                if(event.target.nodeName == "LI"){
                	var el = event.target;
                }else{
                	el = event.target.parentNode;
                }
                self.selectedDate = el.getAttribute("date");
                if(hasClass(el,"prevnext")){
                	var dateArr = el.getAttribute("date").split("-");
                	document.querySelector(".select_year").value = dateArr[0];
                	document.querySelector(".select_month").value = dateArr[1]-1;
                	
                	self.getDateList(dateArr[0],dateArr[1]-1,dateArr[2]);
                }else{
            	    var selected_el = document.getElementsByClassName("selected")[0];
                    removeClass(selected_el,"selected");
                    addClass(el,"selected");
                    self.showRight();                	
                }
            });

        }
    }




};
