using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FI.WebAtividadeEntrevista.Shared
{
    public class VerificaCPF
    {
        public static ValidationResult ValidarCPF(string cpf, ValidationContext context)
        {
            if (VerificaFormatacaoCPF(cpf)!=ValidationResult.Success || CalcularDigitosCPF(cpf) != ValidationResult.Success)
                return new ValidationResult("CPF inválido!");

            return ValidationResult.Success;
        }

        private static ValidationResult CalcularDigitosCPF(string cpf)
        {           
            string cpfApenasNumeros = new string(cpf.Where(char.IsDigit).ToArray());

            if ((cpfApenasNumeros.Length != 11) || (cpfApenasNumeros.Distinct().Count() == 1))
                return new ValidationResult("CPF inválido!");           

            int soma = 0;
            for (int i = 0; i < 9; i++)
                soma += (cpfApenasNumeros[i] - '0') * (10 - i);

            int primeiroDigito = soma % 11;
            primeiroDigito = primeiroDigito < 2 ? 0 : 11 - primeiroDigito;

            soma = 0;
            for (int i = 0; i < 10; i++)
                soma += (cpfApenasNumeros[i] - '0') * (11 - i);

            soma += primeiroDigito * 2;

            int segundoDigito = soma % 11;
            segundoDigito = segundoDigito < 2 ? 0 : 11 - segundoDigito;

            if (cpfApenasNumeros[9] - '0' != primeiroDigito || cpfApenasNumeros[10] - '0' != segundoDigito)
                return new ValidationResult("CPF inválido!");

            return ValidationResult.Success;
        }

        private static ValidationResult VerificaFormatacaoCPF(string cpf)
        {
            if (string.IsNullOrWhiteSpace(cpf))
                return new ValidationResult("CPF é obrigatório");

            var regex = new Regex(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$");

            if (!regex.IsMatch(cpf))
                return new ValidationResult("Digite um CPF com formatação padrão (XXX.XXX.XXX-XX)");

            return ValidationResult.Success;
        }
    }
}
