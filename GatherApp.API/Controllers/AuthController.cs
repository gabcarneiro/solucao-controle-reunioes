using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GatherApp.API.Data;
using GatherApp.API.Dtos;
using GatherApp.API.Helpers;
using GatherApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GatherApp.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repo;

        public IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration configuration)
        {
            _repo = repo;
            _config = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegister)
        {
            if(!string.IsNullOrEmpty(userForRegister.Username))
            userForRegister.Username = userForRegister.Username.ToLower();

            if (await _repo.UserExists(userForRegister.Username))
                ModelState.AddModelError("Username", "Nome de usuário já existe!");
            //validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToCreate = new User
            {
                Username = userForRegister.Username,
                Name = userForRegister.Name,
                LastName = userForRegister.LastName,
                Department = userForRegister.Department
            };

            var createdUser = await _repo.Register(userToCreate, userForRegister.Password);
        
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto) 
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null){
                return Unauthorized();
            }

            //generate token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
                }), 
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature) 
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new {tokenString});

        }

    }
}