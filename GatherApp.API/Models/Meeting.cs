using System;


namespace GatherApp.API.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Description { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime FinishingTime { get; set; }

        public Meeting () 
        {
            this.StartingTime = new DateTime(2018,10,15,10,0,0);
            this.FinishingTime = new DateTime(2018,10,15,11,0,0);
        }

    }

}