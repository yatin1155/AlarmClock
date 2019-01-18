var clockModule = (function(){
    var $clock= $("#clock");
    var EmptyClock = () =>{
        $clock.html("");
    }
    var drawClockHTML =()=>{
        
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
    var drawClock = () =>{
        drawClockHTML();
        var date = "<small>"+moment().format('ddd DD MMM, YYYY')+"</small>"
        $clock.find(".clock").html(moment().format('HH:mm:ss') + date);
        setInterval(()=>{
            var date = "<small>"+moment().format('ddd DD MMM, YYYY')+"</small>"
            $clock.find(".clock").html(moment().format('HH:mm:ss') + date);
        }, 1000);

    }

    var init = () =>{
        drawClock();
        EventListeners();
        
    };
    var drawAlarm = () =>{

    };
    var EditAlarm = () =>{

    };
    var NewAlarm = () =>{

    };
    var EventListeners =()=>{

        $(".alarmBtn").off("click");
        $(".alarmBtn").on("click",()=>{
            drawAlarm();
        });
    }
    return{
        init,
        drawAlarm,
        EditAlarm,
        NewAlarm,
        drawClock
    }

})();
// $(document).ready(()=>{
//     clockModule.init();
// })
$(window).on("load", function() {
    clockModule.init();
});