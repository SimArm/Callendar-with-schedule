(() => {
    const burger = document.querySelector('.navBurger');
    const nav = document.querySelector('.navLinks');
    const navLinks = document.querySelectorAll('.navLinks li');
    const burgerLines = document.querySelectorAll('.navBurger div');

    burger.addEventListener('click', () => {

        nav.classList.toggle('navHidden');

        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';     
            }else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            }
        });

        burgerLines.forEach((line, index) => {
            if(line.style.animation){
                line.style.animation = '';  
                line.style.opacity = '1';   
            }else{
                line.style.opacity = '0';
                line.style.animation = `navBurgerFade 0.3s ease forwards ${index / 7 + 0.3}s`
            }
        });
    });
})();

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
const selectMonth = document.getElementById('Month');
const selectYear = document.getElementById('Year');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdays = ["Sun" ,"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

selectMonth.innerHTML = `${months[currentMonth]} `;
selectYear.innerHTML = currentYear;

const ymBtnPrev = document.getElementById('Previous');
const ymBtnNext = document.getElementById('Next');

ymBtnPrev.addEventListener('click', () => {
    prevMonth(1);
});

ymBtnNext.addEventListener('click', () => {
    nextMonth(1);
});

const prevWeek = document.getElementById('PreviousWeek');
const nextWeek = document.getElementById('NextWeek');

prevWeek.addEventListener('click', () => {
    if (currentDay < 8 && currentDay !== 1) {
        currentDay = 1;
    } else if (currentDay == 1){ 
        let lastWeek = (new Date(currentYear, currentMonth +1 , 0).getDate()) - 6;
        prevMonth(lastWeek);
    } else {
        currentDay-=7;
    }
    castCallendar();
});

nextWeek.addEventListener('click', () => {
    let lastWeek = (new Date(currentYear, currentMonth +1 , 0).getDate()) - 6;
    let beforeLastWeek = lastWeek - 7;
    if (currentDay > beforeLastWeek && currentDay !== lastWeek){
        currentDay = lastWeek;
    } else if (currentDay == lastWeek) {
        nextMonth(1);
    } else {
        currentDay+=7;
    }
    castCallendar();
});

function nextMonth(value){
    if (currentMonth === 11) {
        currentYear++;
        currentMonth = 0;
    } else {
        currentMonth++;
    }
    selectMonth.innerHTML = `${months[currentMonth]} `;
    selectYear.innerHTML = currentYear;
    currentDay = value;
    castCallendar();
}

function prevMonth(value){
    if (currentMonth === 0) {
        currentYear--;
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    selectMonth.innerHTML = `${months[currentMonth]} `;
    selectYear.innerHTML = currentYear;
    currentDay = value;
    castCallendar();
}

function castCallendar(){
    let listItems = document.querySelectorAll('.weekdays li');
    listItems.forEach(item => (item.innerHTML = ''));
    let mobileCallendarDiv = document.getElementById('MobileCallendar');
    mobileCallendarDiv.innerHTML = '';
    let mobileCallendarWeek = document.getElementById('CurrentWeek');
    mobileCallendarWeek.innerHTML = '';
    let dayOne = 1;
    let weekDayIndex = new Date(currentYear, currentMonth, dayOne).getDay();
    let daysInMonth = new Date(currentYear, currentMonth +1 , 0).getDate()
    let screenSize = window.matchMedia('(min-width: 767px)');
    let weekdaysInOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    if (screenSize.matches) {
        // medium - big screen callendar
        if (weekDayIndex !== 1 && weekDayIndex > 0) { 
            for (j = 1; j < weekDayIndex ; j++) { 
                let weekDay = weekdays[j];
                let callendarWeekday = document.getElementById(weekDay);
                let dayDiv = document.createElement('div');
                let day = document.createTextNode('\u00A0');
                dayDiv.setAttribute('class', 'hidden');
                dayDiv.appendChild(day);
                callendarWeekday.appendChild(dayDiv);
            }
        } else if ( weekDayIndex == 0) {
            for (j = 1; j <= 6; j++) {
                let weekDay = weekdays[j];
                let callendarWeekday = document.getElementById(weekDay);
                let dayDiv = document.createElement('div');
                dayDiv.setAttribute('class', 'hidden');
                let day = document.createTextNode('\u00A0');
                dayDiv.appendChild(day);
                callendarWeekday.appendChild(dayDiv);
            }
        }


        for (dayOne; dayOne <= daysInMonth; dayOne++) {
            weekDayIndex = new Date(currentYear, currentMonth, dayOne).getDay();
            let weekDay = weekdays[weekDayIndex];
            let callendarWeekday = document.getElementById(weekDay);
            let dayDiv = document.createElement('div');
            //dayDiv.setAttribute('class', 'dayCell');
            let dayHeader = document.createElement('div');
            let day = document.createTextNode(dayOne);
            dayHeader.appendChild(day);
            dayHeader.setAttribute('class','dayHeader');      
            dayDiv.appendChild(dayHeader);
            
            let schedule = document.createElement('ul');
            let dayId = `${currentYear}${currentMonth}${dayOne}`;
            schedule.setAttribute('id', dayId);

            dayDiv.appendChild(schedule);       
            callendarWeekday.appendChild(dayDiv);
        }
        
        weekdaysInOrder.forEach(element => {
            let callendarWeekday = document.getElementById(element);
            let weekDayNameDiv = document.createElement('h4');
            let weekDayName = document.createTextNode(element);
            weekDayNameDiv.appendChild(weekDayName);
            weekDayNameDiv.setAttribute('class','weekdaysHeader'); 
            callendarWeekday.prepend(weekDayNameDiv);
        });

    } else { 
        // mobile version of callendar
        let todayDay = currentDay;s
        let weekFromToday = todayDay + 6;

        for (todayDay; todayDay <= weekFromToday; todayDay++) {
            let callendarWeekDay = document.createElement('span');
            let innerWeekDay = document.createTextNode(todayDay);
            callendarWeekDay.appendChild(innerWeekDay);
            mobileCallendarWeek.appendChild(callendarWeekDay);

            weekDayIndex = new Date(currentYear, currentMonth, todayDay).getDay();
            let weekDay = weekdays[weekDayIndex];
            let dayDiv = document.createElement('div');
            let dayHeader = document.createElement('div');
            let day = document.createTextNode(`${weekDay} ${todayDay}`);
            dayHeader.appendChild(day);
            dayHeader.setAttribute('class','dayHeader');      
            dayDiv.appendChild(dayHeader);
            
            let schedule = document.createElement('ul');
            let dayId = `${currentYear}${currentMonth}${todayDay}`;
            schedule.setAttribute('id', dayId);

            dayDiv.appendChild(schedule);       
            mobileCallendarDiv.appendChild(dayDiv);
        }    

    }    
    fetchDatabase();
}
castCallendar();

function fetchDatabase(){

    fetch('database.php')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(function(event){
                let eventTime = `${event.time}`;
                let eventMonth = eventTime.slice(5,7);
                let eventYear = eventTime.slice(0,4);
                let eventDay = eventTime.slice(8,10);
                let eventHours = eventTime.slice(11,16);
                let eventDate = `${eventYear}${eventMonth -1}${eventDay -1 +1}`;
                let dateDiv = document.getElementById(eventDate);
                    if (dateDiv !== null) { 
                        let dateDivLi = document.createElement('li');
                        let dateDivInner = document.createTextNode(`${eventHours} ${event.event}`);
                        dateDivLi.appendChild(dateDivInner);
                        dateDiv.appendChild(dateDivLi);
                    }
            }); 
    });
}