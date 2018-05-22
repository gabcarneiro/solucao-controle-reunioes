using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GatherApp.API.Data;
using GatherApp.API.Models;
using GatherApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GatherApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class MeetingController : Controller
    {
        private readonly IMeetingRepository _repo;
        private readonly IMapper _mapper;

        public MeetingController(IMeetingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        // GET api/values
        [HttpGet]
        public IActionResult GetMeetings()
        {
            var meetings = _repo.GetAll();

            var meetingsToReturn = _mapper.Map<IEnumerable<MeetingDto>>(meetings);
            
            return Ok(meetingsToReturn);
        }

        [HttpPost]
        public IActionResult Post([FromBody]MeetingDto meeting)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            meeting.User = new UserForListDto { Id = currentUserId};

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var metetingToCreate = _mapper.Map<Meeting>(meeting);

            if(!_repo.IsDateAvaliable(metetingToCreate)){
                ModelState.AddModelError("Horário", "Horário indisponível, selecione outro horário!");
                return BadRequest(ModelState);
            }
                
            
            var createdMeeting = _repo.Save(metetingToCreate);

            var meetingToReturn = _mapper.Map<MeetingDto>(createdMeeting);

            return CreatedAtRoute("GetMeeting", new {controller = "Meeting", id = createdMeeting.Id}, meetingToReturn);
        }

        [HttpGet("{id}", Name="GetMeeting")]
        public IActionResult GetMeeting(int id)
        {
            var meeting = _repo.GetById(id);

            var meetingToReturn = _mapper.Map<MeetingDto>(meeting);

            return Ok(meetingToReturn);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetMeetingsByUserId(int userId)
        {
            var meetings = _repo.GetMeetingsByUserId(userId);

            var meetingsToReturn = _mapper.Map<IEnumerable<MeetingDto>>(meetings);

            return Ok(meetingsToReturn);
        }

        [HttpPost("day")]
        public IActionResult GetMeetingsByDay([FromBody]DateTime day){
            
            var meetings = _repo.GetMeetingsByDay(day);

            var meetingsToReturn = _mapper.Map<IEnumerable<MeetingDto>>(meetings);

            return Ok(meetingsToReturn);
        }

        [HttpPost("avaliable")]
        public IActionResult TestDate([FromBody]Meeting meeting){
            
            var avaliable = _repo.IsDateAvaliable(meeting);

            return Ok(avaliable);
        }



    }
    
}
