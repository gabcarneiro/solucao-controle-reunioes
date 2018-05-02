using AutoMapper;
using GatherApp.API.Dtos;
using GatherApp.API.Models;

namespace GatherApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        
        public AutoMapperProfiles()
        {
            CreateMap<Meeting,MeetingDto>()
                .ForMember(
                    dest => dest.User,
                    opt => opt.MapFrom(src => src.User)
                );

            CreateMap<User,UserForListDto>();
        }

    }
}