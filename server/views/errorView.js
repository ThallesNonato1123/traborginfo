module.exports = function errorView(erro) {
    return `
    <!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <title>Mensagem de Erro</title>

        <style>
            #main {
                box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.52);
                margin-top: 8%;
                background-color: #fafafa;
                padding: 0 0 2% 0;
                border-radius: 1%;
            }
          
            #nav{
                border-top-left-radius: 1%;
                border-top-right-radius: 1%;
            }
            
            #nav-text{
                margin-top: 0%;
            }          
        </style>
    </head>
    
    <body>
        <div class="row">
            <div id="main" class="offset-s3 col s6 hoverable">
                <nav id="nav">
                    <div class="nav-wrapper light-blue darken-4">
                        <p id="nav-text" class="center-align flow-text">Mensagem de Erro</p>
                    </div>
                </nav>
    
                <div class="col s12">
                    <h3 style=" font-size: 28pt" class="center-align flow-text">${erro}</h3>
                    <button style="margin-top: 4%" onclick="window.history.back()" class="btn light-blue darken-4 right">Voltar</button>
                </div>
            </div>
        </div>
    </body>
    
    </html>
    `
}