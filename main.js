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
            <li data-attr-id="${k}"  class="item ${editNode === true ? 'edit':''}  ${v.enabled == false && editNode === true?' off':'' }">
                <label href="#" data-template="about" data-context-name="about" class="item-link item-content">
                    <a  class="remove removeItem">X</a>
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

        var drawNew = ()=>{

            let new_dom = `
            <div class="navbar">
            <a class="pills left cancel">Cancel</a>
            <h1>Alarm/Edit</h1>
            <a class="pills right save">Save</a>
          </div>
          <div class="page">
              <div class="content-block-title">Select Time</div>
              <div class="content-block-inner">
                <p>
                <select>
                  <option value="" disabled selected>HH</option>
                  <option value="hurr">Durr</option>
                </select>
                <select>
                  <option>MM</option>
                </select>
                <select>
                  <option>AM</option>
                </select>
                </p>
                
                  <p class="item select selected">
                    <label href="#" for="Snooze">
                      <input type="checkbox" checked="">
                      <span>Snooze</span>
                    </label>
                  </p>
                <p class="item select selected">
                    <label href="#" for="Snooze">
                      <input type="text" value="">
                      <span>Label</span>
                    </label>
                  </p>
             
                
              </div>  
            
            <div class="content-block-title">Repeat</div>
            <ul class="list">
                  <li class="item select selected">
                    <label href="#" for="Monday">
                      <input type="checkbox" id="Monday">
                      <span>Monday</span>
                    </label>
                  </li>
                  <li class="item select selected">
                    <label href="#" for="Tuesday">
                      <input type="checkbox" id="Tuesday">
                      <span>Tuesday</span>
                    </label>
                  </li>
                <li class="item select selected">
                    <label href="#" for="Wednesday">
                      <input type="checkbox" id="Wednesday">
                      <span>Wednesday</span>
                    </label>
                  </li>
              
              <li class="item select selected">
                    <label href="#" for="Thursday">
                      <input type="checkbox" id="Thursday">
                      <span>Thursday</span>
                    </label>
                  </li>
              <li class="item select selected">
                    <label href="#" for="Friday">
                      <input type="checkbox" id="Friday">
                      <span>Friday</span>
                    </label>
                  </li>
              <li class="item select selected">
                    <label href="#" for="Saturday">
                      <input type="checkbox" id="Saturday">
                      <span>Saturday</span>
                    </label>
                  </li>
              <li class="item select selected">
                    <label href="#" for="Sunday">
                      <input type="checkbox" id="Sunday">
                      <span>Sunday</span>
                    </label>
                  </li>
                  
                </ul>
            <div class="content-block-title">Sound</div>
            <ul class="list">
              <li class="item select selected">
                    <label href="#" for="None">
                      <input type="radio" id="None" name="sound" checked="checked">
                      <span>None</span>
                    </label>
                  </li>
                  <li class="item select selected">
                    <label href="#" for="Radar">
                      <input type="radio" id="Radar" name="sound">
                      <span>Radar</span>
                    </label>
                  </li>
              <li class="item select selected">
                    <label href="#" for="Beep">
                      <input type="radio" id="Beep" name="sound">
                      <span>Beep</span>
                    </label>
                  </li>
              
                  
                </ul>
          </div>
          <div class="action">
            <!-- show this if you are adding alarm -->
            <a href="#" data-panel="left" class="button open-panel">Save Alarm</a>
            <!-- show this if you are editing alarm -->
            <a href="#" data-panel="left" class="button open-panel danger">Delete Alarm</a>
          </div>
            `;


            $clock.append(new_dom);
        };

        
        drawNew();
        EventListeners();

    };
    var updateAlarmList = (itemObj) =>{
        //Used to add the new obj to alarm list => Sort the array based on time

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

    var updateItem = (indexItem,updateObj,returnStatus= false) =>{
        //Update the item object
        let status = [];
        alarmArr.map((obj,index)=>{
           
            if(indexItem === index){
                $.extend(obj,updateObj);
            }

            status.push(obj["enabled"]);
        });

        if(returnStatus== true){

            return status.includes(true);
        }

    }

    var EventListeners = () => {

        $(".alarmBtn,.doneBtn,.cancel").off("click");
        $(".alarmBtn,.doneBtn,.cancel").on("click", () => {
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

        $(".addAlarm").off("click");
        $(".addAlarm").on("click",()=>{
            EmptyClock();
            NewAlarm();
        });

        $("input[type='checkbox']").off("click");
        $("input[type='checkbox']").on("click",(e)=>{
           let elm = e.target;
           let itemIndex = +$(elm).closest(".item").attr("data-attr-id");
           // update the status of the checkbox in the array
           //also fix bubling of event
            let status;
           
           if($(elm).filter(':checked').length == 1){
            // alert("Checkbox is checked." );
            status = updateItem(itemIndex,{"enabled": true},true);
            console.log(status);
            }
            else if($(elm).filter(':checked').length == 0){
            // alert("Checkbox is unchecked." );
            status = updateItem(itemIndex,{"enabled": false},true);
            console.log(status);
            }

            if(status == false){
                $(".clock").addClass("visibleClock");
                $(".clock").removeClass("hideClock");
            }else{
                $(".clock").addClass("hideClock");
                $(".clock").removeClass("visibleClock");
            }
           
        });


        // $(".item.edit:not('.item.edit .removeItem')").off("click");
        // $(".item.edit:not('.item.edit .removeItem')").on("click",()=>{
        //     console.log("clicked");
        // });

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