using FI.AtividadeEntrevista.DAL.Beneficiarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario ben = new DaoBeneficiario();

            return ben.Incluir(beneficiario);
        }

        public List<DML.Beneficiario> Consultar(long idCliente)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Consultar(idCliente);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            ben.Alterar(beneficiario);
        }
    }
}
