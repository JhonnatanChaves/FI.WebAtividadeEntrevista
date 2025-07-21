
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);

        if (obj.Beneficiarios && Array.isArray(obj.Beneficiarios)) {
            obj.Beneficiarios.forEach(function (b) {
                var novaLinha = `
                    <tr>
                        <td>
                            <input type="hidden" class="input-id" value="${b.Id}" />
                            <input type="text" class="form-control form-control-sm input-nome" value="${b.Nome}">
                        </td>
                        <td>
                            <input type="text" class="form-control form-control-sm input-cpf" value="${b.CPF}">
                            <input type="hidden" class="input-idCliente" value="${b.IdCliente}" />
                        </td>
                        <td style="white-space: nowrap;">
                            <button type="button" class="btn btn-primary btn-sm btn-alterar" style="margin-right: 5px;">Alterar</button>
                            <button type="button" class="btn btn-primary btn-sm btn-excluir">Excluir</button>
                        </td>
                    </tr>
                `;
                $('#tabelaBeneficiarios tbody').append(novaLinha);
            });
        }

    }

    function montarBeneficiarios() {
        var beneficiarios = [];

        $('#tabelaBeneficiarios tbody tr').each(function () {
            var idInput = $(this).find('.input-id');
            var id = idInput.length > 0 ? parseInt(idInput.val()) : 0;
            var nome = $(this).find('.input-nome').val().trim();
            var cpf = $(this).find('.input-cpf').val().trim();

            var idClienteInput = $(this).find('.input-idCliente');
            var idCliente = idClienteInput.length > 0 ? parseInt(idInput.val()) : 0;

            if (nome && cpf) {
                beneficiarios.push({
                    Id: id,
                    Nome: nome,
                    CPF: cpf,
                    idCliente: idCliente
                });
            }
        });

        return beneficiarios;
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
       
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                Id: obj.Id,
                "Nome": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
                "Beneficiarios": montarBeneficiarios()
            },
            error:
            function (r) {
                if (r.status == 400 || r.status == 409)
                    ModalDialog("Ocorreu um erro", r.responseJSON); 
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
