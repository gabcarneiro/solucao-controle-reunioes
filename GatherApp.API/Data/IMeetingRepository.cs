using System;
using System.Collections.Generic;
using GatherApp.API.Models;

namespace GatherApp.API.Data
{
    public interface IMeetingRepository : Repository<Meeting>
    {
        Meeting Save(Meeting meeting);
        IEnumerable<Meeting> GetMeetingsByUserId(int userId);
        IEnumerable<Meeting> GetMeetingsByDay(DateTime day);
        bool IsDateAvaliable(Meeting meetingToCreate);
    }
}