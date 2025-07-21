$(document).ready(function () {

    $('#btnIncluir').click(function () {
        var nome = $('#nomeBeneficiario').val().trim();
        var cpf = $('#cpfBeneficiario').val().trim();

        if (nome === "" || cpf === "") {
            alert("Preencha o nome e o CPF do beneficiário.");
            return;
        }

        var novaLinha = `
           <tr>
                 <td><input type="text" class="form-control form-control-sm input-nome" value="${nome}"></td>
                 <td><input type="text" class="form-control form-control-sm input-cpf" value="${cpf}"></td>
                 <td style="white-space: nowrap;">
                    <button type="button" class="btn btn-primary btn-sm btn-alterar" style="margin-right: 5px;">Alterar</button>
                    <button type="button" class="btn btn-primary btn-sm btn-excluir">Excluir</button>
                </td>
           </tr>
        `;

        $('#tabelaBeneficiarios tbody').append(novaLinha);

        $('#nomeBeneficiario').val('');
        $('#cpfBeneficiario').val('');
    });

    $('#tabelaBeneficiarios').on('click', '.btn-alterar', function () {
        const row = $(this).closest('tr');
        const nomeInput = row.find('.input-nome');
        const cpfInput = row.find('.input-cpf');

        const nome = nomeInput.val() ? nomeInput.val().trim() : '';
        const cpf = cpfInput.val() ? cpfInput.val().trim() : '';

        if (!nome) {
            alert('Por favor, preencha o nome do beneficiário.');
            nomeInput.focus();
            return false;
        }

        if (!cpf) {
            alert('Por favor, preencha o CPF do beneficiário.');
            cpfInput.focus();
            return false;
        }       

    });


    $('#tabelaBeneficiarios').on('click', '.btn-excluir', function () {
        if (confirm("Tem certeza que deseja excluir este beneficiário?")) {
            $(this).closest('tr').remove();
        }
    });

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        var beneficiarios = [];

        $('#tabelaBeneficiarios tbody tr').each(function () {
            var nome = $(this).find('.input-nome').val().trim();
            var cpf = $(this).find('.input-cpf').val().trim();

            if (nome && cpf) {
                beneficiarios.push({
                    Nome: nome,
                    CPF: cpf
                });
            }
        });

        $.ajax({
            url: urlPost,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                Nome: $("#Nome").val(),
                Sobrenome: $("#Sobrenome").val(),
                CPF: $("#CPF").val(),
                Nacionalidade: $("#Nacionalidade").val(),
                CEP: $("#CEP").val(),
                Estado: $("#Estado").val(),
                Cidade: $("#Cidade").val(),
                Logradouro: $("#Logradouro").val(),
                Email: $("#Email").val(),
                Telefone: $("#Telefone").val(),
                Beneficiarios: beneficiarios
            }),
            error: function (r) {
                if (r.status == 400 || r.status == 409)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Erro interno", "Ocorreu um erro interno no servidor.");
            },
            success: function (r) {
                ModalDialog("Sucesso!", r);
                $("#formCadastro")[0].reset();
                $('#tabelaBeneficiarios tbody').empty();
            }
        });

        console.log(beneficiarios); 
    });

});

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
