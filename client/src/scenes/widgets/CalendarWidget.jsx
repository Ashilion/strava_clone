import {useState} from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from '@fullcalendar/core';
import  FullCalendar  from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list';
import { Box, Typography, List, ListItem, useTheme, ListItemText } from "@mui/material";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const Calendar = ({ userId, isProfile = false }) => {

  //get activities to display on the calendar (LATER : get only uer activity but function isn't implemented in server)
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getActivities = async () => {
    const response = await fetch("http://localhost:3001/activity", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserActivities = async () => {
    const response = await fetch(
      `http://localhost:3001/activity/${userId}/activities`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserActivities();
    } else {
      getActivities();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [currentEvents, setCurrentEvents] = useState([]);

    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const background = palette.background.default;

    const handleDateClick = (selected) =>{
        const title =prompt('Enter a new title for your event')
        const calendarApi = selected.view.calendar
        calendarApi.unselect() // clear date selection
        if(title){
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            })
        }
    }
    const handleEventClick = (clickInfo) => {
        if(window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)){
            clickInfo.event.remove()
        }
    }
    // event example
    // {id: "1234", title: 'All-day event', date: '2023-07-01'},
    // {id: "4231", title: 'Timed Event', date: '2023-07-10'},
    

    return(
    <Box m="20px">
        <Box display="flex" justifyContent="space-between">
            {/* Calendar Side Bar */}
            <Box 
                flex= "1 1 20%" 
                backgroundColor={background}
                p="15px"
                borderRadius="4px"
                >
                <Typography variant="h5">Events</Typography>
                <List>
                    {currentEvents.map((event) => (
                        <ListItem 
                          key={event.id}
                          sx= {{
                            backgroundColor:palette.primary.main, 
                            margin:"10 0", 
                            borderRadius:"2px"}}
                            >
                            <ListItemText
                                primary =  {event.title}
                                secondary = {
                                    <Typography>
                                        {
                                            formatDate(event.start, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',

                                            })
                                        }
                                    </Typography>
                                }>

                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
            {/* Calendar */}   
            <Box flex="1 1 100%" ml="15px" width="900px">
                <FullCalendar 
                  eventColor={palette.primary.main}
                  height="75vh"
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin]}
                  headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  select={handleDateClick}
                  eventClick={handleEventClick}
                  eventsSet={(events)=> setCurrentEvents(events)}
                  initialEvents={
                    posts.map(
                      ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        distance,
                        temps,
                        allure,
                        data,
                      }) => (
                        {
                          id: _id,
                          title: `${distance}km`,
                          start:new Date(data[0].time),
                          end: new Date(data[0].time), 
                          color:"green"
                          //date: '2023-11-12'
                      }
                      )
                    )
                  }

                  />
            </Box>                
        </Box>
    </Box>
)};

export default Calendar;