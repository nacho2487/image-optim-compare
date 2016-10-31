$(document).ready(function(){
    $('#file').change(function(e){
        var file = e.target.files[0];

        var formData = new FormData();
        formData.append('file', file);

        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res){
                console.log(res);

                $('#image').html('');
                $('#image').append('<section><h3>Normal:</h3><img src="'+res.local.url+'" /><p>Tamaño: '+res.local.size+'</p><a target="_blank" href="'+res.local.url+'">Descargar</a></section>');
                $('#image').append('<section><h3>Kraken:</h3><img src="'+res.kraken.url+'" /><p class='+(res.optim.size > res.kraken.size ? 'green': '' )+'>Tamaño: '+res.kraken.size+'</p><a target="_blank" href="'+res.kraken.url+'">Descargar</a></section>');
                $('#image').append('<section><h3>Image Optim:</h3><img src="'+res.optim.url+'" /><p class='+(res.kraken.size > res.optim.size ? 'green': '' )+'>Tamaño: '+res.optim.size+'</p><a target="_blank" href="'+res.optim.url+'">Descargar</a></section>');
            }
        });

    });
});
