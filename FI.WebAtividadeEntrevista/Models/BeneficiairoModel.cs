using FI.WebAtividadeEntrevista.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiairoModel
    {
        public long Id { get; set; }
        
        [Required]
        [CustomValidation(typeof(VerificaCPF), nameof(VerificaCPF.ValidarCPF))]
        public string CPF { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public long IdCliente { get; set; }
    }
}
