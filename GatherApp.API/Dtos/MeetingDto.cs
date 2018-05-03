using System;
using GatherApp.API.Models;

namespace GatherApp.API.Dtos
{
    public class MeetingDto
    {
        public int Id { get; set; }
        public User User {get; set;}
        public string Description { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime FinishingTime { get; set; }
    }
}