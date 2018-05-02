using System;

namespace GatherApp.API.Dtos
{
    public class MeetingDto
    {
        public int Id { get; set; }
        public UserForListDto User {get; set;}
        public string Date { get; set; }
        public string Description { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime FinishingTime { get; set; }
    }
}