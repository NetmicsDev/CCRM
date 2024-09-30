import { useState, useEffect } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const calendarEvents = await getGoogleCalendarEvents();
      setEvents(calendarEvents);
    }

    fetchEvents();
  }, []);

  const renderDays = () => {
    const daysInMonth = new Date(2024, 5, 0).getDate(); // 5월의 날짜 수
    const firstDayOfMonth = new Date(2024, 4, 1).getDay(); // 5월 1일의 요일 (0: 일요일, 6: 토요일)

    let days = [];

    // 빈 칸 추가 (월 시작 전에 일요일까지 공백으로 채우기)
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="w-full h-24"
        ></div>,
      );
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const eventForTheDay = events.filter((event) => {
        const eventDate = new Date();
        //   event.start.date || event.start.dateTime
        return eventDate.getDate() === day;
      });

      days.push(
        <div
          key={day}
          className="border border-gray-300 w-full h-24 relative"
        >
          <div className="absolute top-1 left-1 text-sm font-bold">{day}</div>
          {eventForTheDay.length > 0 && (
            <div className="absolute bottom-1 left-1 text-xs text-blue-500">
              {eventForTheDay.map((event) => (
                <div key={event}>{event}</div>
              ))}
            </div>
          )}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
        <div
          key={day}
          className="text-center font-bold"
        >
          {day}
        </div>
      ))}
      {renderDays()}
    </div>
  );
};

export default Calendar;

async function getGoogleCalendarEvents() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "path-to-your-service-account-key.json",
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = response.data.items;
  return events;
}
