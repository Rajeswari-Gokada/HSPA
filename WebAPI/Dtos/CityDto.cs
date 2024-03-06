using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage ="Name is mandatory field")]
        [StringLength(50, MinimumLength =2)]
        [RegularExpression(".*[Za-zA-Z]+.*", ErrorMessage ="Only Numerics are not allowed")]
        public string? Name { get; set; }

        [Required]
        public string? Country { get; set; }
        
    }
}