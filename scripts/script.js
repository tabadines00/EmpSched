      //Demo Code
      var timetable = new Timetable();

      timetable.setScope(0,23)
      timetable.useTwelveHour();

      //timetable.addLocations(['Rotterdam', 'Madrid', 'Los Angeles', 'London', 'New York', 'Jakarta', 'Tokyo']);


      var today = new Date();
      //Create a date for Today

      /*
      timetable.addEvent('Sightseeing', 'Rotterdam', new Date(2015,7,17,9,00), new Date(2015,7,17,11,30), { url: '#' });
      timetable.addEvent('Zumba', 'Madrid', new Date(2015,7,17,12), new Date(2015,7,17,13), { url: '#' });
      timetable.addEvent('Zumbu', 'Madrid', new Date(2015,7,17,13,30), new Date(2015,7,17,15), { url: '#' });
      timetable.addEvent('Lasergaming', 'London', new Date(2015,7,17,17,45), new Date(2015,7,17,19,30), { class: 'vip-only', data: { maxPlayers: 14, gameType: 'Capture the flag' } });
      timetable.addEvent('All-you-can-eat grill', 'New York', new Date(2015,7,17,21), new Date(2015,7,18,1,30), { url: '#' });
      timetable.addEvent('Hackathon', 'Tokyo', new Date(2015,7,17,11,30), new Date(2015,7,17,20)); // options attribute is not used for this event
      timetable.addEvent('Tokyo Hackathon Livestream', 'Los Angeles', new Date(2015,7,17,12,30), new Date(2015,7,17,16,15)); // options attribute is not used for this event
      timetable.addEvent('Lunch', 'Jakarta', new Date(2015,7,17,9,30), new Date(2015,7,17,11,45), { onClick: function(event) {
        window.alert('You clicked on the ' + event.name + ' event in ' + event.location + '. This is an example of a click handler');
      }});
      timetable.addEvent('Cocktails', 'Rotterdam', new Date(2015,7,18,00,00), new Date(2015,7,18,02,00), { class: 'vip-only' });

      */

      //initial empty render
      var renderer = new Timetable.Renderer(timetable);
      renderer.draw('.timetable');

      //This function takes all user input from DOM and creates an event item.
      function createAnEvent() {

        //Get Name
        var n = document.getElementById("eName").value;

        //Get Location
        var l = document.getElementById("eLocation").value;

        //Get Start Time
        var s = {
            hour : document.getElementById("eStart").value,
            minutes : document.getElementById("eStartMin").value,
            period : document.getElementById("eStartPer").value,
        }

        //Get End Time
        var end = {
            hour : document.getElementById("eEnd").value,
            minutes : document.getElementById("eEndMin").value,
            period : document.getElementById("eEndPer").value,
        }

        //meridian check
        if(s.period == "PM") {
            s.hour = parseInt(s.hour, 10) + 12;;
            console.log("it is now " + s.hour + " PM!");
        }
        if(end.period == "PM") {
            end.hour = parseInt(end.hour, 10) + 12;
            console.log("it is now " + end.hour + " PM!");
        }

        //Create a new date from Today + user input times.
        var dStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), s.hour, s.minutes);
        var dEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), end.hour, end.minutes);

        timetable.addEvent(n, l, dStart, dEnd, { onClick:
            //function(event) { window.alert('You clicked on the ' + event.name + ' event in ' + event.location + '.');}
            function(event) {
                console.log(event.startDate.toTimeString());
                console.log(event.endDate.toTimeString());
            } 
        });

        //reset the inputs
        document.getElementById("eName").value = '';
        document.getElementById("eLocation").value = 'Select';
        document.getElementById("eStart").value = '';
        document.getElementById("eEnd").value = '';
        
        //rerender the timetable
        renderer.draw('.timetable');

        //obligatory dataCheck
        dataCheck();
      }

      //this function adds people to the list of people
      function addPerson() {
        var n = document.getElementById("eName").value;
        timetable.addLocations([n]);
        
        var newLoc = document.createElement("option");
        newLoc.setAttribute("value", n);
        newLoc.innerHTML = n;
        document.getElementById("eLocation").appendChild(newLoc);

        console.log(n + " was added");

        document.getElementById("eName").value = '';

        //rerender the timetable
        renderer.draw('.timetable');

        //obligatory dataCheck
        dataCheck();
      }

      function dataCheck() {
        console.log(timetable.locations);
        console.log(timetable.events);
      }
      