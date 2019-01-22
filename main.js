var clockModule = (function () {
    var $clock = $("#clock");
    var mainClockInterval;
    var EmptyClock = () => {
        $clock.html("");
    }
    var drawClockHTML = () => {

        EmptyClock();
        let content = `
            <div class="navbar">
                <h1>Clock</h1>
            </div>
            <div class="page">
                <div class="clock"></div>
            </div>
            <div class="toolbar">
                <div class="toolbar-inner">
                    <a href="#" class="link">Clock</a>
                    <a href="#" class="link alarmBtn">Alarm</a>
                </div>
            </div>`;
        $clock.html(content);

    }
    var drawClock = () => {
        drawClockHTML();
        var date = "<small>" + moment().format('ddd DD MMM, YYYY') + "</small>"
        $clock.find(".clock").html(moment().format('HH:mm:ss') + date);
        mainClockInterval = setInterval(() => {
            var date = "<small>" + moment().format('ddd DD MMM, YYYY') + "</small>"
            $clock.find(".clock").html(moment().format('HH:mm:ss') + date);
        }, 1000);

    }

    var init = () => {
        drawClock();
        EventListeners();

    };


    var alarmArr = [
        {
            "Time": "06:20 PM",
            "enabled": true,
            "label": "Morning walk",
            "dayArr": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "snooze": {
                "status": true,
                "sound": "Radar"
            }
        },
        {
            "Time": "09:00 AM",
            "enabled": false,
            "label": "Weekly Catch up",
            "dayArr": ["Monday"],
            "snooze": {
                "status": true,
                "sound": "Radar"
            }
        },
        {
            "Time": "10:20 AM",
            "enabled": true,
            "label": "Daily Standup",
            "dayArr": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "snooze": {
                "status": true,
                "sound": "Radar"
            }
        }
    ];

    var getItems =(obj)=>{
        let editNode;
        if(obj.mode === "Edit"){
            editNode=true;
        }else{
            editNode=false;
        }
        let itemArr =[];



        var weekdayCheck = (arr)=>{
            // For Alarms set for all days should show as Everyday, 
            // For Weekdays as Weekdays and for Weekend as weekends, and with specific day/s and label



        }


        $.each(alarmArr,(k,v)=>{



            let str = `
            <li class="item ${editNode === true ? 'edit':''}  ${v.enabled == false && editNode === true?' off':'' }">
                <label href="#" data-template="about" data-context-name="about" class="item-link item-content">
                    <a href="" class="remove">X</a>
                    <input type="checkbox" ${v.enabled == true ? 'checked=""' : ""} >
                    <strong>${v.Time.split(" ")[0]} <sub>${v.Time.split(" ")[1]}</sub></strong>
                    <small>${v.label}, ${v.dayArr[0]}</small>
                </label>
            </li>
            `;
            itemArr.push(str);
        })

        return itemArr;
    }


    var drawAlarm = () => {

        
        var getTimestamp = () => {

        }
        var drawHtml = () => {

            let Items = getItems({"mode":"View"}).join("");
            let alarm_dom = `
            <div class="navbar">
                    <a class="pills left editAlarms">Edit</a>
                    <h1>Alarm</h1>
                    <a class="pills right addAlarm">Add</a>
                </div>
                <div class="page">
                    <!-- show this when no alarms are set -->
                    <div class="clock">
                    <p>No Alarms set</p>
                    </div>
                        <ul class="list">
                           ${Items}
                        </ul>
                </div>
                
                <div class="toolbar">
                    <div class="toolbar-inner">
                        <a href="#" class="link mainClockBtn">Clock</a>
                        
                    </div>
        </div>
            `;

            $clock.append(alarm_dom);
        }

        drawHtml();
        EventListeners();
    };
    var EditAlarm = () => {

        var drawEditHtml = () =>{
            let Items = getItems({"mode":"Edit"}).join("");
            let edit_dom = `
                <div class="navbar">
                    <a class="pills left doneBtn">Done</a>
                    <h1>Edit Alarm</h1>
                </div>
                <div class="page">
                    <ul class="list">
                    ${Items}
                    </ul>
                </div>
                `;
            $clock.append(edit_dom);
        };

        drawEditHtml();
        EventListeners();
    };
    var NewAlarm = () => {

    };
    var updateAlarmList = (itemObj) =>{


        var sortArry = (a,b) =>{
            return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
        };
        if(typeof itemObj === 'object'){
            alarmArr.push(itemObj);

            alarmArr.sort(sortArry); //sorts the new array

            //clear timeouts

            //re-draw and set timeout


        }
    }
    var EventListeners = () => {

        $(".alarmBtn,.doneBtn").off("click");
        $(".alarmBtn,.doneBtn").on("click", () => {
            clearInterval(mainClockInterval);
            EmptyClock();

            drawAlarm();
        });

        $(".mainClockBtn").off("click");
        $(".mainClockBtn").on("click",() =>{
            init();
        })

        $(".editAlarms").off("click");
        $(".editAlarms").on("click",()=>{
            EmptyClock();
            EditAlarm();
        });

        $("input[type='checkbox']").off("click");
        $("input[type='checkbox']").on("click",(e)=>{
           
           // update the status of the checkbox in the array
           //also fix bubling of event

           console.log("checkbox triggered");
           
        });

    }
    return {
        init,
        drawAlarm,
        EditAlarm,
        NewAlarm,
        drawClock
    }

})();

$(window).on("load", function () {
    clockModule.init();
});