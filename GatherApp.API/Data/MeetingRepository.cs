using System;
using System.Collections.Generic;
using System.Linq;
using GatherApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GatherApp.API.Data
{
    public class MeetingRepository : IMeetingRepository {
        
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;

        public MeetingRepository(DataContext context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public IEnumerable<Meeting> GetAll(){
            return _context.Meetings.Include(m => m.User).ToList();
        }

        public Meeting GetById(int id)
        {
            return _context.Meetings.Include(m => m.User).FirstOrDefault(m => m.Id == id);
        }

        public IEnumerable<Meeting> GetMeetingsByUserId(int userId)
        {
            var user = _userRepository.GetById(userId);

            var meetings = _context.Meetings.Include(m => m.User).Where(m => m.User.Id == userId).ToList();

            return meetings;
        }
        
        public IEnumerable<Meeting> GetMeetingsByDay(DateTime day)
        {
            var meetings = _context.Meetings.Include(m => m.User)
                .Where(m => m.StartingTime.Year == day.Year
                            && m.StartingTime.Month == day.Month
                            &&  m.StartingTime.Day == day.Day).OrderBy(m => m.FinishingTime);

            return meetings;
        }
        
        public bool IsDateAvaliable(Meeting meetingToCreate)
        {
            var meetingsOfDay = this.GetMeetingsByDay(meetingToCreate.StartingTime);

            foreach (var meetingsRepo in meetingsOfDay){

                if (Between(meetingsRepo.StartingTime.AddMinutes(1), meetingToCreate.StartingTime, meetingToCreate.FinishingTime))
                    return false;
                if (Between(meetingsRepo.FinishingTime, meetingToCreate.StartingTime, meetingToCreate.FinishingTime.AddMinutes(1)))
                    return false;
            }
            return true;
        }

        private bool Between(DateTime input, DateTime date1, DateTime date2)
        {
        return (input > date1 && input < date2);
        }

        public Meeting Save(Meeting meeting){
            meeting.User = _userRepository.GetById(meeting.User.Id);
            _context.Meetings.Add(meeting);
            _context.SaveChanges();
            return meeting;
        }
  
    }
}