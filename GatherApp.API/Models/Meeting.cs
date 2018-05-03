using System;
using GatherApp.API.Models;


namespace GatherApp.API.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Description { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime FinishingTime { get; set; }
    }

}