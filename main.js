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

            debugger;

            let str = `
            <li data-attr-id="${k}"  class="item ${editNode === true ? 'edit':''}  ${v.enabled == false && editNode === true?' off':'' }">
                <label href="#" data-template="about" data-context-name="about" class="item-link item-content">
                    <a  class="remove removeItem">X</a>
                    <input type="checkbox" ${v.enabled == true?'checked=""':""}>
                    
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
                <select id="hours">
                  <option value="" disabled selected>HH</option>
                  <option value=0>0</option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
                </select>
                <select id="minutes">
                  <option value="" disabled selected>MM</option>
                  <option value=0>0</option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option><option value=13>13</option><option value=14>14</option><option value=15>15</option><option value=16>16</option><option value=17>17</option><option value=18>18</option><option value=19>19</option><option value=20>20</option><option value=21>21</option><option value=22>22</option><option value=23>23</option><option value=24>24</option><option value=25>25</option><option value=26>26</option><option value=27>27</option><option value=28>28</option><option value=29>29</option><option value=30>30</option><option value=31>31</option><option value=32>32</option><option value=33>33</option><option value=34>34</option><option value=35>35</option><option value=36>36</option><option value=37>37</option><option value=38>38</option><option value=39>39</option><option value=40>40</option><option value=41>41</option><option value=42>42</option><option value=43>43</option><option value=44>44</option><option value=45>45</option><option value=46>46</option><option value=47>47</option><option value=48>48</option><option value=49>49</option><option value=50>50</option><option value=51>51</option><option value=52>52</option><option value=53>53</option><option value=54>54</option><option value=55>55</option><option value=56>56</option><option value=57>57</option><option value=58>58</option><option value=59>59</option><option value=60>60</option>
                </select>
                <select>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
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