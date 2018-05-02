using System.ComponentModel.DataAnnotations;

namespace GatherApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required()]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "Informe um nome de usuário entre 20 e 4 caracteres!")]
        public string Username { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "Informe uma senha entre 6 e 20 caracteres!")]
        public string Password { get; set; }
        [Required]
        public string Name {get; set;}
        public string LastName {get; set;}
        public string Department {get; set;}
    }
}